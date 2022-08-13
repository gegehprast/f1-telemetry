import express from 'express'
import { PipelineStage } from 'mongoose'
import LapData from '../../models/LapData'
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
            const sessionHistory = await SessionHistory.findOne(
                {
                    m_sessionUID: req.params.sessionUID,
                    $expr: {
                        $eq: ['$m_carIdx', '$m_playerCarIndex'],
                    },
                },
                null,
                { sort: { createdAt: -1 } }
            ).exec()
            const lapData = await LapData.aggregate(
                [
                    ...lapDataPipelines,
                    {
                        $match: {
                            m_sessionUID: req.params.sessionUID,
                        },
                    },
                    {
                        $sort: { m_currentLapNum: 1 },
                    },
                ],
                { allowDiskUse: true }
            ).exec()
            
            const records = lapData.map(lap => {
                if (sessionHistory) {
                    lap.m_lapTimeInMS = sessionHistory.m_lapHistoryData[lap.m_currentLapNum - 1].m_lapTimeInMS
                    lap.m_sector1TimeInMS = sessionHistory.m_lapHistoryData[lap.m_currentLapNum - 1].m_sector1TimeInMS
                    lap.m_sector2TimeInMS = sessionHistory.m_lapHistoryData[lap.m_currentLapNum - 1].m_sector2TimeInMS
                    lap.m_sector3TimeInMS = sessionHistory.m_lapHistoryData[lap.m_currentLapNum - 1].m_sector3TimeInMS
                    lap.stint = sessionHistory.m_tyreStintsHistoryData.find(stint => {
                        return stint.m_endLap > lap.m_currentLapNum 
                    })
                }

                return lap
            })

            res.json(records)
        } catch (error) {
            return exceptionHandler(error, res)
        }
    })
}

export default handler
