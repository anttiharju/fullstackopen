import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, username, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = async (id, likes) => {
    try {
      const blog = await blogService.like(id, likes)
      updateBlog(id, blog)
    } catch (error) {
      console.error('Failed to update blog', error)
    }
  }

  const remove = async (id) => {
    try {
      const blog = await blogService.remove(id)
      removeBlog(id, blog)
    } catch (error) {
      console.error('Failed to remove blog', error)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button><br />
        {blog.url} <br />
        likes {blog.likes} <button onClick={() => like(blog.id, blog.likes)}>like</button><br />
        {blog.user.name} <br />
        {blog.user.username == username &&
        <button onClick={() => remove(blog.id)}>remove</button>
        }
      </div>
    </div>
  )
}

export default Blog
