import { CarSetupData, PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ICarSetupDoc extends Document {
    m_header: PacketHeader
    m_carSetups: CarSetupData[]
    createdAt: Date
}

export const CarSetupSchema: Schema = new Schema({
    m_header: {
        type: Object,
    },
    m_carSetups: {
        type: Array<CarSetupData>,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const CarSetup = mongoose.model<ICarSetupDoc>('carsetup', CarSetupSchema)

export default CarSetup
