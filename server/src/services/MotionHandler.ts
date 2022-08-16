import { PacketMotionData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import Motion from '../models/Motion'
import { Listener, parsePacketHeader } from './Helper'

export const motionHandler: Listener = async (data: PacketMotionData) => {
    try {
        const doc = new Motion({
            ...data,
            ...{
                m_header: parsePacketHeader(data.m_header),
                createdAt: new Date(),
            },
        })
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}
