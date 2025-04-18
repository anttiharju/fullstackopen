const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    id: '5a422aa71b54a676234d17f8'
  }
]

const listWithSixBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    id: "5a422a851b54a676234d17f7"
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    id: "5a422aa71b54a676234d17f8"
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    id: "5a422b3a1b54a676234d17f9"
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    id: "5a422b891b54a676234d17fa"
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    id: "5a422ba71b54a676234d17fb"
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    id: "5a422bc61b54a676234d17fc"
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('totalLikes counts the sum of likes', () => {
  test('when list has just one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has six blogs, equals the likes of those', () => {
    const result = listHelper.totalLikes(listWithSixBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favoriteBlog returns blog with the most likes', () => {
  const favoriteBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }

  test('returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithSixBlogs)
    assert.deepStrictEqual(result, favoriteBlog)
  })
})

describe('mostBlogs returns an author with the highest count of blog posts', () => {
  const mostBlogs = {
      author: "Robert C. Martin",
      blogs: 3,
    }

  test('returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithSixBlogs)
    assert.deepStrictEqual(result, mostBlogs)
  })
})

describe('mostLikes returns an author with the highest count of likes on their blog posts', () => {
  const mostLikes = {
      author: "Edsger W. Dijkstra",
      blogs: 17,
    }

  test('returns the author with most blogs', () => {
    const result = listHelper.mostLikes(listWithSixBlogs)
    assert.deepStrictEqual(result, mostLikes)
  })
})
