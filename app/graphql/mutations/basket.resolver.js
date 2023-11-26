const { GraphQLString, GraphQLInt } = require("graphql");
const { responseType } = require("../typDefs/public.type");
const { verifyTokenAccessTokenGraphql } = require("../../http/middleware/verifyAccessToken");
const { ProductsModel } = require("../../model/products");
const { BlogModel } = require("../../model/blogs");
const { Courses } = require("../../model/courses");
const { checkExistBlog } = require("../qureries/comment.resolver");
const { UserModel } = require("../../model/users");
const { copyObjet } = require("../../utils/func");
const { createError } = require("../../utils/constant");


const addProductToBasket = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const { productID } = args;
        await checkExistBlog(ProductsModel, productID)
        const product = await findProductInBasket(user._id, productID)
        console.log(product);
        if (product) {
            await UserModel.updateOne({
                _id: user._id,
                "basket.products.productID": productID

            }, {
                $inc: {
                    "basket.products.$.count": 1
                }


            })
        } else {
            await UserModel.updateOne({
                _id: user._id,
            }, {
                $push: {
                    "basket.products": {
                        productID,
                        count: 1
                    }
                }


            }

            )

        }
        return {
            statusCode: 200,
            data: {
                message: 'محصول به سبد خرید افزوده شد'
            }
        }


    }
}
const addCourseToBasket = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const { courseID } = args;
        await checkExistBlog(Courses, courseID)
        const userCourse = await UserModel.findOne({ _id: user._id, courses: courseID })
        if(userCourse) throw createError.BadRequest('شما قبلا این دوره را خریداری کرده اید')
        const course = await findCourseInBasket(user._id, courseID)
        if (course) {
            throw createError.BadRequest('این دوره قبلا به سبد خرید اضافه شده')
        } else {
            await UserModel.updateOne({
                _id: user._id,
            }, {
                $push: {
                    "basket.courses": {
                        courseID,
                        count: 1
                    }
                }


            }

            )

        }
        return {
            statusCode: 200,
            data: {
                message: 'دوره به سبد خرید افزوده شد'
            }
        }


    }

}

const removeCourseToBasket = {
    type: responseType,
    args: {
        courseID: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const { courseID } = args;
        await checkExistBlog(Courses, courseID)
        const course = await findCourseInBasket(user._id, courseID)


        if (!course) throw createError.NotFound('دوره در سبد خرید یافت نشد')
        if (course.count > 1) {
            await UserModel.updateOne({
                _id: user._id,
                "basket.courses.courseID": courseID

            }, {
                $inc: {
                    "basket.courses.$.count": -1
                }


            }

            )
            message = 'یک واحد از سبد خرید کم شد'
        } else {
            await UserModel.updateOne({
                _id: user._id,
                "basket.courses.courseID": courseID
            }, {
                $pull: {
                    "basket.courses": {
                        courseID
                    }
                }


            }

            )
            message = 'محصول در داخل سبد خرید حذف شد'

        }
        return {
            statusCode: 200,
            data: {
                message
            }
        }





    }
}
const removeProductToBasket = {
    type: responseType,
    args: {
        productID: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { req } = context;
        const user = await verifyTokenAccessTokenGraphql(req)
        const { productID } = args;
        await checkExistBlog(ProductsModel, productID)
        const product = await findProductInBasket(user._id, productID)
        console.log(product);
        let message;
        if (!product) throw createError.NotFound('محصول مورد نظر در سبد خرید یافت نشد')
        if (product.count > 1) {
            await UserModel.updateOne({
                _id: user._id,
                "basket.products.productID": productID

            }, {
                $inc: {
                    "basket.products.$.count": -1
                }


            }

            )
            message = 'یک واحد از سبد خرید کم شد'
        } else {
            await UserModel.updateOne({
                _id: user._id,
                "basket.products.productID": productID
            }, {
                $pull: {
                    "basket.products": {
                        productID

                    }
                }


            }

            )
            message = 'محصول در داخل سبد خرید حذف شد'

        }
        return {
            statusCode: 200,
            data: {
                message
            }
        }



    }
}



//method
async function findProductInBasket(userID, productID) {
    const findedProduct = await UserModel.findOne({ _id: userID, "basket.products.productID": productID }, {
        "basket.products.$": 1
    })
    if (!findedProduct) throw createError.NotFound('محصولی یافت نشد')

    const product = copyObjet(findedProduct)
    return product?.basket?.products?.[0]



}
async function findCourseInBasket(userID, courseID) {
    const findedCourse = await UserModel.findOne({ _id: userID, "basket.courses.courseID": courseID }, {
        "basket.courses.$": 1
    })

    const course = copyObjet(findedCourse)
    return course?.basket?.courses?.[0]



}

module.exports = {
    addCourseToBasket,
    addProductToBasket,
    removeCourseToBasket,
    removeProductToBasket
}