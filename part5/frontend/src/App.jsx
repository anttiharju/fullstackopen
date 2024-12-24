import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  function byLikes(b1, b2) {
    if (b1.likes < b2.likes) {
      return 1
    } else if (b1.likes > b2.likes) {
      return -1
    }
    return 0
  }

  useEffect(() => {
    async function getBlogs() {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs.sort(byLikes))
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      }
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Failed to login', error)

      setErrorMessage(
        'wrong username or password'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <Notification message={errorMessage} color="red" />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog).sort(byLikes))
      setToastMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setToastMessage(null)
      }, 5000)
    } catch (error) {
      console.error('Failed to create blog:', error)
    }
  }
  const blogFormRef = useRef()

  const likeBlog = async (id, likes) => {
    try {
      const blogObject = await blogService.like(id, likes)
      setBlogs(blogs.map(b => b.id === id ? blogObject : b).sort(byLikes))
    } catch (error) {
      console.error('Failed to like blog', error)
    }
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    } catch (error) {
      console.error('Failed to remove blog', error)
    }
  }

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={toastMessage} color="green" />
      <Notification message={errorMessage} color="red" />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            username={user.username}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
          />
        )}
      </div>
    </div>
  )

  return (
    user === null ?
      loginForm() :
      blogForm()
  )
}

export default App
