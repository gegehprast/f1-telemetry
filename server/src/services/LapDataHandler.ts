import { PacketLapData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import LapData from '../models/LapData'
import { Listener, MinifiedPacketHeader, onlyPlayerCarData } from './Helper'

export const lapDataHandler: Listener = async (data: PacketLapData) => {
    try {
        const header = MinifiedPacketHeader(data.m_header)
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
