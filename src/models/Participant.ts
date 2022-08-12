import { PacketHeader, ParticipantData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface IParticipantDoc extends Document {
    m_header: PacketHeader;
    m_numCars: number;
    m_participants: ParticipantData[];
}

export const ParticipantSchema: Schema = new Schema({
    m_header: {
        type: Object,
        required: true,
    },
    m_numCars: {
        type: Number,
        required: true,
    },
    m_carParticipantData: {
        type: Array<ParticipantData>,
        required: true,
    },
})

const Participant = mongoose.model<IParticipantDoc>('participant', ParticipantSchema)

export default Participant
