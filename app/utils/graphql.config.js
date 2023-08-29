const { graphql_Schema } = require("../graphql/index.resolver")

function grafqlConfig(req, res) {
    return {
        schema: graphql_Schema,
        graphiql: true,
        context: { req, res }
    }
}

module.exports={
    grafqlConfig
}