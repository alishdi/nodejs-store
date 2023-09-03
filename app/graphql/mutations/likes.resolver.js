const { GraphQLString } = require("graphql");
const { responseType } = require("../typDefs/public.type");
const { verifyTokenAccessTokenGraphql } = require("../../http/middleware/verifyAccessToken");
const { ProductsModel } = require("../../model/products");
const { BlogModel } = require("../../model/blogs");
const { Courses } = require("../../model/courses");
const { checkExistBlog } = require("../qureries/comment.resolver");

const likeProduct = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const { productID } = args;
        await checkExistBlog(ProductsModel, productID)
        let likedproduct = await ProductsModel.findOne({
            _id: productID,
            like: user._id
        })
        let deslikedproduct = await ProductsModel.findOne({
            _id: productID,
            deslike: user._id
        })

        const updateQuery = likedproduct ? { $pull: { like: user._id } } : { $push: { like: user._id } }

        await ProductsModel.updateOne({ _id: productID }, updateQuery)
        let message;
        if (!deslikedproduct && likedproduct) {
            await ProductsModel.updateOne({ _id: productID }, { $pull: { deslike: user._id } })
            message = 'پسندیدن لغو شد'
        } else message = 'پسندیدن  با موفقیت انجام شد'

        return {
            statusCode: 201,
            data: {
                message
            }
        }


    }
}
const likeCourse = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const { courseID } = args;
        await checkExistBlog(Courses, courseID)
        let likedCourse = await Courses.findOne({
            _id: courseID,
            like: user._id
        })
        let deslikedCourse = await Courses.findOne({
            _id: courseID,
            deslike: user._id
        })
        const updateQuery = likedCourse ? { $pull: { like: user._id } } : { $push: { like: user._id } }

        await Courses.updateOne({ _id: courseID }, updateQuery)
        let message;
        if (!deslikedCourse && likeCourse) {
            await Courses.updateOne({ _id: courseID }, { $pull: { deslike: user._id } })
            message = 'پسندیدن لغو شد'
        }else message='پسندیدن با موفقیت انجام شد'
        return {
            statusCode: 201,
            data: {
                message
            }
        }


    }
}
const likeBlog = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const { blogID } = args;
        await checkExistBlog(BlogModel, blogID)
        let likedblog = await BlogModel.findOne({
            _id: blogID,
            like: user._id
        })
        let deslikedBlog = await BlogModel.findOne({
            _id: blogID,
            deslike: user._id
        })
        const updateQuery = likedblog ? { $pull: { like: user._id } } : { $push: { like: user._id } }

        await BlogModel.updateOne({ _id: blogID }, updateQuery)
        let message;
        if (!deslikedBlog && likedblog) {
            await BlogModel.updateOne({ _id: blogID }, { $pull: { deslike: user._id } })
            message = 'پسندیدن لغو شد'
        }else message='پسندیدن با موفقیت انجام شد'
        return {
            statusCode: 201,
            data: {
                message
            }
        }


    }
}

module.exports = {
    likeProduct,
    likeBlog,
    likeCourse
}