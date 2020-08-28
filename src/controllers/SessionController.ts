import {Request, Response} from 'express'
import classUser from '../Model/User'

export default class ConnectionsController {
    async create(req: Request, res: Response) {
        const {email, password} = req.body

        const user = await classUser.getByEmail(email)
        if (!user) {
            return res.status(401).send();
        }

        const checkedPassword = classUser.checkPassword(password, user.password_hash)
        if (!checkedPassword) {
            return res.status(401).send();
        }

        const token = classUser.genereteToken(user.id)

        return res.json({user, token})
    }
}