const { expect } = require('@playwright/test')

const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByTestId('blog-title-input').fill(title)
  await page.getByTestId('blog-author-input').fill(author)
  await page.getByTestId('blog-url-input').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await expect(page.getByText(`${title} by ${author} added`)).toBeVisible()
}

const getLikes = async (page, n=0) => {
  const likesText = await page.locator('.likes').nth(n).textContent()
  const N = 1 // format: "likes N"
  return parseInt(likesText.split(' ')[N])
}

const createUser = async (request, name, username, password) => {
  await request.post('/api/users', {
    data: {
      name: name,
      username: username,
      password: password
    }
  })
}

export { loginWith, createBlog, getLikes, createUser }
