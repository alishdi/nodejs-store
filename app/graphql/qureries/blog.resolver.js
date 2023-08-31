const { GraphQLList, GraphQLString } = require("graphql")
const { blogType } = require("../typDefs/blog.type")
const { BlogModel } = require("../../model/blogs");

const blogResolver = {
    type: new GraphQLList(blogType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { category } = args
        const findQuery = category ? { category } : {}
        return await BlogModel.find(findQuery).populate([{ path: 'author' }, { path: 'category' }, { path: 'comments.user' }, { path: 'comments.answers' }, { path: 'comments.answers.user' }])
    }
}

module.exports = {
    blogResolver
}