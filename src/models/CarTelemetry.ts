import { CarTelemetryData, PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ICarTelemetryDoc extends Document {
    m_header: PacketHeader;
    m_buttonStatus: number;
    m_carTelemetryData: CarTelemetryData[];
    m_mfdPanelIndex: number;
    m_mfdPanelIndexSecondaryPlayer: number;
    m_suggestedGear: number;
}

export const CarTelemetrySchema: Schema = new Schema({
    m_header: {
        type: Object,
        required: true,
    },
    m_buttonStatus: {
        type: Number,
        required: true,
    },
    m_carTelemetryData: {
        type: Array<CarTelemetryData>,
        required: true,
    },
    m_mfdPanelIndex: {
        type: Number,
        required: true,
    },
    m_mfdPanelIndexSecondaryPlayer: {
        type: Number,
        required: true,
    },
    m_suggestedGear: {
        type: Number,
        required: true,
    },
})

const CarTelemetry = mongoose.model<ICarTelemetryDoc>('cartelemetry', CarTelemetrySchema)

export default CarTelemetry
