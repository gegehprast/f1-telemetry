import { PacketEventData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import Event from '../models/Event'
import { Listener, MinifiedPacketHeader } from './Helper'

export const eventHandler: Listener = async (data: PacketEventData) => {
    try {
        if (['CHQF', 'BUTN'].includes(data.m_eventStringCode)) {
            return
        }

        const doc = new Event({
            ...MinifiedPacketHeader(data.m_header),
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
