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
        const userDetail = await UserModel.aggregate([
            {
                $match: {
                    _id: user._id
                }
            },
            {
                $project: {
                    basket: 1
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: 'basket.products.productID',
                    foreignField: '_id',
                    as: 'productDetail'
                }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: 'basket.courses.courseID',
                    foreignField: '_id',
                    as: 'courseDetail'
                }
            },

            {
                $addFields: {
                    "productDetail": {
                        $function: {
                            body: function (productDetail, products) {
                                return productDetail.map(function (product) {
                                    const count = products.find(item => item.productID.valueOf() === product.
                                        _id.valueOf()).count;
                                    const totalPrice = count * product.price
                                    return {
                                        ...product,
                                        basketCount: count,
                                        totalPrice,
                                        finalPrice: totalPrice - ((product.discount / 100) * totalPrice)
                                    }
                                })
                            },
                            args: ['$productDetail', '$basket.products'],
                            lang: 'js'
                        }


                    },
                    "courseDetail": {
                        $function: {
                            body: function (courseDeatail) {
                                return courseDeatail.map(function (course) {
                                    return {
                                        ...course,
                                        finalPrice: course.price - ((course.discount / 100) * course.price)
                                    }
                                })
                            },
                            args: ['$courseDetail'],
                            lang: 'js'
                        }


                    },
                    "payDetail": {
                        $function: {
                            body: function (courseDeatail, productDetail, products) {
                                const courseAmount = courseDeatail.reduce(function (total, course) {
                                    return total + (Number(course.price) - ((Number(course.discount) / 100) * course.price))


                                }, 0)
                                const productAmount = productDetail.reduce(function (total, product) {
                                    const count = products.find(item => item.productID.valueOf() === product._id.valueOf()).count
                                    const totalPrice = count * product.price
                                    return total + (totalPrice - ((Number(product.discount) / 100) * totalPrice))


                                }, 0)
                                const courseId = courseDeatail.map(course => course._id.valueOf())
                                const productId = productDetail.map(product => product._id.valueOf())
                                return {
                                    courseAmount,
                                    productAmount,
                                    payAmount: courseAmount + productAmount,
                                    courseId,
                                    productId
                                }
                            },
                            args: ['$courseDetail', "$productDetail", '$basket.products'],
                            lang: 'js'
                        }


                    }
                }
            }, {
                $project: {
                    basket: 0
                }
            }

        ]);
        return userDetail
    }
}


module.exports = {
    getBookMarkBlog,
    getBookMarkCourse,
    getBookMarkProduct,
    getUserBasket
}