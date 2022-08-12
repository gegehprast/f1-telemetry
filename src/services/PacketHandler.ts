import { PacketEventData } from "@racehub-io/f1-telemetry-client/build/src/parsers/packets/types"
import CarDamage from "../models/CarDamage"
import CarSetup from "../models/CarSetup"
import CarStatus from "../models/CarStatus"
import CarTelemetry from "../models/CarTelemetry"
import Event from "../models/Event"
import FinalClassification from "../models/FinalClassification"
import LapData from "../models/LapData"
import LobbyInfo from "../models/LobbyInfo"
import Motion from "../models/Motion"
import Participant from "../models/Participant"
import Session from "../models/Session"
import SessionHistory from "../models/SessionHistory"

type Listener = (...args: any[]) => Promise<void>

export const eventHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new Event(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const motionHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new Motion(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const carSetupsHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new CarSetup(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const lapDataHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new LapData(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const sessionHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new Session(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const participantsHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new Participant(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const carTelemetryHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new CarTelemetry(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const carStatusHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new CarStatus(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const finalClassificationHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new FinalClassification(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const lobbyInfoHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new LobbyInfo(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const carDamageHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new CarDamage(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const sessionHistoryHandler: Listener = async (event: PacketEventData) => {
    try {
        const doc = new SessionHistory(event)
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}
