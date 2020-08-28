import express from 'express'
import ToolsController from './controllers/ToolsController'
import SessionController from './controllers/SessionController'

const routes = express.Router()
const toolsController = new ToolsController()
const sessionController = new SessionController()

routes.post('/tools', toolsController.create)
routes.get('/tools', toolsController.index)
routes.get('/tools/:id', toolsController.show)
routes.delete('/tools/:id', toolsController.destroy)

routes.post('/sessions', sessionController.create)

export default routes