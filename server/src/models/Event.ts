import mongoose, { Schema, Document } from 'mongoose'

export interface IEventDoc extends Document {
    // PacketHeader
    m_packetFormat: number;
    m_packetVersion: number;
    m_packetId: number;
    m_sessionUID: string;
    m_sessionTime: number;
    m_frameIdentifier: number;
    m_playerCarIndex: number;
    m_surfaceType: number[];

    // PacketEventData
    m_eventStringCode: string
    m_eventDetails: Record<string, any>

    // basic
    createdAt: Date
}

export const EventSchema: Schema = new Schema({
    // PacketHeader
    m_packetFormat: {
        type: Number
    },
    m_packetVersion: {
        type: Number
    },
    m_packetId: {
        type: Number
    },
    m_sessionUID: {
        type: String
    },
    m_sessionTime: {
        type: Number
    },
    m_frameIdentifier: {
        type: Number
    },
    m_playerCarIndex: {
        type: Number
    },
    m_surfaceType: {
        type: Array<Number>
    },

    // PacketEventData
    m_eventStringCode: {
        type: String,
    },
    m_eventDetails: {
        type: Object,
    },

    // basic
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

EventSchema.index({ createdAt: -1 }, { unique: false })

const Event = mongoose.model<IEventDoc>('event', EventSchema)

export default Event
