import { PacketHeader, ParticipantData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface IParticipantDoc extends Document {
    m_header: PacketHeader
    m_numCars: number
    m_participants: ParticipantData[]
    createdAt: Date
}

export const ParticipantSchema: Schema = new Schema({
    m_header: {
        type: Object,
    },
    m_numCars: {
        type: Number,
    },
    m_participants: {
        type: Array<ParticipantData>,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const Participant = mongoose.model<IParticipantDoc>('participant', ParticipantSchema)

export default Participant
