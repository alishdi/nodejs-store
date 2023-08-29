const { GraphQLList, GraphQLString } = require("graphql")

const { verifyTokenAccessTokenGraphql } = require("../../http/middleware/verifyAccessToken");
const { CourseType } = require("../typDefs/course.type");
const { Courses } = require("../../model/courses");

const courseResolver = {
    type: new GraphQLList(CourseType),
    args: {
        category: { type: GraphQLString }
    },
    resolve: async (obj, args, context) => {
        const { category } = args
        const findQuery = category ? { category } : {}
        return await Courses.find(findQuery).populate([{ path: 'teacher' }, { path: 'category' }])
    }
}

module.exports = {
    courseResolver
}