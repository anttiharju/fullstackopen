import { render } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#blog-title-input')
  const authorInput = container.querySelector('#blog-author-input')
  const urlInput = container.querySelector('#blog-url-input')
  const submitButton = container.querySelector('#blog-submit')

  const title='How to Make Your Code Reviewer Fall in Love with You'
  const author='Michael Lynch'
  const url='https://mtlynch.io/code-review-love/'

  await user.type(titleInput, title)
  await user.type(authorInput, author)
  await user.type(urlInput, url)
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(title)
  expect(createBlog.mock.calls[0][0].author).toBe(author)
  expect(createBlog.mock.calls[0][0].url).toBe(url)
})
