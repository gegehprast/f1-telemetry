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
    ;(process as NodeJS.EventEmitter).on(eventType, () => App.stop())
})

// start app
App.start()
