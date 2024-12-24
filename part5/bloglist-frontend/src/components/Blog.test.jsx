import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url or likes', () => {
  const blog = {
    title: 'Learn Go with Tests',
    author: 'Chris James',
    url: 'https://quii.gitbook.io/learn-go-with-tests',
    likes: 352,
    user: {
      name: 'Chris James',
      username: 'quii'
    }
  }

  // Silence PropType warnings
  const dummyUpdateBlog = () => {}
  const dummyLoggedInUserUsername = 'quii' // misleading to reuse blog.user.username
  const dummyRemoveBlog = () => {}

  const { container } = render(
    <Blog
      blog={blog}
      updateBlog={dummyUpdateBlog}
      username={dummyLoggedInUserUsername}
      removeBlog={dummyRemoveBlog}
    />
  )

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(`likes ${blog.likes}`)
})
