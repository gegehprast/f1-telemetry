import { PacketMotionData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import Motion from '../models/Motion'
import { Listener, MinifiedPacketHeader } from './Helper'

export const motionHandler: Listener = async (data: PacketMotionData) => {
    try {
        const doc = new Motion({
            ...data,
            ...{
                m_header: MinifiedPacketHeader(data.m_header),
                createdAt: new Date(),
            },
        })
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}
