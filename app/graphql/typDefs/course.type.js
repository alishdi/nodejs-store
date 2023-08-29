const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { AuthorType, PublicCategoryType } = require("./public.type");



const episodesTypes = new GraphQLObjectType({
    name: 'episodesTypes',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        type: { type: GraphQLString },
        time: { type: GraphQLString },
        videoAddress: { type: GraphQLString },
        videoURL: { type: GraphQLString }
    }
})


const chaptersType = new GraphQLObjectType({
    name: 'chaptersType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        episode: { type: new GraphQLList(episodesTypes) },
    }
})


const CourseType = new GraphQLObjectType({
    name: 'CourseType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        short_text: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        image: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: PublicCategoryType },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        count: { type: GraphQLInt },
        type: { type: GraphQLInt },
        teacher: { type: AuthorType },
        status: { type: GraphQLString },
        chapters: { type: new GraphQLList(chaptersType) },
    }
})











module.exports = {
    CourseType
}