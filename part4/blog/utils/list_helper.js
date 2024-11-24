const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => { return total + blog.likes }, 0);
}

const favoriteBlog = (blogs) => {
  let favorite = blogs[0];

  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });
  const answer = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
  return answer
}

const mostBlogs = (blogs) => {
  let blogPosts = {}

  blogs.forEach(blog => {
    if (blogPosts[blog.author]) {
      blogPosts[blog.author] += 1
    } else {
      blogPosts[blog.author] = 1
    }
  })

  const authorWithMost = Object.keys(blogPosts).reduce((top, contender) => blogPosts[top] < blogPosts[contender] ? contender : top);
  return {
    author: authorWithMost,
    blogs: blogPosts[authorWithMost]
  }
}

const mostLikes = (blogs) => {
  let blogLikes = {}

  blogs.forEach(blog => {
    if (blogLikes[blog.author]) {
      blogLikes[blog.author] += blog.likes
    } else {
      blogLikes[blog.author] = blog.likes
    }
  })

  const authorWithMost = Object.keys(blogLikes).reduce((top, contender) => blogLikes[top] < blogLikes[contender] ? contender : top);
  return {
    author: authorWithMost,
    blogs: blogLikes[authorWithMost]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
