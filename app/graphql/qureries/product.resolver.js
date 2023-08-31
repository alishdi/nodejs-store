const { GraphQLList, GraphQLString } = require("graphql")

const { ProductsModel } = require("../../model/products")
const { productType } = require("../typDefs/product.type")


const productResolver = {
    type: new GraphQLList(productType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { category } = args
        const findQuery = category ? { category } : {}
        return await ProductsModel.find(findQuery).populate([{ path: 'supplier' }, { path: 'category' }, { path: 'comments.answers' }, { path: 'comments.answers.user' }])
    }
}

module.exports = {
    productResolver
}