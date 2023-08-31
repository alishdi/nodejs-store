const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AuthorType, PublicCategoryType } = require("./public.type");
const { commentType } = require("./comment.type");

const blogType = new GraphQLObjectType({
    name: 'blogType',
    fields: {
        _id: { type: GraphQLString },
        author: { type: AuthorType },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        short_text: { type: GraphQLString },
        image: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: PublicCategoryType },
        comments:{type:new GraphQLList(commentType)}

    }
})

module.exports = {
    blogType
}