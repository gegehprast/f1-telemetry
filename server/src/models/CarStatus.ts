import { CarStatusData, PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ICarStatusDoc extends Document {
    m_header: PacketHeader
    m_carStatusData: CarStatusData[]
}

export const CarStatusSchema: Schema = new Schema({
    m_header: {
        type: Object,
    },
    m_carStatusData: {
        type: Array<CarStatusData>,
    },
})

const CarStatus = mongoose.model<ICarStatusDoc>('carstatus', CarStatusSchema)

export default CarStatus