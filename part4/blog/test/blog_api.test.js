const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

   assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs have property id', async () => {
  const response = await api.get('/api/blogs')

  for (let blog of response.body) {
    assert(blog.id)
  }
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "Go Proverbs",
    author: "Rob Pike",
    url: "https://go-proverbs.github.io",
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Go Proverbs'))
})

test('adding a blog without likes defaults likes to 0', async () => {
  const newBlog = {
    title: '-2000 Lines of Code',
    author: 'Andy Hertzfield',
    url: 'https://www.folklore.org/Negative_2000_Lines_Of_Code.html'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const addedBlog = blogsAtEnd.find(b => b.title === '-2000 Lines of Code')
  assert.strictEqual(addedBlog.likes, 0)
})

test('trying to add a blog without a title is rejected', async () => {
  const newBlog = {
    author: 'Andy Hertzfield',
    url: 'https://www.folklore.org/Negative_2000_Lines_Of_Code.html'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('trying to add a blog without an url is rejected', async () => {
  const newBlog = {
    title: '-2000 Lines of Code',
    author: 'Andy Hertzfield',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    likes: blogToUpdate.likes + 1
  }

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(
    updatedBlog.body,
    {...blogToUpdate, likes: blogToUpdate.likes + 1}
  )
})

test('updating a blog with an empty name fails', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    title: "",
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(400)
})

test('updating a blog with an empty url fails', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    url: "",
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
