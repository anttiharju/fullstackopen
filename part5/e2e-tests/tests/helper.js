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
}

export { loginWith, createBlog }
