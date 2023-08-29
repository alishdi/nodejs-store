const { GraphQLList, GraphQLString } = require("graphql")
const { blogType } = require("../typDefs/blog.type")
const { BlogModel } = require("../../model/blogs");
const { verifyTokenAccessTokenGraphql } = require("../../http/middleware/verifyAccessToken");

const blogResolver = {
    type: new GraphQLList(blogType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { category } = args
        const findQuery = category ? { category } : {}
        return await BlogModel.find(findQuery).populate([{ path: 'author' }, { path: 'category' }])
    }
}

module.exports = {
    blogResolver
}