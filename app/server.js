const { indexRouter } = require('./router/index.router');
const createError = require('http-errors');

module.exports = class Application {
    #express = require('express');
    #app = this.#express()
    #DB_URI;
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.connectToDataBase();
        this.createServer();
        this.configApplication();
        this.createRoutes();
        this.errorHandlig();

    }
    configApplication() {
        const morgan = require('morgan');
        const path = require('path');
        this.#app.use(morgan('dev'))
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

        mongoose.connection.on('connected', () => {
            console.log('mongoos connected to DB');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('mongoos disconnected to DB');
        });
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0)
        })
    };


    errorHandlig(req, res, next) {
        this.#app.use((req, res, next) => {
            next(createError.NotFound('Notfound Err'))
        })
        this.#app.use((error, req, res, next) => {
            console.log(error);
            const serverError = createError.InternalServerError()
            return res.status(error?.status || 500).json({
                statusCode: error?.status || serverError.status,
                msg: error?.message || serverError.message,

            })
        })
    }

    createRoutes() {
        this.#app.use(indexRouter)


    }
}