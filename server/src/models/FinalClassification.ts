import mongoose, { Schema, Document } from 'mongoose'

export interface IFinalClassificationDoc extends Document {
    // PacketHeader
    m_packetFormat: number;
    m_packetVersion: number;
    m_packetId: number;
    m_sessionUID: string;
    m_sessionTime: number;
    m_frameIdentifier: number;
    m_playerCarIndex: number;
    m_surfaceType: number[];

    // FinalClassificationData
    m_position: number;
    m_numLaps: number;
    m_gridPosition: number;
    m_points: number;
    m_numPitStops: number;
    m_resultStatus: number;
    m_bestLapTime: number;
    m_totalRaceTime: number;
    m_penaltiesTime: number;
    m_numPenalties: number;
    m_tyreStintsActual: number[];
    m_tyreStintsVisual: number[];

    // PacketFinalClassificationData
    m_numCars: number

    // basic
    carIndex: number;
    createdAt: Date
}

export const FinalClassificationSchema: Schema = new Schema({
    // PacketHeader
    m_packetFormat: {
        type: Number
    },
    m_packetVersion: {
        type: Number
    },
    m_packetId: {
        type: Number
    },
    m_sessionUID: {
        type: String
    },
    m_sessionTime: {
        type: Number
    },
    m_frameIdentifier: {
        type: Number
    },
    m_playerCarIndex: {
        type: Number
    },
    m_surfaceType: {
        type: Array<Number>
    },
    
    // FinalClassificationData
    m_position: {
        type: Number
    },
    m_numLaps: {
        type: Number
    },
    m_gridPosition: {
        type: Number
    },
    m_points: {
        type: Number
    },
    m_numPitStops: {
        type: Number
    },
    m_resultStatus: {
        type: Number
    },
    m_bestLapTime: {
        type: Number
    },
    m_totalRaceTime: {
        type: Number
    },
    m_penaltiesTime: {
        type: Number
    },
    m_numPenalties: {
        type: Number
    },
    m_tyreStintsActual: {
        type: Array<Number>
    },
    m_tyreStintsVisual: {
        type: Array<Number>
    },

    // PacketEventData
    m_numCars: {
        type: Number,
    },

    // basic
    carIndex: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

FinalClassificationSchema.index({ createdAt: -1 }, { unique: false })

const FinalClassification = mongoose.model<IFinalClassificationDoc>('finalclassification', FinalClassificationSchema)

export default FinalClassification
