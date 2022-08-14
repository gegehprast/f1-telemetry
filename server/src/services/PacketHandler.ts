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
import CarDamage from '../models/CarDamage'
import CarSetup from '../models/CarSetup'
import CarStatus from '../models/CarStatus'
import CarTelemetry from '../models/CarTelemetry'
import Event from '../models/Event'
import FinalClassification from '../models/FinalClassification'
import LapData from '../models/LapData'
import LobbyInfo from '../models/LobbyInfo'
import Motion from '../models/Motion'
import Participant from '../models/Participant'
import Session from '../models/Session'
import SessionHistory from '../models/SessionHistory'

type Listener = (...args: any[]) => Promise<void>

interface ModifiedPacketHeader {
    m_packetFormat: number
    m_packetVersion: number
    m_packetId: number
    m_sessionUID: string
    m_sessionTime: number
    m_frameIdentifier: number
    m_playerCarIndex: number
    m_surfaceType: number[]
}

const m_headerParser = (m_header: PacketHeader): ModifiedPacketHeader => {
    return {
        ...m_header,
        ...{ m_sessionUID: m_header.m_sessionUID.toString() },
    }
}

const onlyPlayerCarIndex: <T>(
    m_playerCarIndex: number,
    data: T[]
) => (T | null)[] = (m_playerCarIndex, data) => {
    return data.map((item, idx) => {
        if (idx === m_playerCarIndex) {
            return item
        }

        return null
    })
}

const onlyPlayerCarData: <T>(
    m_playerCarIndex: number,
    data: T[]
) => T | undefined = (m_playerCarIndex, data) => {
    return data.find((item, idx) => idx === m_playerCarIndex)
}

export const eventHandler: Listener = async (data: PacketEventData) => {
    try {
        if (['CHQF', 'BUTN'].includes(data.m_eventStringCode)) {
            return
        }

        const doc = new Event({
            ...m_headerParser(data.m_header),
            ...{
                ...data,
                createdAt: new Date(),
            },
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
    //         ...{ m_header: m_headerParser(data.m_header), createdAt: new Date() },
    //     })
    //     await doc.save()
    // } catch (error) {
    //     console.log(error)
    // }
}

export const carSetupsHandler: Listener = async (data: PacketCarSetupData) => {
    try {
        const m_carSetups = onlyPlayerCarData(
            data.m_header.m_playerCarIndex,
            data.m_carSetups
        )
        const doc = new CarSetup({
            ...m_headerParser(data.m_header),
            ...m_carSetups,
            ...{
                createdAt: new Date(),
            },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const lapDataHandler: Listener = async (data: PacketLapData) => {
    try {
        const header = m_headerParser(data.m_header)
        const m_lapData = onlyPlayerCarData(
            data.m_header.m_playerCarIndex,
            data.m_lapData
        )

        if (m_lapData) {
            await LapData.updateOne(
                {
                    m_sessionUID: header.m_sessionUID,
                    m_currentLapNum: m_lapData.m_currentLapNum,
                },
                {
                    ...header,
                    ...m_lapData,
                    ...{
                        carIndex: data.m_header.m_playerCarIndex,
                        createdAt: new Date(),
                    },
                },
                {
                    upsert: true,
                    setDefaultsOnInsert: true,
                }
            ).exec()
        }
    } catch (error) {
        console.log(error)
    }
}

export const participantsHandler: Listener = async (
    data: PacketParticipantsData
) => {
    try {
        for (let i = 0; i < data.m_participants.length; i++) {
            const header = m_headerParser(data.m_header)
            const participantData = data.m_participants[i]
            await Participant.updateOne(
                {
                    m_sessionUID: header.m_sessionUID,
                    carIndex: i,
                },
                {
                    ...header,
                    ...participantData,
                    ...{
                        carIndex: i,
                        createdAt: new Date(),
                    },
                },
                {
                    upsert: true,
                    setDefaultsOnInsert: true,
                }
            ).exec()
        }
    } catch (error) {
        console.log(error)
    }
}

export const carTelemetryHandler: Listener = async (
    data: PacketCarTelemetryData
) => {
    try {
        const m_carTelemetryData = onlyPlayerCarData(
            data.m_header.m_playerCarIndex,
            data.m_carTelemetryData
        )
        const doc = new CarTelemetry({
            ...m_headerParser(data.m_header),
            ...m_carTelemetryData,
            ...{
                m_buttonStatus: data.m_buttonStatus,
                m_mfdPanelIndex: data.m_mfdPanelIndex,
                m_mfdPanelIndexSecondaryPlayer:
                    data.m_mfdPanelIndexSecondaryPlayer,
                m_suggestedGear: data.m_suggestedGear,
                createdAt: new Date(),
            },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const carStatusHandler: Listener = async (data: PacketCarStatusData) => {
    try {
        const m_carStatusData = onlyPlayerCarData(
            data.m_header.m_playerCarIndex,
            data.m_carStatusData
        )
        const doc = new CarStatus({
            ...m_headerParser(data.m_header),
            ...m_carStatusData,
            ...{
                createdAt: new Date(),
            },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const finalClassificationHandler: Listener = async (
    data: PacketFinalClassificationData
) => {
    try {
        for (let i = 0; i < data.m_classificationData.length; i++) {
            const finalClassificationData = data.m_classificationData[i]

            const doc = new FinalClassification({
                ...m_headerParser(data.m_header),
                ...finalClassificationData,
                ...{
                    m_numCars: data.m_numCars,
                    carIndex: i,
                    createdAt: new Date(),
                },
            })

            await doc.save()
        }
    } catch (error) {
        console.log(error)
    }
}

export const lobbyInfoHandler: Listener = async (data: PacketLobbyInfoData) => {
    // try {
    //     const doc = new LobbyInfo({
    //         ...data,
    //         ...{ m_header: m_headerParser(data.m_header), createdAt: new Date() },
    //     })
    //     await doc.save()
    // } catch (error) {
    //     console.log(error)
    // }
}

export const carDamageHandler: Listener = async (data: PacketCarDamageData) => {
    try {
        const m_carDamageData = onlyPlayerCarData(
            data.m_header.m_playerCarIndex,
            data.m_carDamageData
        )
        const doc = new CarDamage({
            ...m_headerParser(data.m_header),
            ...m_carDamageData,
            ...{
                createdAt: new Date(),
            },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}

export const sessionHandler: Listener = async (data: PacketSessionData) => {
    try {
        const header = m_headerParser(data.m_header)
        await Session.updateOne(
            { m_sessionUID: header.m_sessionUID },
            {
                ...header,
                ...{
                    m_weather: data.m_weather,
                    m_trackTemperature: data.m_trackTemperature,
                    m_airTemperature: data.m_airTemperature,
                    m_totalLaps: data.m_totalLaps,
                    m_trackLength: data.m_trackLength,
                    m_sessionType: data.m_sessionType,
                    m_trackId: data.m_trackId,
                    m_era: data.m_era,
                    m_formula: data.m_formula,
                    m_sessionTimeLeft: data.m_sessionTimeLeft,
                    m_sessionDuration: data.m_sessionDuration,
                    m_pitSpeedLimit: data.m_pitSpeedLimit,
                    m_gamePaused: data.m_gamePaused,
                    m_isSpectating: data.m_isSpectating,
                    m_spectatorCarIndex: data.m_spectatorCarIndex,
                    m_sliProNativeSupport: data.m_sliProNativeSupport,
                    m_numMarshalZones: data.m_numMarshalZones,
                    m_marshalZones: data.m_marshalZones,
                    m_safetyCarStatus: data.m_safetyCarStatus,
                    m_networkGame: data.m_networkGame,
                    m_numWeatherForecastSamples:
                        data.m_numWeatherForecastSamples,
                    m_weatherForecastSamples: data.m_weatherForecastSamples,
                    createdAt: new Date(),
                },
            },
            {
                upsert: true,
                setDefaultsOnInsert: true,
            }
        ).exec()
    } catch (error) {
        console.log(error)
    }
}

export const sessionHistoryHandler: Listener = async (
    data: PacketSessionHistoryData
) => {
    if (data.m_carIdx !== data.m_header.m_playerCarIndex) {
        return
    }

    try {
        const header = m_headerParser(data.m_header)
        await SessionHistory.updateOne(
            { m_sessionUID: header.m_sessionUID },
            {
                ...header,
                ...{
                    m_carIdx: data.m_carIdx,
                    m_numLaps: data.m_numLaps,
                    m_numTyreStints: data.m_numTyreStints,
                    m_bestLapTimeLapNum: data.m_bestLapTimeLapNum,
                    m_bestSector1LapNum: data.m_bestSector1LapNum,
                    m_bestSector2LapNum: data.m_bestSector2LapNum,
                    m_bestSector3LapNum: data.m_bestSector3LapNum,
                    m_lapHistoryData: data.m_lapHistoryData,
                    m_tyreStintsHistoryData: data.m_tyreStintsHistoryData,
                    createdAt: new Date(),
                },
            },
            {
                upsert: true,
                setDefaultsOnInsert: true,
            }
        ).exec()
    } catch (error) {
        console.log(error)
    }
}
