import { PacketCarDamageData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import CarDamage from '../models/CarDamage'
import { Listener, onlyPlayerCarData, MinifiedPacketHeader } from './Helper'

export const carDamageHandler: Listener = async (data: PacketCarDamageData) => {
    try {
        const m_carDamageData = onlyPlayerCarData(
            data.m_header.m_playerCarIndex,
            data.m_carDamageData
        )
        const doc = new CarDamage({
            ...MinifiedPacketHeader(data.m_header),
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
