import { CarTelemetryData, PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ICarTelemetryDoc extends Document {
    m_header: PacketHeader
    m_buttonStatus: number
    m_carTelemetryData: CarTelemetryData[]
    m_mfdPanelIndex: number
    m_mfdPanelIndexSecondaryPlayer: number
    m_suggestedGear: number
    createdAt: Date
}

export const CarTelemetrySchema: Schema = new Schema({
    m_header: {
        type: Object,
    },
    m_buttonStatus: {
        type: Number,
    },
    m_carTelemetryData: {
        type: Array<CarTelemetryData>,
    },
    m_mfdPanelIndex: {
        type: Number,
    },
    m_mfdPanelIndexSecondaryPlayer: {
        type: Number,
    },
    m_suggestedGear: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const CarTelemetry = mongoose.model<ICarTelemetryDoc>('cartelemetry', CarTelemetrySchema)

export default CarTelemetry
