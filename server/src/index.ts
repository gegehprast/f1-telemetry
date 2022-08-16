import dotenv from 'dotenv'
dotenv.config()

import App from './App'

// handle unhandledRejection error event
process.on('unhandledRejection', (reason, promise) => {
    console.error('[APP] Unhandled Rejection at:', (reason as any).stack || reason, promise)
})

// stops the app
;[
    'exit',
    'SIGINT',
    'SIGUSR1',
    'SIGUSR2',
    'uncaughtException',
    'SIGTERM',
].forEach((eventType) => {
    if (eventType === 'uncaughtException') {
        process.on('uncaughtException', async (error, origin) => {
            console.log(error, origin)

            await App.stop()

            process.exit(0)
        })
    } else {
        ;(process as NodeJS.EventEmitter).on(eventType, async () => {
            await App.stop()

            process.exit(0)
        })
    }
})

// start app
App.start()
