import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  describe('renders', () => {
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
    const dummyLoggedInUserUsername = 'kelseyhightower' // misleading to reuse blog.user.username
    const dummyLikeBlog = () => {}
    const dummyRemoveBlog = () => {}

    beforeEach(() => {
      container = render(
        <Blog
          blog={blog}
          username={dummyLoggedInUserUsername}
          likeBlog={dummyLikeBlog}
          removeBlog={dummyRemoveBlog}
        />
      ).container
    })

    test('title and author but not url or likes by default', () => {
      const div = container.querySelector('.blog')
      expect(div).toHaveTextContent(blog.title)
      expect(div).toHaveTextContent(blog.author)
      expect(div).not.toHaveTextContent(blog.url)
      expect(div).not.toHaveTextContent(`likes ${blog.likes}`)
    })

    test('url and likes after clicking \'view\'', async () => {
      const user = userEvent.setup()
      const button = screen.getByText('view')
      await user.click(button)

      const div = container.querySelector('.blog')
      expect(div).not.toHaveTextContent(blog.url)
      expect(div).not.toHaveTextContent(`likes ${blog.likes}`)
    })
  })
})
