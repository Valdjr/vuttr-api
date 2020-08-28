import bcrypt from 'bcryptjs'
import db from '../database/connection';
import jwt from 'jsonwebtoken'

require('dotenv').config({
    path: '.env'
})

interface IUser {
    id: number
    name: string
    email: string
    password_hash: string
    password: string
}

 class User {
    async create(user: IUser) {
        const newUser = {
            name: user.name,
            email: user.email,
            password_hash: await this.genereteHash(user.password)
        }
        await db('users').insert(newUser)
    }

    async genereteHash(password: string) {
        return await bcrypt.hash(password, 8)
    }

    async getByEmail(email: string): Promise<IUser> {
       const users = await db('users').select('users.*').where('users.email', '=', email)
       return users[0]
    }

    async checkPassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash)
    }

    async genereteToken(id: number) {
        return jwt.sign({id}, process.env.APP_SECRET || '')
    }
}

export default new User
module.exports = new User