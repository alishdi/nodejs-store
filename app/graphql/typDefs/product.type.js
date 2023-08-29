const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { AuthorType, PublicCategoryType } = require("./public.type");


const FeatureType = new GraphQLObjectType({
    name: 'FeatureType',
    fields: {
        length: { type: GraphQLString },
        height: { type: GraphQLString },
        width: { type: GraphQLString },
        weight: { type: GraphQLString },
        colors: { type: new GraphQLList(GraphQLString) },
        model: { type: GraphQLString },
        madein: { type: GraphQLString }

    }
})
const productType = new GraphQLObjectType({
    name: 'productType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        short_text: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: PublicCategoryType },
        price: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        count: { type: GraphQLInt },
        type: { type: GraphQLInt },
        supplier: { type: AuthorType },
        feature: { type: FeatureType }

    }
})


module.exports = {
    productType
}