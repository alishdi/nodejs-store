const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } = require("graphql");
const { AuthorType, anyType } = require("./public.type");

const AnswerType = new GraphQLObjectType({
    name: 'AnswerType',
    fields: {
        _id: { type: GraphQLString },
        user: { type: AuthorType },
        comments: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        show: { type: GraphQLBoolean },


    }
})
const commentType = new GraphQLObjectType({
    name: 'commentType',
    fields: {
        _id: { type: GraphQLString },
        user: { type: AuthorType },
        comments: { type: GraphQLString },
        answers: { type: new GraphQLList(AnswerType) },
        show: { type: GraphQLBoolean },
        isReplly: { type: GraphQLBoolean },

    }
})




module.exports = {
    commentType
}