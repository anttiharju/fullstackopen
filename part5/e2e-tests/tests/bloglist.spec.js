const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, getLikes } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Antti Harju',
        username: 'anttiharju',
        password: 'salainen'
      }
    })

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
    })
  })
})
