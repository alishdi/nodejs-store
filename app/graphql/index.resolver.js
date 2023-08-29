const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const { blogResolver } = require("./qureries/blog.resolver");
const { productResolver } = require("./qureries/product.resolver");
const { categoryResolver, categoryChildResolver } = require("./qureries/category.resolver");
const { courseResolver } = require("./qureries/course.resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: blogResolver,
        products: productResolver,
        categories: categoryResolver,
        childOfCategory: categoryChildResolver,
        courses: courseResolver,

    }
})
const RootMutaition = new GraphQLObjectType({
    name: "Mutation",
    fields: {

    }

})

const graphql_Schema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutaition
})

module.exports = {
    graphql_Schema
}