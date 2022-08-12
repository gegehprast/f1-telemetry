import { RequestHandler } from 'express'
import App from '../../App'
import { utf8ToBase64 } from '../../helpers/encoding'
import { diffSeconds } from '../../helpers/date'

const REDIS_PREFIX = 'whatsapp_automation_throttled_request:'

/**
 * Throttle a request by one of its param to be rate limited for every x seconds. 
 * It currently only supports for parameter but it's enough for the app's current needs.
 * 
 * @param seconds 
 * @param param 
 * @returns 
 */
const throttled = (param: string, seconds: number) => {
    const handler: RequestHandler = async (req, res, next) => {
        const now = new Date

        // encode the request param's value to base64
        const stringReq = utf8ToBase64(req.params[param])

        // get lastFetched
        const lastFetched: Date = await getLastFetched(stringReq, seconds)

        // calculate the difference
        const diff = diffSeconds(now, lastFetched)

        // if difference still less than throttle's seconds, return 429
        if (diff < seconds) {
            return res.status(429).json({
                message: `Too many request. Please try again after ${seconds} seconds from the last successful request.`,
            })
        }

        // otherwise update lastFetched value
        setLastFetched(stringReq)

        // and to the next step of the request
        next()
    }

    return handler
}

const getLastFetched = async (stringReq: string, seconds: number) => {
    // get lastFetchedData from redis
    const lastFetchedData = await App.GlobalRedis.get(`${REDIS_PREFIX}${stringReq}`)

    // if lastFetchedData exists, return new Date from it
    if (lastFetchedData) {
        return new Date(parseInt(lastFetchedData))
    }

    // otherwise create new Date from now and set the seconds to -`seconds` ago
    const lastFetched = new Date

    lastFetched.setSeconds(lastFetched.getSeconds() - seconds)

    return lastFetched
}

const setLastFetched = async (stringReq: string) => {
    await App.GlobalRedis.set(
        `${REDIS_PREFIX}${stringReq}`,
        (new Date()).getTime().toString()
    )
}

export default throttled
