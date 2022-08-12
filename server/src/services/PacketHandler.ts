import {
    PacketCarDamageData,
    PacketCarSetupData,
    PacketCarStatusData,
    PacketCarTelemetryData,
    PacketEventData,
    PacketFinalClassificationData,
    PacketHeader,
    PacketLapData,
    PacketLobbyInfoData,
    PacketMotionData,
    PacketParticipantsData,
    PacketSessionData,
    PacketSessionHistoryData,
} from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose from 'mongoose'
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

interface ModifiedPacketHeader {
    m_packetFormat: number,
    m_packetVersion: number,
    m_packetId: number,
    m_sessionUID: string,
    m_sessionTime: number,
    m_frameIdentifier: number,
    m_playerCarIndex: number,
    m_surfaceType: number[],
}

const m_headerParser = (m_header: PacketHeader): ModifiedPacketHeader => {
    return {
        ...m_header,
        ...{ m_sessionUID: m_header.m_sessionUID.toString() },
    }
}

const onlyPlayerCarIndex: <T>(m_playerCarIndex: number, data: T[]) => (T | null)[] = (m_playerCarIndex, data) => {
    return data.map((item, idx) => {
        if (idx === m_playerCarIndex) {
            return item
        }

        return null
    })
}

export const eventHandler: Listener = async (data: PacketEventData) => {
    try {
        if (['CHQF', 'BUTN'].includes(data.m_eventStringCode)) {
            return
        }

        const doc = new Event({
            ...data,
            ...{ m_header: m_headerParser(data.m_header) },
        })
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const motionHandler: Listener = async (data: PacketMotionData) => {
    // try {
    //     const doc = new Motion({
    //         ...data,
    //         ...{ m_header: m_headerParser(data.m_header) },
    //     })
    //     await doc.save()
    // } catch (error) {
    //     console.log(error)
    // }
}

export const carSetupsHandler: Listener = async (data: PacketCarSetupData) => {
    try {
        const m_carSetups = onlyPlayerCarIndex(
            data.m_header.m_playerCarIndex,
            data.m_carSetups
        )
        const doc = new CarSetup({
            ...data,
            ...{
                m_carSetups: m_carSetups,
                m_header: m_headerParser(data.m_header),
            },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const lapDataHandler: Listener = async (data: PacketLapData) => {
    try {
        const m_lapData = onlyPlayerCarIndex(data.m_header.m_playerCarIndex, data.m_lapData)
        const doc = new LapData({
            ...data,
            ...{
                m_lapData: m_lapData,
                m_header: m_headerParser(data.m_header),
            },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const sessionHandler: Listener = async (data: PacketSessionData) => {
    try {
        const doc = new Session({
            ...data,
            ...{ m_header: m_headerParser(data.m_header) },
        })
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const participantsHandler: Listener = async (data: PacketParticipantsData) => {
    try {
        const doc = new Participant({
            ...data,
            ...{ m_header: m_headerParser(data.m_header) },
        })
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const carTelemetryHandler: Listener = async (data: PacketCarTelemetryData) => {
    try {
        const m_carTelemetryData = onlyPlayerCarIndex(
            data.m_header.m_playerCarIndex,
            data.m_carTelemetryData
        )
        const doc = new CarTelemetry({
            ...data,
            ...{ m_carTelemetryData: m_carTelemetryData, m_header: m_headerParser(data.m_header) },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const carStatusHandler: Listener = async (data: PacketCarStatusData) => {
    try {
        const m_carStatusData = onlyPlayerCarIndex(
            data.m_header.m_playerCarIndex,
            data.m_carStatusData
        )
        const doc = new CarStatus({
            ...data,
            ...{
                m_carStatusData: m_carStatusData,
                m_header: m_headerParser(data.m_header),
            },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const finalClassificationHandler: Listener = async (data: PacketFinalClassificationData) => {
    try {
        const doc = new FinalClassification({
            ...data,
            ...{ m_header: m_headerParser(data.m_header) },
        })
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const lobbyInfoHandler: Listener = async (data: PacketLobbyInfoData) => {
    // try {
    //     const doc = new LobbyInfo({
    //         ...data,
    //         ...{ m_header: m_headerParser(data.m_header) },
    //     })
    //     await doc.save()
    // } catch (error) {
    //     console.log(error)
    // }
}

export const carDamageHandler: Listener = async (data: PacketCarDamageData) => {
    try {
        const m_carDamageData = onlyPlayerCarIndex(
            data.m_header.m_playerCarIndex,
            data.m_carDamageData
        )
        const doc = new CarDamage({
            ...data,
            ...{
                m_carDamageData: m_carDamageData,
                m_header: m_headerParser(data.m_header),
            },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const sessionHistoryHandler: Listener = async (data: PacketSessionHistoryData) => {
    if (data.m_carIdx !== data.m_header.m_playerCarIndex) {
        return
    }
    
    try {
        const doc = new SessionHistory({
            ...data,
            ...{ m_header: m_headerParser(data.m_header) },
        })
        
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}
