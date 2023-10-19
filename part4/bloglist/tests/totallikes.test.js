const listHelper = require('../utils/list_helper')
const logger = require('../utils/logger')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]
const listWithMultiBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '652ea054ee45d76f4715a877',
        title: 'blog 2',
        author: 'Mario',
        url: 'https://fullstackopen.com/',
        likes: 12,
        __v: 0
    },
    {
        _id: '652fa371581d0924cd7e96c2',
        title: 'blog 3',
        author: 'Jimmy',
        url: 'https://jestjs.io/',
        likes: 7,
        __v: 0
    },
    {
        _id: '652fa371581d0924cd7e96c3',
        title: 'blog 4',
        author: 'Mario',
        url: 'https://jestjs.io/',
        likes: 7,
        __v: 0
    }

]

describe('total likes', () => {
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithMultiBlog)
        expect(result).toBe(31)
    })
    test('when list has no blogs, equals the likes of that', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
})

describe('favorite blog', () => {
    test('find the first most favourite blog', () => {
        const result = listHelper.favoriteBlog(listWithMultiBlog)
        //logger.info('result in test',result)
        expect(result).toEqual({ author: 'Mario', title: 'blog 2', likes: 12 })
    })
})

describe('author with most blogs', () => {
    test('find the first author with the most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultiBlog)
        logger.info('result in test',result)
        expect(result).toEqual({ author: 'Mario', blogs: 2 })
    })
})
describe('author with most likes', () => {
    test('find the first author with the most likes', () => {
        const result = listHelper.mostLikes(listWithMultiBlog)
        logger.info('result in test',result)
        expect(result).toEqual({ author: 'Mario', likes: 19 })
    })
})
