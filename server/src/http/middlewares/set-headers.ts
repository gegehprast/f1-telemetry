import { RequestHandler } from 'express'

const setHeaders: RequestHandler = (req, res, next) => {
    res.set('X-Powered-By', 'Whatsapp Automation')
    res.append('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS || '*')
    res.append('Access-Control-Allow-Credentials', 'true')
    res.append('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE'])
    res.append('Access-Control-Allow-Headers', ['Content-Type', 'Authorization', 'Accept'])
    next()
}

export default setHeaders
