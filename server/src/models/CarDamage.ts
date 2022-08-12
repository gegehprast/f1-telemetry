import { CarDamageData, PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ICarDamageDoc extends Document {
    m_header: PacketHeader
    m_carDamageData: CarDamageData[]
}

export const CarDamageSchema: Schema = new Schema({
    m_header: {
        type: Object,
    },
    m_carDamageData: {
        type: Array<CarDamageData>,
    },
})

const CarDamage = mongoose.model<ICarDamageDoc>('cardamage', CarDamageSchema)

export default CarDamage
