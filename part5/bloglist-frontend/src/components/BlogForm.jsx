import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

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
        /><br />
        author:<input
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
        /><br />
        url:<input
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
        /><br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
