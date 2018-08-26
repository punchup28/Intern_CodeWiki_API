const Hapi = require('hapi')
const server = new Hapi.Server()
const env = require('dotenv').config()

module.exports = () => {
    
    server.connection({
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,
        routes: { cors: true }
    })
    
    require('./jwt')(server)
    require('../app/routes/index.route')(server)

    return server
}