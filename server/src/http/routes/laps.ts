import express from 'express'
import { PipelineStage } from 'mongoose'
import SessionHistory, { ISessionHistoryDoc } from '../../models/SessionHistory'
import { exceptionHandler } from '../exceptions/handler'
import HttpException from '../exceptions/HttpException'

const sessionHistoryPipelines: PipelineStage[] = [
    {
        $sort: { createdAt: -1 },
    },
    {
        $group: {
            originalId: { $first: '$_id' }, // Hold onto original ID.
            _id: '$m_header.m_sessionUID', // Set the unique identifier
            m_header: { $first: '$m_header' },
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
            m_header: '$m_header',
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

const handler = (router: express.Router) => {
    router.get('/laps/:sessionUID', async (req, res) => {
        try {
            const records: ISessionHistoryDoc[] =
                await SessionHistory.aggregate(
                    [
                        ...sessionHistoryPipelines,
                        ...[
                            {
                                $match: {
                                    'm_header.m_sessionUID': req.params.sessionUID,
                                },
                            },
                        ],
                    ],
                    { allowDiskUse: true }
                )
                    .sort({ createdAt: -1 })
                    .exec()

            if (!records.length) {
                throw new HttpException(404, 'Not found.')
            }

            res.json(records[0])
        } catch (error) {
            return exceptionHandler(error, res)
        }
    })
}

export default handler
