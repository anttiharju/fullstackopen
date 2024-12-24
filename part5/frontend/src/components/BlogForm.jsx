import PropTypes from 'prop-types'

import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        title:<input
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
          id='blog-title-input'
          data-testid='blog-title-input'
        /><br />
        author:<input
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
          id='blog-author-input'
          data-testid='blog-author-input'
        /><br />
        url:<input
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
          id='blog-url-input'
          data-testid='blog-url-input'
        /><br />
        <button type="submit" id="blog-submit">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
