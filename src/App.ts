import dbConnect from "./lib/dbConnect"
import Telemetry from "./services/Telemetry"

class App {
    public Telemetry: Telemetry

    constructor() {
        this.Telemetry = new Telemetry
    }
    
    public start = async () => {
        await dbConnect()

        this.Telemetry.start()
    }

    public stop = async () => {
        this.Telemetry.stop()
    }
}

export default new App
