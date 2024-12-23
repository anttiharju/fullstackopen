const middleware = require('../utils/middleware');
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
    .populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })
  if(!blog) {
    return response.status(404).json({ error: 'blog with given id does not exist' })
  }

  if ( blog.user.id.toString() === request.user.id.toString() ) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  response.status(401).json({ error: 'unauthorized' })
})

blogsRouter.put('/:id', async (request, response, next) => {
  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    )
    .populate('user', { username: 1, name: 1 })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
