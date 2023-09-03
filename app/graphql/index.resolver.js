const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const { blogResolver } = require("./qureries/blog.resolver");
const { productResolver } = require("./qureries/product.resolver");
const { categoryResolver, categoryChildResolver } = require("./qureries/category.resolver");
const { courseResolver } = require("./qureries/course.resolver");
const { createCommentForBlog, createCommentForProduct, createCommentForCourse } = require("./qureries/comment.resolver");
const { likeProduct, likeCourse, likeBlog } = require("./mutations/likes.resolver");
const { deslikeProduct, deslikeCourse, deslikeBlog } = require("./mutations/deslike.resolver");
const { bookMarkBlog, bookMarkCourse, bookMarkProduct } = require("./mutations/bookmark");
const { getBookMarkBlog, getBookMarkCourse, getBookMarkProduct, getUserBasket } = require("./qureries/user-profile");
const { addProductToBasket, addCourseToBasket, removeProductToBasket, removeCourseToBasket } = require("./mutations/basket.resolver");




const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: blogResolver,
        products: productResolver,
        categories: categoryResolver,
        childOfCategory: categoryChildResolver,
        courses: courseResolver,
        getBookmarkBlog:getBookMarkBlog,
        getBookmarkCourse:getBookMarkCourse,
        getBookmarkProduct:getBookMarkProduct,
        getUserBasket: getUserBasket

    }
})


const RootMutaition = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createCommentForBlog: createCommentForBlog,
        createCommentForProduct: createCommentForProduct,
        createCommentForCourse: createCommentForCourse,
        likeForProducts: likeProduct,
        likeForCourse: likeCourse,
        likeForBlog: likeBlog,
        deslikeProduct: deslikeProduct,
        deslikeCourse: deslikeCourse,
        deslikeBlog: deslikeBlog,
        bookmarkBlog: bookMarkBlog,
        bookmarkCourse: bookMarkCourse,
        bookmarkProduct: bookMarkProduct,
        addProductToBasket: addProductToBasket,
        addCourseToBasket: addCourseToBasket,
        removeProductToBasket: removeProductToBasket,
        removeCourseToBasket: removeCourseToBasket,

    }

})

const graphql_Schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutaition
})

module.exports = {
    graphql_Schema
}