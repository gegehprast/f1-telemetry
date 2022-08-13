import express from 'express'
import { PipelineStage } from 'mongoose'
import Participant, { IParticipantDoc } from '../../models/Participant'
import Session, { ISessionDoc } from '../../models/Session'
import SessionHistory, { ISessionHistoryDoc } from '../../models/SessionHistory'
import { exceptionHandler } from '../exceptions/handler'

const sessionPipelines: PipelineStage[] = [
    {
        $sort: { createdAt: -1 },
    },
    {
        $group: {
            originalId: { $first: '$_id' }, // Hold onto original ID.
            _id: '$m_sessionUID', // Set the unique identifier
            m_packetFormat: { $first: '$m_packetFormat' },
            m_packetVersion: { $first: '$m_packetVersion' },
            m_packetId: { $first: '$m_packetId' },
            m_sessionUID: { $first: '$m_sessionUID' },
            m_sessionTime: { $first: '$m_sessionTime' },
            m_frameIdentifier: { $first: '$m_frameIdentifier' },
            m_playerCarIndex: { $first: '$m_playerCarIndex' },
            m_surfaceType: { $first: '$m_surfaceType' },

            m_weather: { $first: '$m_weather' },
            m_trackTemperature: { $first: '$m_trackTemperature' },
            m_airTemperature: { $first: '$m_airTemperature' },
            m_totalLaps: { $first: '$m_totalLaps' },
            m_trackLength: { $first: '$m_trackLength' },
            m_sessionType: { $first: '$m_sessionType' },
            m_trackId: { $first: '$m_trackId' },
            m_era: { $first: '$m_era' },
            m_formula: { $first: '$m_formula' },
            m_sessionTimeLeft: { $first: '$m_sessionTimeLeft' },
            m_sessionDuration: { $first: '$m_sessionDuration' },
            m_pitSpeedLimit: { $first: '$m_pitSpeedLimit' },
            m_gamePaused: { $first: '$m_gamePaused' },
            m_isSpectating: { $first: '$m_isSpectating' },
            m_spectatorCarIndex: { $first: '$m_spectatorCarIndex' },
            m_sliProNativeSupport: {
                $first: '$m_sliProNativeSupport',
            },
            m_numMarshalZones: { $first: '$m_numMarshalZones' },
            m_marshalZones: { $first: '$m_marshalZones' },
            m_safetyCarStatus: { $first: '$m_safetyCarStatus' },
            m_networkGame: { $first: '$m_networkGame' },
            m_numWeatherForecastSamples: {
                $first: '$m_numWeatherForecastSamples',
            },
            m_weatherForecastSamples: {
                $first: '$m_weatherForecastSamples',
            },
            createdAt: { $first: '$createdAt' },
        },
    },
    {
        $project: {
            _id: '$originalId', // Restore original ID.
            m_packetFormat: '$m_packetFormat',
            m_packetVersion: '$m_packetVersion',
            m_packetId: '$m_packetId',
            m_sessionUID: '$m_sessionUID',
            m_sessionTime: '$m_sessionTime',
            m_frameIdentifier: '$m_frameIdentifier',
            m_playerCarIndex: '$m_playerCarIndex',
            m_surfaceType: '$m_surfaceType',

            m_weather: '$m_weather',
            m_trackTemperature: '$m_trackTemperature',
            m_airTemperature: '$m_airTemperature',
            m_totalLaps: '$m_totalLaps',
            m_trackLength: '$m_trackLength',
            m_sessionType: '$m_sessionType',
            m_trackId: '$m_trackId',
            m_era: '$m_era',
            m_formula: '$m_formula',
            m_sessionTimeLeft: '$m_sessionTimeLeft',
            m_sessionDuration: '$m_sessionDuration',
            m_pitSpeedLimit: '$m_pitSpeedLimit',
            m_gamePaused: '$m_gamePaused',
            m_isSpectating: '$m_isSpectating',
            m_spectatorCarIndex: '$m_spectatorCarIndex',
            m_sliProNativeSupport: '$m_sliProNativeSupport',
            m_numMarshalZones: '$m_numMarshalZones',
            m_marshalZones: '$m_marshalZones',
            m_safetyCarStatus: '$m_safetyCarStatus',
            m_networkGame: '$m_networkGame',
            m_numWeatherForecastSamples: '$m_numWeatherForecastSamples',
            m_weatherForecastSamples: '$m_weatherForecastSamples',
            createdAt: '$createdAt',
        },
    },
]
const sessionHistoryPipelines: PipelineStage[] = [
    {
        $sort: { createdAt: -1 },
    },
    {
        $group: {
            originalId: { $first: '$_id' }, // Hold onto original ID.
            _id: '$m_sessionUID', // Set the unique identifier
            m_packetFormat: { $first: '$m_packetFormat' },
            m_packetVersion: { $first: '$m_packetVersion' },
            m_packetId: { $first: '$m_packetId' },
            m_sessionUID: { $first: '$m_sessionUID' },
            m_sessionTime: { $first: '$m_sessionTime' },
            m_frameIdentifier: { $first: '$m_frameIdentifier' },
            m_playerCarIndex: { $first: '$m_playerCarIndex' },
            m_surfaceType: { $first: '$m_surfaceType' },

            m_carIdx: { $first: '$m_carIdx' },
            m_numLaps: { $first: '$m_numLaps' },
            m_numTyreStints: { $first: '$m_numTyreStints' },
            m_bestLapTimeLapNum: { $first: '$m_bestLapTimeLapNum' },
            m_bestSector1LapNum: { $first: '$m_bestSector1LapNum' },
            m_bestSector2LapNum: { $first: '$m_bestSector2LapNum' },
            m_bestSector3LapNum: { $first: '$m_bestSector3LapNum' },
            m_lapHistoryData: { $first: '$m_lapHistoryData' },
            m_tyreStintsHistoryData: { $first: '$m_tyreStintsHistoryData' },
            createdAt: { $first: '$createdAt' },
        },
    },
    {
        $project: {
            _id: '$originalId', // Restore original ID.
            m_packetFormat: '$m_packetFormat',
            m_packetVersion: '$m_packetVersion',
            m_packetId: '$m_packetId',
            m_sessionUID: '$m_sessionUID',
            m_sessionTime: '$m_sessionTime',
            m_frameIdentifier: '$m_frameIdentifier',
            m_playerCarIndex: '$m_playerCarIndex',
            m_surfaceType: '$m_surfaceType',

            m_carIdx: '$m_carIdx',
            m_numLaps: '$m_numLaps',
            m_numTyreStints: '$m_numTyreStints',
            m_bestLapTimeLapNum: '$m_bestLapTimeLapNum',
            m_bestSector1LapNum: '$m_bestSector1LapNum',
            m_bestSector2LapNum: '$m_bestSector2LapNum',
            m_bestSector3LapNum: '$m_bestSector3LapNum',
            m_lapHistoryData: '$m_lapHistoryData',
            m_tyreStintsHistoryData: '$m_tyreStintsHistoryData',
            createdAt: '$createdAt',
        },
    },
]
const participantPipelines: PipelineStage[] = [
    {
        $sort: { createdAt: -1 },
    },
    {
        $group: {
            originalId: { $first: '$_id' }, // Hold onto original ID.
            _id: '$m_sessionUID', // Set the unique identifier
            m_packetFormat: { $first: '$m_packetFormat' },
            m_packetVersion: { $first: '$m_packetVersion' },
            m_packetId: { $first: '$m_packetId' },
            m_sessionUID: { $first: '$m_sessionUID' },
            m_sessionTime: { $first: '$m_sessionTime' },
            m_frameIdentifier: { $first: '$m_frameIdentifier' },
            m_playerCarIndex: { $first: '$m_playerCarIndex' },
            m_surfaceType: { $first: '$m_surfaceType' },

            m_aiControlled: { $first: '$m_aiControlled' },
            m_driverId: { $first: '$m_driverId' },
            m_name: { $first: '$m_name' },
            m_nationality: { $first: '$m_nationality' },
            m_raceNumber: { $first: '$m_raceNumber' },
            m_teamId: { $first: '$m_teamId' },

            m_numCars: { $first: '$m_numCars' },
            createdAt: { $first: '$createdAt' },
        },
    },
    {
        $project: {
            _id: '$originalId', // Restore original ID.
            m_packetFormat: '$m_packetFormat',
            m_packetVersion: '$m_packetVersion',
            m_packetId: '$m_packetId',
            m_sessionUID: '$m_sessionUID',
            m_sessionTime: '$m_sessionTime',
            m_frameIdentifier: '$m_frameIdentifier',
            m_playerCarIndex: '$m_playerCarIndex',
            m_surfaceType: '$m_surfaceType',

            m_aiControlled: '$m_aiControlled',
            m_driverId: '$m_driverId',
            m_name: '$m_name',
            m_nationality: '$m_nationality',
            m_raceNumber: '$m_raceNumber',
            m_teamId: '$m_teamId',

            m_numCars: '$m_numCars',
            createdAt: '$createdAt',
        },
    },
]

const handler = (router: express.Router) => {
    router.get('/sessions', async (req, res) => {
        try {
            const perPage = 50
            const page = 1
            const sessions: ISessionDoc[] = await Session.aggregate(
                [...sessionPipelines],
                { allowDiskUse: true }
            )
                .sort({ createdAt: -1 })
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec()
            const sessionUIDs = sessions.map((session) => session.m_sessionUID)
            const sessionHistories: ISessionHistoryDoc[] =
                await SessionHistory.aggregate(
                    [
                        ...sessionHistoryPipelines,
                        ...[
                            {
                                $match: {
                                    'm_sessionUID': {
                                        $in: sessionUIDs,
                                    },
                                    $expr: {
                                        $eq: [
                                            '$m_carIdx',
                                            '$m_playerCarIndex',
                                        ],
                                    },
                                },
                            },
                        ],
                    ],
                    { allowDiskUse: true }
                )
                    .sort({ createdAt: -1 })
                    .exec()
            const participants: IParticipantDoc[] = await Participant.aggregate(
                [
                    {
                        $match: {
                            m_sessionUID: {
                                $in: sessionUIDs,
                            },
                        },
                    },
                ],
                { allowDiskUse: true }
            )
                .sort({ createdAt: -1 })
                .exec()

            // map sessionHistory to sessions
            const records = sessions.map((session) => {
                const sessionHistory = sessionHistories.find(
                    (sessionHistory) =>
                        sessionHistory.m_sessionUID ===
                        session.m_sessionUID
                )
                const _participants = participants.find(
                    (participant) =>
                        participant.m_sessionUID ===
                        session.m_sessionUID
                )

                if (sessionHistory) {
                    session.sessionHistory = sessionHistory
                }

                if (_participants) {
                    session.participants = participants
                }

                return session
            })

            res.json(records)
        } catch (error) {
            console.error(error)
            return exceptionHandler(error, res)
        }
    })
}

export default handler
