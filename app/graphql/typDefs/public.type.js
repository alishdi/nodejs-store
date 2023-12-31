const { json } = require("express");
const { GraphQLString, GraphQLObjectType, GraphQLScalarType, Kind, GraphQLList } = require("graphql");
const { toObject, parseLiteral } = require("../utils");

const anyType = new GraphQLScalarType({
    name: 'anyType',
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral

})
const AuthorType = new GraphQLObjectType({
    name: 'AuthorType',
    fields: {
        _id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString }

    }
})
const PublicCategoryType = new GraphQLObjectType({
    name: 'PublicCategoryType',
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
       


    }
})
const responseType = new GraphQLObjectType({
    name:"responseType",
    fields:{
        statusCode:{type:GraphQLString},
        data:{type: anyType}
    }
})


module.exports = {
    AuthorType,
    PublicCategoryType,
    anyType,
    responseType
}