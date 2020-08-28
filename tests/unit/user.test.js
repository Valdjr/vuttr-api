const bcrypt = require('bcryptjs')
const userClass = require('../../src/Model/User')

describe('User', () => {
    it('should encrypt user password', async () => {
        const password = '123123'
        const generetedHash = await userClass.genereteHash(password)
        const compareHash = await bcrypt.compare(password, generetedHash)
        expect(compareHash).toBe(true)
    })
})