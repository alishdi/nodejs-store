const { GraphQLString } = require("graphql");
const { responseType } = require("../typDefs/public.type");
const { verifyTokenAccessTokenGraphql } = require("../../http/middleware/verifyAccessToken");
const { ProductsModel } = require("../../model/products");
const { BlogModel } = require("../../model/blogs");
const { Courses } = require("../../model/courses");
const { checkExistBlog } = require("../qureries/comment.resolver");

const deslikeProduct = {
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

        const updateQuery = deslikedproduct ? { $pull: { deslike: user._id } } : { $push: { deslike: user._id } }

        await ProductsModel.updateOne({ _id: productID }, updateQuery)
        let message;
        if (deslikedproduct && !likedproduct) {
            await ProductsModel.updateOne({ _id: productID }, { $pull: { deslike: user._id } })
            message = 'نپسندیدن لغو شد'
        } else message = 'نپسندیدن  با موفقیت انجام شد'

        return {
            statusCode: 201,
            data: {
                message
            }
        }


    }
}
const deslikeCourse = {
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
        console.log(deslikeCourse);
        console.log(likedCourse);

        const updateQuery = deslikedCourse ? { $pull: { deslike: user._id } } : { $push: { deslike: user._id } }
        console.log(updateQuery);
        await Courses.updateOne({ _id: courseID }, updateQuery)
        let message;
        if (deslikedCourse && !likedCourse) {
            await Courses.updateOne({ _id: courseID }, { $pull: { deslike: user._id } })
            message = 'نپسندیدن لغو شد'
        } else message = 'نپسندیدن  با موفقیت انجام شد'

        return {
            statusCode: 201,
            data: {
                message
            }
        }


    }
}
const deslikeBlog = {
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
        const updateQuery = deslikedBlog ? { $pull: { deslike: user._id } } : { $push: { deslike: user._id } }

        await BlogModel.updateOne({ _id: blogID }, updateQuery)
        let message;
        if (deslikedBlog && !likedblog) {
            await BlogModel.updateOne({ _id: blogID }, { $pull: { deslike: user._id } })
            message = 'نپسندیدن لغو شد'
        } else message = 'نپسندیدن  با موفقیت انجام شد'
        return {
            statusCode: 201,
            data: {
                message
            }
        }


    }
}

module.exports = {
    deslikeProduct,
    deslikeCourse,
    deslikeBlog

}