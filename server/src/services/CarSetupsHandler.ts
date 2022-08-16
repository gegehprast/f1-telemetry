import { PacketCarSetupData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import CarSetup from '../models/CarSetup'
import { Listener, parsePacketHeader, onlyPlayerCarData } from './Helper'

export const carSetupsHandler: Listener = async (data: PacketCarSetupData) => {
    try {
        const m_carSetups = onlyPlayerCarData(
            data.m_header.m_playerCarIndex,
            data.m_carSetups
        )
        const doc = new CarSetup({
            ...parsePacketHeader(data.m_header),
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
