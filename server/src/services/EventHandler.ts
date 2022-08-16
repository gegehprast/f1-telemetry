import { PacketEventData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import Event from '../models/Event'
import { Listener, parsePacketHeader } from './Helper'

export const eventHandler: Listener = async (data: PacketEventData) => {
    try {
        if (['CHQF', 'BUTN'].includes(data.m_eventStringCode)) {
            return
        }

        const doc = new Event({
            ...parsePacketHeader(data.m_header),
            ...{
                ...data,
                createdAt: new Date(),
            },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}
