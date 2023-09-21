const { Router } = require('express');
const { NamespaceController } = require('../../http/controllers/support/namespace.controller');
const namespaceRouter = Router();

namespaceRouter.post('/add', NamespaceController.addNamespace)
namespaceRouter.post('/get', NamespaceController.getListOfNamespaces)

module.exports = {
    namespaceRouter
}