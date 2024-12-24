import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container

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

  test('by default renders title and author but not url or likes', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(`likes ${blog.likes}`)
  })

  test('clicking view renders url and likes', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog')
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(`likes ${blog.likes}`)
  })
})
