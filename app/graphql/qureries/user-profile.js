const { GraphQLList, GraphQLString } = require("graphql")
const { blogType } = require("../typDefs/blog.type")
const { BlogModel } = require("../../model/blogs");
const { verifyTokenAccessTokenGraphql } = require("../../http/middleware/verifyAccessToken");
const { productType } = require("../typDefs/product.type");
const { CourseType } = require("../typDefs/course.type");
const { ProductsModel } = require("../../model/products");
const { Courses } = require("../../model/courses");
const { anyType } = require("../typDefs/public.type");
const { UserModel } = require("../../model/users");
const {UserBasket}=require('../../utils/func');


const getBookMarkBlog = {
    type: new GraphQLList(blogType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const blog = await BlogModel.find({ bookmark: user._id }).populate([{ path: 'author' }, { path: 'category' }, { path: 'comments.user' }, { path: 'comments.answers' }, { path: 'comments.answers.user' }, { path: 'like' }, { path: 'deslike' }, { path: 'bookmark' }])
        return blog

    }
}
const getBookMarkProduct = {
    type: new GraphQLList(productType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const product = await ProductsModel.find({ bookmark: user._id }).populate([{ path: 'author' }, { path: 'category' }, { path: 'comments.user' }, { path: 'comments.answers' }, { path: 'comments.answers.user' }, { path: 'like' }, { path: 'deslike' }, { path: 'bookmark' }])
        return product

    }
}
const getBookMarkCourse = {
    type: new GraphQLList(CourseType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const course = await Courses.find({ bookmark: user._id }).populate([{ path: 'author' }, { path: 'category' }, { path: 'comments.user' }, { path: 'comments.answers' }, { path: 'comments.answers.user' }, { path: 'like' }, { path: 'deslike' }, { path: 'bookmark' }])
        return course

    }
}
const getUserBasket = {
    type: anyType,
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const userDetail = await UserBasket(user._id)
          
        return userDetail
    }
}


module.exports = {
    getBookMarkBlog,
    getBookMarkCourse,
    getBookMarkProduct,
    getUserBasket
}