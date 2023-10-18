const logger = require('../utils/logger')

const dummy = (blogs) => {
    logger.info('returning fixed 1 for',blogs)
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length===0) return 0
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length===0) return {}
    let favorite=blogs[0]
    blogs.map( (blog) => {
        if(blog.likes>favorite.likes)
            favorite = blog
    })
    return {
        author: favorite.author,
        title: favorite.title,
        likes: favorite.likes
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}