import fs from 'fs'
import path from 'path'
import express from 'express'

const ROUTER = express.Router()
const ROUTE_PATH = './routes'
const ROUTE_DIR = path.join(__dirname, ROUTE_PATH)

const routes = async () => {
    const files = fs
        .readdirSync(ROUTE_DIR)
        .filter((file) => file.endsWith('.js') || file.endsWith('.ts'))

    console.log(files)

    for (const file of files) {
        ;(await import(`${ROUTE_PATH}/${file}`)).default(ROUTER)
    }

    return ROUTER
}

export default routes
