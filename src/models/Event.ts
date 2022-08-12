import { PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface IEventDoc extends Document {
    m_header: PacketHeader
    m_eventStringCode: string
    m_eventDetails: any
}

export const EventSchema: Schema = new Schema({
    m_header: {
        type: Object,
        required: true,
    },
    m_eventStringCode: {
        type: String,
        required: true,
    },
    m_eventDetails: {
        type: Object,
        required: true,
    },
})

const Event = mongoose.model<IEventDoc>('event', EventSchema)

export default Event
