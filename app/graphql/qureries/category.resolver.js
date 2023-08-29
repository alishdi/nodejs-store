const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryType } = require("../typDefs/category.type");
const { CategoryModel } = require("../../model/categories");

const categoryResolver = {
    type: new GraphQLList(CategoryType),
    resolve: async () => {
        return await CategoryModel.find({ parent: undefined })
    }
}
const categoryChildResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        parent: { type: GraphQLString }
    },
    resolve: async (obj, args, contex, info) => {
        const { parent } = args
      
        return await CategoryModel.find({ parent })
    }
}

module.exports = {
    categoryResolver,
    categoryChildResolver
}