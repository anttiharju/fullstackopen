import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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

describe('when interacting', () => {
  let container

  const blog = {
    title: 'Kubernetes The Hard Way',
    author: 'Kelsey Hightower',
    url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way',
    likes: 240,
    user: {
      name: 'Kelsey Hightower',
      username: 'kelseyhightower'
    }
  }

  // Silence PropType warnings
  const dummyUpdateBlog = () => {}
  const dummyLoggedInUserUsername = 'kelseyhightower' // misleading to reuse blog.user.username
  const dummyRemoveBlog = () => {}

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        updateBlog={dummyUpdateBlog}
        username={dummyLoggedInUserUsername}
        removeBlog={dummyRemoveBlog}
      />
    ).container
  })
  test('renders url and likes when blog is shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(`likes ${blog.likes}`)
  })
})
