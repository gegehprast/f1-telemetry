import { LapData, PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ILapDataDoc extends Document {
    m_header: PacketHeader
    m_lapData: LapData[]
    createdAt: Date
}

export const LapDataSchema: Schema = new Schema({
    m_header: {
        type: Object,
    },
    m_lapData: {
        type: Array<LapData>,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const LapData = mongoose.model<ILapDataDoc>('lapdata', LapDataSchema)

export default LapData
