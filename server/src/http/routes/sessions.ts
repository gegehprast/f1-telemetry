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
            m_sessionUID: { $first: '$m_sessionUID' },
            m_sessionTime: { $first: '$m_sessionTime' },
            m_playerCarIndex: { $first: '$m_playerCarIndex' },

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
            createdAt: { $first: '$createdAt' },
        },
    },
    {
        $project: {
            _id: '$originalId', // Restore original ID.
            m_sessionUID: '$m_sessionUID',
            m_sessionTime: '$m_sessionTime',
            m_playerCarIndex: '$m_playerCarIndex',

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
            m_sessionUID: { $first: '$m_sessionUID' },
            m_playerCarIndex: { $first: '$m_playerCarIndex' },

            m_carIdx: { $first: '$m_carIdx' },
            m_bestLapTimeLapNum: { $first: '$m_bestLapTimeLapNum' },
            m_bestSector1LapNum: { $first: '$m_bestSector1LapNum' },
            m_bestSector2LapNum: { $first: '$m_bestSector2LapNum' },
            m_bestSector3LapNum: { $first: '$m_bestSector3LapNum' },
            m_lapHistoryData: { $first: '$m_lapHistoryData' },
            createdAt: { $first: '$createdAt' },
        },
    },
    {
        $project: {
            _id: '$originalId', // Restore original ID.
            m_sessionUID: '$m_sessionUID',
            m_playerCarIndex: '$m_playerCarIndex',

            m_carIdx: '$m_carIdx',
            m_bestLapTimeLapNum: '$m_bestLapTimeLapNum',
            m_bestSector1LapNum: '$m_bestSector1LapNum',
            m_bestSector2LapNum: '$m_bestSector2LapNum',
            m_bestSector3LapNum: '$m_bestSector3LapNum',
            m_lapHistoryData: {
                $filter: {
                    input: '$m_lapHistoryData',
                    cond: {
                        $ne: ['$$m_lapHistoryData.m_lapValidBitFlags', 0],
                    },
                    as: 'm_lapHistoryData',
                },
            },
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
            _id: '$carIndex', // Set the unique identifier
            originalId: { $first: '$_id' },
            m_sessionUID: { $first: '$m_sessionUID' },

            m_aiControlled: { $first: '$m_aiControlled' },
            m_driverId: { $first: '$m_driverId' },
            m_name: { $first: '$m_name' },
            m_nationality: { $first: '$m_nationality' },
            m_raceNumber: { $first: '$m_raceNumber' },
            m_teamId: { $first: '$m_teamId' },

            m_numCars: { $first: '$m_numCars' },
            carIndex: { $first: '$carIndex' },
            createdAt: { $first: '$createdAt' },
        },
    },
    {
        $project: {
            _id: '$originalId',
            m_sessionUID: '$m_sessionUID',

            m_aiControlled: '$m_aiControlled',
            m_driverId: '$m_driverId',
            m_name: '$m_name',
            m_nationality: '$m_nationality',
            m_raceNumber: '$m_raceNumber',
            m_teamId: '$m_teamId',

            m_numCars: '$m_numCars',
            carIndex: '$carIndex',
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
                        ...sessionHistoryPipelines,
                    ],
                    { allowDiskUse: true }
                )
                    .sort({ createdAt: -1 })
                    .exec()

            // map sessionHistory to sessions
            const promises = sessions.map(async (session) => {
                const sessionHistory = sessionHistories.find(
                    (sessionHistory) =>
                        sessionHistory.m_sessionUID ===
                        session.m_sessionUID
                )
                const participants: IParticipantDoc[] = await Participant.aggregate(
                    [
                        {
                            $match: {
                                m_sessionUID: session.m_sessionUID,
                            },
                        },
                        ...participantPipelines,
                    ],
                    { allowDiskUse: true }
                )
                    .sort({ createdAt: -1 })
                    .exec()
                

                if (sessionHistory) {
                    session.sessionHistory = sessionHistory
                }

                if (participants) {
                    session.participants = participants
                }

                return session
            })

            const records = await Promise.all(promises)
                .then((results) => {
                    return results
                })
                .catch((e) => {
                    console.error(e)
                })

            res.json(records)
        } catch (error) {
            console.error(error)
            return exceptionHandler(error, res)
        }
    })
}

export default handler
