import { MotionData, PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface IMotionDoc extends Document {
    m_header: PacketHeader
    m_carMotionData: MotionData[]
    createdAt: Date
}

export const MotionSchema: Schema = new Schema({
    m_header: {
        type: Object,
    },
    m_carMotionData: {
        type: Array<MotionData>,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const Motion = mongoose.model<IMotionDoc>('motion', MotionSchema)

export default Motion
