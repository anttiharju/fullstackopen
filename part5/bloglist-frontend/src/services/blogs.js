import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// Will cause issues with multiple users, due to sending new amount instead of a +1.
// But I don't think the course is concerned with that.
const like = async (id, likes) => {
  const config = {
    headers: { Authorization: token },
  }

  // Exercise 5.8 claims that this will replace the blog, but my test
  // https://github.com/anttiharju/fullstackopen/blob/204963bc7f4c88e98fbb597c07ec6b7183301ac6/part4/test/blog_api.test.js#L178-L196
  // claims otherwise. I'll trust the test.
  const newLikes = {
    likes: likes + 1
  }

  const response = await axios.put(`api/blogs/${id}`, newLikes, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`api/blogs/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, like, remove }
