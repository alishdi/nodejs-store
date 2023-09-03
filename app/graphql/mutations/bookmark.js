const { GraphQLString } = require("graphql");
const { responseType } = require("../typDefs/public.type");
const { verifyTokenAccessTokenGraphql } = require("../../http/middleware/verifyAccessToken");
const { ProductsModel } = require("../../model/products");
const { BlogModel } = require("../../model/blogs");
const { Courses } = require("../../model/courses");
const { checkExistBlog } = require("../qureries/comment.resolver");

const bookMarkProduct = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const { productID } = args;
        await checkExistBlog(ProductsModel, productID)
        let bookmark = await ProductsModel.findOne({
            _id: productID,
            bookmark: user._id
        })
 

        const updateQuery = bookmark ? { $pull: { bookmark: user._id } } : { $push: { bookmark: user._id } }

        await ProductsModel.updateOne({ _id: productID }, updateQuery)
        let message;
        if (bookmark) {
            await ProductsModel.updateOne({ _id: productID }, { $pull: { bookmark: user._id } })
            message = 'ذخیره لغو شد'
        } else message = 'ذخیره  با موفقیت انجام شد'

        return {
            statusCode: 201,
            data: {
                message
            }
        }


    }
}
const bookMarkCourse = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const { courseID } = args;
        await checkExistBlog(Courses, courseID)
        let bookmark = await Courses.findOne({
            _id: courseID,
            bookmark: user._id
        })

        const updateQuery = bookmark ? { $pull: { bookmark: user._id } } : { $push: { bookmark: user._id } }

        await Courses.updateOne({ _id: courseID }, updateQuery)
        let message;
        if (bookmark) {
            await Courses.updateOne({ _id: courseID }, { $pull: { bookmark: user._id } })
            message = 'ذخیره لغو شد'
        }else message='ذخیره با موفقیت انجام شد'
        return {
            statusCode: 201,
            data: {
                message
            }
        }


    }
}
const bookMarkBlog = {
    type: responseType,
    args: {
        blogID: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const { blogID } = args;
        await checkExistBlog(BlogModel, blogID)
        let bookmark = await BlogModel.findOne({
            _id: blogID,
            bookmark: user._id
        })
  
        const updateQuery = bookmark ? { $pull: { bookmark: user._id } } : { $push: { bookmark: user._id } }

        await BlogModel.updateOne({ _id: blogID }, updateQuery)
        let message;
        if (bookmark) {
            await BlogModel.updateOne({ _id: blogID }, { $pull: { bookmark: user._id } })
            message = 'ذخیره لغو شد'
        }else message='ذخیره با موفقیت انجام شد'
        return {
            statusCode: 201,
            data: {
                message
            }
        }


    }
}

module.exports = {
bookMarkProduct,
bookMarkCourse,
bookMarkBlog
}