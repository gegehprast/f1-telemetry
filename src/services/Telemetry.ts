import { F1TelemetryClient, constants } from '@racehub-io/f1-telemetry-client'
import {
    eventHandler,
    motionHandler,
    carSetupsHandler,
    lapDataHandler,
    sessionHandler,
    participantsHandler,
    carTelemetryHandler,
    carStatusHandler,
    finalClassificationHandler,
    lobbyInfoHandler,
    carDamageHandler,
    sessionHistoryHandler,
} from './PacketHandler'

const { PACKETS } = constants

class Telemetry {
    public client: F1TelemetryClient

    constructor() {
        this.client = new F1TelemetryClient({ port: 20777, bigintEnabled: false })
    }

    public start() {
        this.listen()

        this.client.start()
    }

    public stop() {
        this.unlisten()

        this.client.stop()
    }

    private listen() {
        this.client.on(PACKETS.event, eventHandler)

        this.client.on(PACKETS.motion, motionHandler)

        this.client.on(PACKETS.carSetups, carSetupsHandler)

        this.client.on(PACKETS.lapData, lapDataHandler)

        this.client.on(PACKETS.session, sessionHandler)

        this.client.on(PACKETS.participants, participantsHandler)

        this.client.on(PACKETS.carTelemetry, carTelemetryHandler)

        this.client.on(PACKETS.carStatus, carStatusHandler)

        this.client.on(PACKETS.finalClassification, finalClassificationHandler)

        this.client.on(PACKETS.lobbyInfo, lobbyInfoHandler)

        this.client.on(PACKETS.carDamage, carDamageHandler)

        this.client.on(PACKETS.sessionHistory, sessionHistoryHandler)
    }

    private unlisten() {
        this.client.off(PACKETS.event, eventHandler)

        this.client.off(PACKETS.motion, motionHandler)

        this.client.off(PACKETS.carSetups, carSetupsHandler)

        this.client.off(PACKETS.lapData, lapDataHandler)

        this.client.off(PACKETS.session, sessionHandler)

        this.client.off(PACKETS.participants, participantsHandler)

        this.client.off(PACKETS.carTelemetry, carTelemetryHandler)

        this.client.off(PACKETS.carStatus, carStatusHandler)

        this.client.off(PACKETS.finalClassification, finalClassificationHandler)

        this.client.off(PACKETS.lobbyInfo, lobbyInfoHandler)

        this.client.off(PACKETS.carDamage, carDamageHandler)

        this.client.off(PACKETS.sessionHistory, sessionHistoryHandler)
    }
}

export default Telemetry
