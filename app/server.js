const { indexRouter } = require('./router/index.router');
const createError = require('http-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerjsdoc = require('swagger-jsdoc');
const cors = require('cors');
const { initialSocket } = require('./TCP/socket.io/server');
const { socketHandler } = require('./socket.io');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { REFRESH_TOKEN } = require('./utils/constant');
const { clienthelper } = require('./utils/client');


module.exports = class Application {
    #express = require('express');
    #app = this.#express()
    #DB_URI;
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.initTemplateEngins()
        this.initClientSession()
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
                openapi: "3.0.0",
                info: {
                    title: 'alishahidi shop',
                    version: '1,0,0',
                    description: 'مرجع آموزش برنامه نویسی',
                    contact: {
                        name: 'ali shahidi',
                        url: "https://freerealapi.com",
                        email: 'alishahidi267@gmail.com'
                    }
                },
                servers: [
                    {
                        url: 'http://localhost:5000'
                    }
                ],
                components: {
                    securitySchemes: {
                        BearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "jwt"
                        }
                    }
                },
                security: [{ BearerAuth: [] }]

            },
            apis: ['./app/router/**/*.js']
        }),
            {
                explorer: true
            }
        ))
    }

    createServer() {
        const http = require('http');
        const server = http.createServer(this.#app)
        const io = initialSocket(server)
        socketHandler(io)
        server.listen(this.#PORT, () => {
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
    initRedis() {
        require('./utils/init_redis');
    }
    initTemplateEngins() {
        const ExprtessEjsLayouts = require('express-ejs-layouts');
        this.#app.use(ExprtessEjsLayouts)
        this.#app.set('view engine', 'ejs');
        this.#app.set('views', 'resource/views');
        this.#app.set('layout extractStyles', true);
        this.#app.set('layout extractScripts', true);
        this.#app.set('layout', './layouts/master');
        this.#app.use((req,res,next)=>{
            this.#app.locals=clienthelper(req,res)
            next()
        })
    }
    initClientSession() {
        this.#app.use(cookieParser(REFRESH_TOKEN))
        this.#app.use(session({
            secret: REFRESH_TOKEN,
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }))
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