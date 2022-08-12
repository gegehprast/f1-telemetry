import express from 'express'
import http from 'http'
import path from 'path'
import setHeaders from './middlewares/set-headers'
import routes from './Router'

const init = async () => {
    const app = express()
    const server = http.createServer(app)

    // json middleware
    app.use(express.json())

    // url encoded middleware
    app.use(
        express.urlencoded({
            extended: true,
        })
    )

    // use static public url
    app.use(express.static(path.join(__dirname, './public')))

    // set view engine
    app.set('view engine', 'pug')

    // set trust proxy
    app.set('trust proxy', true)

    // set views dir
    app.set('views', path.join(__dirname, './views'))

    // use headers middleware
    app.use(setHeaders)

    // init routes
    app.use('/api', await routes())

    // listen
    server.listen(process.env.APP_PORT || 3000, () =>
        console.log(
            `[HTTP] Server ready and running at port: ${
                process.env.APP_PORT || 3000
            }`
        )
    )

    return { server, app }
}

export default init
