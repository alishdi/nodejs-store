const { indexRouter } = require('./router/index.router');
const createError = require('http-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');
const cors=require('cors');


module.exports = class Application {
    #express = require('express');
    #app = this.#express()
    #DB_URI;
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.initRedis()
        this.connectToDataBase();
        this.createServer();
        this.createRoutes();
        this.errorHandlig();

    }
    configApplication() {
        const morgan = require('morgan');
        const path = require('path');
        this.#app.use(morgan('dev'))
        this.#app.use(cors())
        this.#app.use(this.#express.static(path.join(__dirname, "..", 'public')))
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({ extended: true }));
        this.#app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerjsdoc({
            swaggerDefinition: {
                info: {
                    title: 'alishahidi shop',
                    version: '1,0,0',
                    description: 'مرجع آموزش برنامه نویسی',
                    contact:{
                        name:'ali shahidi',
                        url:"https://freerealapi.com",
                        email:'alishahidi267@gmail.com'
                    }
                },
                servers: [
                    {
                        url: 'http://localhost:5000'
                    }
                ]

            },
            apis: ['./app/router/**/*.js']
        })))
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
    initRedis(){
        require('./utils/init_redis');
    }


    errorHandlig(req, res, next) {
        this.#app.use((req, res, next) => {
            next(createError.NotFound('Notfound Err'))
        })
        this.#app.use((error, req, res, next) => {
            
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