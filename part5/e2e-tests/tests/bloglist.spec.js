const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, getLikes, createUser } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await createUser(request, 'Antti Harju', 'anttiharju', 'salainen')

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('log in to application')
    await expect(locator).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'anttiharju', 'salainen')

      await expect(page.getByText('Antti Harju logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'anttiharju', 'wrong')

      const errorDiv = page.locator('.notification')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Antti Harju logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'anttiharju', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a new blog', 'playwright', 'https://playwright.dev', true)

      const blogDiv = page.locator('.blog')
      await expect(blogDiv).toBeVisible()
      await expect(blogDiv).toContainText('a new blog')
      await expect(blogDiv).toContainText('playwright')
      await expect(blogDiv).not.toContainText('https://playwright.dev')
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'a new blog', 'playwright', 'https://playwright.dev', true)
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        const likesBefore = await getLikes(page)
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText(`likes ${likesBefore + 1}`)).toBeVisible()
      })

      test('it can be deleted', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'hide' })).toBeVisible()

        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByRole('button', { name: 'hide' })).not.toBeVisible()
        await expect(page.getByRole('button', { name: 'view' })).not.toBeVisible()
      })

      test('only the user who added the blog can see the delete button', async ({ page, request }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

        await page.getByRole('button', { name: 'logout' }).click()
        await createUser(request, 'Pantti Karju', 'panttikarju', 'julkinen')
        await loginWith(page, 'panttikarju', 'julkinen')

        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    // I don't think this kind of testing should be done through Playwright.
    // There's probably a more idiomatic way but this is fine.
    describe('and several blogs exist', () => {
      const likes = [1, 0, 3]
      beforeEach(async ({ page }) => {
        // Create as many blogs as there are items in the likes array
        for (let i = 0; i < likes.length; i++) {
          const n = i + 1
          await createBlog(page, `Blog #${n}`, `Author #${n}`, `Website #${n}`, true)
        }

        // Like the blogs according to the array
        for (let i = 0; i < likes.length; i++) {
          await page.getByRole('button', { name: 'view' }).nth(i).click()
          for (let j = 0; j < likes[i]; j++) {
            await page.getByRole('button', { name: 'like' }).click()
            await expect(page.getByText(`likes ${j + 1}`).last()).toBeVisible()
          }
          await page.getByRole('button', { name: 'hide' }).nth(0).click()
        }

        // Leave all blogs (specifically their likes) visible
        for (let i = 0; i < likes.length; i++) {
          await page.getByRole('button', { name: 'view' }).nth(0).click()
        }

        // I tried extracting the three above into functions; it
        // didn't work on first attempt and I can't be bothered.
      })

      test('they are sorted by likes', async ({ page }) => {
        let previousLikes = await getLikes(page, 0)
        for (let i = 1; i < likes.length; i++) {
          const currentLikes = await getLikes(page, i)
          expect(currentLikes).toBeLessThanOrEqual(previousLikes)
          previousLikes = currentLikes
        }
      })
    })
  })
})
