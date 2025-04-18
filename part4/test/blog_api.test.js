const { test, after, before, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
let user
let token

before(async () => {
  await User.deleteMany({})
  const account = await api
    .post('/api/users')
    .send({
      name: 'Test User',
      username: 'testuser',
      password: 'wordpass'
    })

  user = account.body.id

  const auth = await api
    .post('/api/login')
    .send({
      username: 'testuser',
      password: 'wordpass'
    })

  token = auth.body.token
})

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      const blogObject = new Blog({
        ...blog,
        user
      });
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

  describe('addition of a new blog', () => {
    test('succeeds with a valid new blog', async () => {
      const newBlog = {
        title: "Go Proverbs",
        author: "Rob Pike",
        url: "https://go-proverbs.github.io",
        likes: 4
      }

      await api
        .post('/api/blogs')
        .set({ 'Authorization': `Bearer ${token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes('Go Proverbs'))
    })

    test('fails if user is not authenticated', async () => {
      // I miss httptest from Go ;_;
      const newBlog = {
        title: "mocking outbound http requests in go: you’re (probably) doing it wrong",
        author: "Sonya Huang",
        url: "https://medium.com/zus-health/mocking-outbound-http-requests-in-go-youre-probably-doing-it-wrong-60373a38d2aa",
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('succeeds even if likes are not provided which default to 0', async () => {
      const newBlog = {
        title: '-2000 Lines of Code',
        author: 'Andy Hertzfield',
        url: 'https://www.folklore.org/Negative_2000_Lines_Of_Code.html'
      }

      await api
        .post('/api/blogs')
        .set({ 'Authorization': `Bearer ${token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const addedBlog = blogsAtEnd.find(b => b.title === '-2000 Lines of Code')
      assert.strictEqual(addedBlog.likes, 0)
    })

    test('fails when the blog is missing a title', async () => {
      const newBlog = {
        author: 'Andy Hertzfield',
        url: 'https://www.folklore.org/Negative_2000_Lines_Of_Code.html'
      }

      await api
        .post('/api/blogs')
        .set({ 'Authorization': `Bearer ${token}` })
        .send(newBlog)
        .expect(400)
    })

    test('fails when the blog is missing an url', async () => {
      const newBlog = {
        title: '-2000 Lines of Code',
        author: 'Andy Hertzfield',
      }

      await api
        .post('/api/blogs')
        .set({ 'Authorization': `Bearer ${token}` })
        .send(newBlog)
        .expect(400)
    })
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ 'Authorization': `Bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })

  describe('updating a blog', () => {
    test('succeeds by providing just the likes', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const newBlog = {
        likes: blogToUpdate.likes + 1
      }

      let updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(
        updatedBlog.body,
        {...blogToUpdate, likes: blogToUpdate.likes + 1}
      )
    })

    test('fails if the title is empty', async () => {
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

    test('fails if the url is empty', async () => {
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
  })

  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(result.body.error.includes('expected `username` to be unique'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ro',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(result.body.error.includes('is shorter than the minimum allowed length (3)'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if there is no username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(result.body.error.includes('Path `username` is required'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'sa',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(result.body.error.includes('minimum password length is 3'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if there is no password', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(result.body.error.includes('Path `password` is required'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })

  after(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
  })
})
