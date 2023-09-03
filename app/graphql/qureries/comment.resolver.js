const { GraphQLString, GraphQLList } = require("graphql");
const { BlogModel } = require("../../model/blogs");
const { createError } = require("../../utils/constant");
const { verifyTokenAccessTokenGraphql } = require("../../http/middleware/verifyAccessToken");
const { responseType } = require("../typDefs/public.type");
const { copyObjet } = require("../../utils/func");
const { default: mongoose } = require("mongoose");
const { Courses } = require("../../model/courses");
const { ProductsModel } = require("../../model/products");

const createCommentForBlog = {
    type: responseType,
    args: {
        comment: { type: GraphQLString },
        blogID: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async (obj, args, context) => {
        const { req } = context
        const user = await verifyTokenAccessTokenGraphql(req)
        const { comment, blogID, parent } = args;
        if (!mongoose.isValidObjectId(blogID)) throw createError.BadRequest('شناسه ارسال شده صحیح نمیباشد')
        await checkExistBlog(BlogModel,blogID)
        let commentDocument;
        if (parent && mongoose.isValidObjectId(parent)) {
            commentDocument = await getComment(BlogModel, parent)
            if (commentDocument && !commentDocument?.isReplly) throw createError.BadRequest('ثبت پاسخ مجاز نیست')

            const createAnswerResult = await BlogModel.updateOne(
                { _id: blogID, 'comments._id': parent }, {
                $push: {
                    'comments.$.answers': { comments: comment, user: user._id, show: false, isReplly: false }
                }
            })
            if (!createAnswerResult.modifiedCount) throw createError.InternalServerError('ثبت پاسخ انجام نشد')
            return {
                statusCode: 201,
                data: {
                    message: 'پاسخ شما با موفقیت ثبت شد'
                }
            }

        } else {
            await BlogModel.updateOne({ _id: blogID }, {
                $push: {
                    comments: {
                        comments: comment,
                        user: user._id,
                        isReplly: true

                    }
                }
            })

        }
        return {

            statusCode: 201,
            data: {
                message: 'افزودن کامنت با موفقیت انجام شد و پس از تایید در وبسایت مورد نمایش قرار میگیرد'
            }
        }
    }
}
const createCommentForProduct = {
    type: responseType,
    args: {
        comment: { type: GraphQLString },
        productID: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async (obj, args, context) => {
        const { req } = context
        const user = await verifyTokenAccessTokenGraphql(req)
        const { comment, productID, parent } = args;
        if (!mongoose.isValidObjectId(productID)) throw createError.BadRequest('شناسه ارسال شده صحیح نمیباشد')
        await checkExistBlog(ProductsModel,productID)
        let commentDocument;
        if (parent && mongoose.isValidObjectId(parent)) {
            commentDocument = await getComment(ProductsModel, parent)
            if (commentDocument && !commentDocument?.isReplly) throw createError.BadRequest('ثبت پاسخ مجاز نیست')

            const createAnswerResult = await ProductsModel.updateOne(
                { _id: productID, 'comments._id': parent }, {
                $push: {
                    'comments.$.answers': { comments: comment, user: user._id, show: false, isReplly: false }
                }
            })
            if (!createAnswerResult.modifiedCount) throw createError.InternalServerError('ثبت پاسخ انجام نشد')
            return {
                statusCode: 201,
                data: {
                    message: 'پاسخ شما با موفقیت ثبت شد'
                }
            }

        } else {
            await ProductsModel.updateOne({ _id: productID }, {
                $push: {
                    comments: {
                        comments: comment,
                        user: user._id,
                        isReplly: true

                    }
                }
            })

        }
        return {

            statusCode: 201,
            data: {
                message: 'افزودن کامنت با موفقیت انجام شد و پس از تایید در وبسایت مورد نمایش قرار میگیرد'
            }
        }
    }
}
const createCommentForCourse = {
    type: responseType,
    args: {
        comment: { type: GraphQLString },
        courseID: { type: GraphQLString },
        parent: { type: GraphQLString },
    },
    resolve: async (obj, args, context) => {
        const { req } = context
        const user = await verifyTokenAccessTokenGraphql(req)
        const { comment, courseID, parent } = args;
        if (!mongoose.isValidObjectId(courseID)) throw createError.BadRequest('شناسه ارسال شده صحیح نمیباشد')
        await checkExistBlog(Courses,courseID)
        let commentDocument;
        if (parent && mongoose.isValidObjectId(parent)) {
            commentDocument = await getComment(Courses, parent)
            if (commentDocument && !commentDocument?.isReplly) throw createError.BadRequest('ثبت پاسخ مجاز نیست')

            const createAnswerResult = await Courses.updateOne(
                {
                    _id: courseID,
                    'comments._id': parent
                }, {
                $push: {
                    'comments.$.answers': { comments: comment, user: user._id, show: false, isReplly: false }
                }
            })
            if (!createAnswerResult.modifiedCount) throw createError.InternalServerError('ثبت پاسخ انجام نشد')
            return {
                statusCode: 201,
                data: {
                    message: 'پاسخ شما با موفقیت ثبت شد'
                }
            }

        } else {
            await Courses.updateOne({ _id: courseID }, {
                $push: {
                    comments: {
                        comments: comment,
                        user: user._id,
                        isReplly: true

                    }
                }
            })

        }
        return {

            statusCode: 201,
            data: {
                message: 'افزودن کامنت با موفقیت انجام شد و پس از تایید در وبسایت مورد نمایش قرار میگیرد'
            }
        }
    }
}

async function checkExistBlog(model,id) {
    const blog = await model.findById(id)
    if (!blog) throw createError.NotFound('بلاگی با این مشخصات یافت نشد')
    return blog
}
async function getComment(model, id) {
    const findedcomment = await model.findOne({ 'comments._id': id }, { 'comments.$': 1 })
    const comment = copyObjet(findedcomment)
    if (!comment) throw createError.NotFound('نظری با این ایدی یافت نشد')
    return comment?.comments?.[0]
}
module.exports = {
    createCommentForBlog,
    createCommentForCourse,
    createCommentForProduct,
    checkExistBlog
    
}