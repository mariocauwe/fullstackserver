const logger = require('../utils/logger')
const lodash = require('lodash')

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

const mostBlogs = (blogs) => {
    let result = { author: '', blogs: 0 }
    const grouped = lodash.countBy(blogs, (blog) => {
        return blog.author
    })
    logger.info('mostblogs grouped',grouped)
    Object.keys(grouped).forEach( (author) => {
        if(grouped[author] > result.blogs) {
            result.author = author
            result.blogs = grouped[result.author]
        }
    })
    return result
}

const mostLikes = (blogs) => {
    // logger.info('mostLikes blogs',blogs)
    let result = { author: '', likes: 0 }

    const grouped = lodash.groupBy(blogs, (blog) => {
        return blog.author
    })
    //logger.info('mostLikes grouped',grouped)
    Object.keys(grouped).forEach( (blogsByAuthor) => {
        let likes
        //logger.info('likes',grouped[blogsByAuthor])
        likes = grouped[blogsByAuthor].reduce( (total,blog) => {
            //logger.info('blog in array',blog)
            return total + blog.likes
        },0)
        grouped[blogsByAuthor] = likes
        if(likes>result.likes) {
            result.likes = likes
            result.author = blogsByAuthor
        }
    })
    logger.info('mostLikes grouped',grouped)
    return result
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}