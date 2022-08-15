import express from 'express'
import { PipelineStage } from 'mongoose'
import LapData from '../../models/LapData'
import Participant from '../../models/Participant'
import Session from '../../models/Session'
import SessionHistory from '../../models/SessionHistory'
import { exceptionHandler } from '../exceptions/handler'

const lapDataPipelines: PipelineStage[] = [
    {
        $sort: { createdAt: -1 },
    },
    {
        $group: {
            originalId: { $first: '$_id' }, // Hold onto original ID.
            _id: '$m_currentLapNum', // Set the unique identifier

            // PacketHeader
            m_sessionUID: { $first: '$m_sessionUID' },
            m_sessionTime: { $first: '$m_sessionTime' },
            m_playerCarIndex: { $first: '$m_playerCarIndex' },

            // LapData
            m_lastLapTimeInMS: { $first: '$m_lastLapTimeInMS' },
            m_currentLapTimeInMS: { $first: '$m_currentLapTimeInMS' },
            m_sector1TimeInMS: { $first: '$m_sector1TimeInMS' },
            m_sector2TimeInMS: { $first: '$m_sector2TimeInMS' },

            m_lastLapTime: { $first: '$m_lastLapTime' },
            m_currentLapTime: { $first: '$m_currentLapTime' },
            m_bestLapTime: { $first: '$m_bestLapTime' },
            m_sector1Time: { $first: '$m_sector1Time' },
            m_sector2Time: { $first: '$m_sector2Time' },
            m_lapDistance: { $first: '$m_lapDistance' },
            m_totalDistance: { $first: '$m_totalDistance' },
            m_safetyCarDelta: { $first: '$m_safetyCarDelta' },
            m_carPosition: { $first: '$m_carPosition' },
            m_currentLapNum: { $first: '$m_currentLapNum' },
            m_pitStatus: { $first: '$m_pitStatus' },
            m_sector: { $first: '$m_sector' },
            m_currentLapInvalid: { $first: '$m_currentLapInvalid' },
            m_penalties: { $first: '$m_penalties' },
            m_gridPosition: { $first: '$m_gridPosition' },
            m_driverStatus: { $first: '$m_driverStatus' },
            m_resultStatus: { $first: '$m_resultStatus' },

            // basic
            carIndex: { $first: '$carIndex' },
            createdAt: { $first: '$createdAt' },
        },
    },
    {
        $project: {
            _id: '$originalId', // Restore original ID.

            // PacketHeader
            m_sessionUID: '$m_sessionUID',
            m_sessionTime: '$m_sessionTime',
            m_playerCarIndex: '$m_playerCarIndex',

            // LapData
            m_lastLapTimeInMS: '$m_lastLapTimeInMS',
            m_currentLapTimeInMS: '$m_currentLapTimeInMS',
            m_sector1TimeInMS: '$m_sector1TimeInMS',
            m_sector2TimeInMS: '$m_sector2TimeInMS',

            m_lastLapTime: '$m_lastLapTime',
            m_currentLapTime: '$m_currentLapTime',
            m_bestLapTime: '$m_bestLapTime',
            m_sector1Time: '$m_sector1Time',
            m_sector2Time: '$m_sector2Time',
            m_lapDistance: '$m_lapDistance',
            m_totalDistance: '$m_totalDistance',
            m_safetyCarDelta: '$m_safetyCarDelta',
            m_carPosition: '$m_carPosition',
            m_currentLapNum: '$m_currentLapNum',
            m_pitStatus: '$m_pitStatus',
            m_sector: '$m_sector',
            m_currentLapInvalid: '$m_currentLapInvalid',
            m_penalties: '$m_penalties',
            m_gridPosition: '$m_gridPosition',
            m_driverStatus: '$m_driverStatus',
            m_resultStatus: '$m_resultStatus',

            // basic
            carIndex: '$carIndex',
            createdAt: '$createdAt',
        },
    },
]

const handler = (router: express.Router) => {
    router.get('/laps/:sessionUID', async (req, res) => {
        try {
            const session = await Session.findOne(
                {
                    m_sessionUID: req.params.sessionUID,
                },
                {
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
                    sessionhistories: '$sessionhistories',
                },
                { sort: { createdAt: -1 } }
            ).exec()
            const sessionHistory = await SessionHistory.findOne(
                {
                    m_sessionUID: req.params.sessionUID,
                    $expr: {
                        $eq: ['$m_carIdx', '$m_playerCarIndex'],
                    },
                    m_bestLapTimeLapNum: { $ne: 0 },
                    m_bestSector1LapNum: { $ne: 0 },
                    m_bestSector2LapNum: { $ne: 0 },
                    m_bestSector3LapNum: { $ne: 0 },
                },
                {
                    m_sessionUID: '$m_sessionUID',
                    m_playerCarIndex: '$m_playerCarIndex',

                    m_carIdx: '$m_carIdx',
                    m_bestLapTimeLapNum: '$m_bestLapTimeLapNum',
                    m_bestSector1LapNum: '$m_bestSector1LapNum',
                    m_bestSector2LapNum: '$m_bestSector2LapNum',
                    m_bestSector3LapNum: '$m_bestSector3LapNum',
                    m_lapHistoryData: '$m_lapHistoryData',
                    m_tyreStintsHistoryData: '$m_tyreStintsHistoryData',
                    createdAt: '$createdAt',
                },
                { sort: { createdAt: -1 } }
            ).exec()
            const participants = await Participant.findOne(
                {
                    m_sessionUID: req.params.sessionUID,
                    $expr: {
                        $eq: ['$carIndex', '$m_playerCarIndex'],
                    },
                },
                {
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
                { sort: { createdAt: -1 } }
            ).exec()

            const lapData = await LapData.aggregate(
                [
                    {
                        $match: {
                            m_sessionUID: req.params.sessionUID,
                        },
                    },
                    ...lapDataPipelines,
                    {
                        $sort: { m_currentLapNum: 1 },
                    },
                ],
                { allowDiskUse: true }
            ).exec()
            
            const laps = lapData.map(lap => {
                if (sessionHistory) {
                    lap.add_m_currentLapTimeInMS = sessionHistory.m_lapHistoryData[lap.m_currentLapNum - 1].m_lapTimeInMS
                    lap.add_m_sector1TimeInMS = sessionHistory.m_lapHistoryData[lap.m_currentLapNum - 1].m_sector1TimeInMS
                    lap.add_m_sector2TimeInMS = sessionHistory.m_lapHistoryData[lap.m_currentLapNum - 1].m_sector2TimeInMS
                    lap.add_m_sector3TimeInMS = sessionHistory.m_lapHistoryData[lap.m_currentLapNum - 1].m_sector3TimeInMS
                    lap.add_m_lapValidBitFlags = sessionHistory.m_lapHistoryData[lap.m_currentLapNum - 1].m_lapValidBitFlags
                    lap.add_stint = sessionHistory.m_tyreStintsHistoryData.find(stint => {
                        return stint.m_endLap > lap.m_currentLapNum 
                    })
                }

                return lap
            })

            res.json({
                ...session?.toJSON(),
                ...{
                    sessionHistory: sessionHistory,
                    participants: [participants],
                    laps: laps
                }
            })
        } catch (error) {
            console.log(error)
            return exceptionHandler(error, res)
        }
    })
}

export default handler
