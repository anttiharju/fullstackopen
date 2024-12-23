import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    async function getBlogs() {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      }
    }
    getBlogs();
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
    } catch (exception) {
      console.log(exception)

      setErrorMessage(
        `wrong username or password`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload();
  }

  const loginForm = () => (
    <>
      <h2>log in to application</h2>
      <Notification message={errorMessage} color="red" />
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const blogForm = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:<input
          value={newTitle}
          onChange={handleTitleChange}
        /><br />
        author:<input
          value={newAuthor}
          onChange={handleAuthorChange}
        /><br />
        url:<input
          value={newUrl}
          onChange={handleUrlChange}
        /><br />
        <button type="submit">create</button>
      </form>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
    } catch (error) {
      console.error('Failed to create blog:', error)
    }
  }

  return (
    user === null ?
    loginForm() :
    <div>
      <h2>blogs</h2>
      <Notification message={toastMessage} color="green" />
      <Notification message={errorMessage} color="red" />
      <p>{user.name} logged in <button type="submit" onClick={() => handleLogout()}>logout</button></p>
      {blogForm()}
    </div>
  )
}

export default App
