const { Kind } = require("graphql");
function parseObject(valueNode) {
    const value = Object.create(null)
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
}

function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)

        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.valuse.map(parseValueNode)


        default:
            return null

    }

}

function parseLiteral(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
            return valueNode.charAt(0) === '{' ? JSON.parse(valueNode.value) : null
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
        default:
            break;
    }
}

function toObject(value) {
    if (typeof value === 'object') {
        return value
    }
    if (typeof value === 'string' && value.charAt(0) === '{') {
        return JSON.parse(value)
    }
    return null
}

module.exports = {
    parseObject,
    parseValueNode,
    parseLiteral,
    toObject
}