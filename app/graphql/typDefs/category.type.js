const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const {  PublicCategoryType, anyType } = require("./public.type");

const CategoryType = new GraphQLObjectType({
    name: 'categoryType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        parent: { type: GraphQLString },
        children: { type: new GraphQLList(anyType) }
    }
})

module.exports={
    CategoryType
}