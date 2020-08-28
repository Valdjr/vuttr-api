import path from 'path'

let dbPath = 'database.sqlite'
if (process.env.NODE_ENV === 'test') {
    dbPath = 'databaseTest.sqlite'
}

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', dbPath)
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
}