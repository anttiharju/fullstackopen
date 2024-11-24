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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
