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
    },
    m_numCars: {
        type: Number,
    },
    m_classificationData: {
        type: Array<FinalClassificationData>,
    },
})

const FinalClassification = mongoose.model<IFinalClassificationDoc>('finalclassification', FinalClassificationSchema)

export default FinalClassification
