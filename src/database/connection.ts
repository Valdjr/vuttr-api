import knex from 'knex'
import path from 'path'

let dbPath = 'database.sqlite'
if (process.env.NODE_ENV === 'test') {
    dbPath = 'databaseTest.sqlite'
}

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, dbPath)
    },
    useNullAsDefault: true
})

export default db