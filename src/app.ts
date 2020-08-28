import express, {Express} from 'express'
import routes from './routes';
import cors from 'cors'

class AppController {
    express: Express

    constructor() {
        this.express = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.express.use(cors())
        this.express.use(express.json())
        this.express.set("port", process.env.PORT || 3000)
    }

    routes() {
        this.express.use(routes)
    }
}

export default new AppController().express
module.exports = new AppController().express