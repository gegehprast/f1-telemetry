import { FinalClassificationData, PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface IFinalClassificationDoc extends Document {
    m_header: PacketHeader;
    m_numCars: number;
    m_classificationData: FinalClassificationData[];
}

export const FinalClassificationSchema: Schema = new Schema({
    m_header: {
        type: Object,
        required: true,
    },
    m_numCars: {
        type: Number,
        required: true,
    },
    m_classificationData: {
        type: Array<FinalClassificationData>,
        required: true,
    },
})

const FinalClassification = mongoose.model<IFinalClassificationDoc>('finalclassification', FinalClassificationSchema)

export default FinalClassification
