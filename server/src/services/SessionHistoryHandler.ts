import { PacketSessionHistoryData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import SessionHistory from '../models/SessionHistory'
import { Listener, parsePacketHeader } from './Helper'

export const sessionHistoryHandler: Listener = async (
    data: PacketSessionHistoryData
) => {
    if (data.m_carIdx !== data.m_header.m_playerCarIndex) {
        return
    }

    try {
        const header = parsePacketHeader(data.m_header)
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
