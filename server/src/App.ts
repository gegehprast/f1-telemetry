import { Server } from 'http'
import express from 'express'
import { dbConnect, dbDisconnect } from './lib/dbConnect'
import initHTTP from './http'
import Telemetry from './services/Telemetry'
import open from 'open'

class App {
    public httpServer!: Server
    public expressApp!: express.Express
    public Telemetry: Telemetry

    constructor() {
        this.Telemetry = new Telemetry()
    }

    public start = async () => {
        await dbConnect()

        const { server, app } = await initHTTP()
        this.httpServer = server
        this.expressApp = app
        
        this.Telemetry.start()
        
        if (process.env.APP_ENV && process.env.APP_ENV.trim() === 'production') {
            console.log('[APP] Opening App interface on default browser.')
            open(`http://localhost:3000`)
        }
    }

    public stop = async () => {
        this.Telemetry.stop()

        await dbDisconnect()
    }
}

export default new App()
