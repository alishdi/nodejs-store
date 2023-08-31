const { GraphQLList, GraphQLString } = require("graphql")

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
        return await Courses.find(findQuery).populate([{ path: 'teacher' }, { path: 'category' }, { path: 'comments.answers' }, { path: 'comments.answers.user' }])
    }
}

module.exports = {
    courseResolver
}