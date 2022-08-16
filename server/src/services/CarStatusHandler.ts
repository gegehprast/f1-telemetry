import { PacketCarStatusData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import CarStatus from '../models/CarStatus'
import { Listener, MinifiedPacketHeader, onlyPlayerCarData } from './Helper'

export const carStatusHandler: Listener = async (data: PacketCarStatusData) => {
    try {
        const m_carStatusData = onlyPlayerCarData(
            data.m_header.m_playerCarIndex,
            data.m_carStatusData
        )
        const doc = new CarStatus({
            ...MinifiedPacketHeader(data.m_header),
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
