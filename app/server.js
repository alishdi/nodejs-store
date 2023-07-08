
module.exports = class Application {
    #express = require('express');
    #app = this.#express()
    #DB_URI;
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.connectToDataBase()
        this.createServer();
        this.configApplication();
        this.createRoutes();
        this.errorHandlig()

    }
    configApplication() {
        const path = require('path');
        this.#app.use(this.#express.static(path.join(__dirname, "..", 'public')))
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({ extended: true }));
    }
    createServer() {
        this.#app.listen(this.#PORT, () => {
            console.log(`server run on port ${this.#PORT} http://localhost:${this.#PORT}`);
        })
    }
    connectToDataBase() {
        const mongoose = require('mongoose');
        mongoose.connect(this.#DB_URI).then(() => {
            console.log('server connected to mongodb');
        },
            (err) => { console.log(err.message) });
    };

    errorHandlig() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                statusCode: 404,
                msg: 'Notfound Err'
            })
        })
        this.#app.use((error, req, res, next) => {
            console.log(error);
            return res.status(error?.status || 500).json({
                statusCode: error?.status || 500,
                msg: error?.message || 'Notfound Err'
            })
        })
    }

    createRoutes() {
        this.#app.get('/', (req, res, next) => {
            res.json({
                msg: 'this is a shopping express application🤞'
            })
        })
    }
}