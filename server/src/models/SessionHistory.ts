import {
    LapHistoryData,
    TyreStintsHistoryData,
} from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ISessionHistoryDoc extends Document {
    // PacketHeader
    m_packetFormat: number;
    m_packetVersion: number;
    m_packetId: number;
    m_sessionUID: string;
    m_sessionTime: number;
    m_frameIdentifier: number;
    m_playerCarIndex: number;
    m_surfaceType: number[];

    // PacketSessionHistoryData
    m_carIdx: number
    m_numLaps: number
    m_numTyreStints: number
    m_bestLapTimeLapNum: number
    m_bestSector1LapNum: number
    m_bestSector2LapNum: number
    m_bestSector3LapNum: number
    m_lapHistoryData: LapHistoryData[]
    m_tyreStintsHistoryData: TyreStintsHistoryData[]

    // basic
    createdAt: Date
}

export const SessionHistorySchema: Schema = new Schema({
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

    // PacketSessionHistoryData
    m_carIdx: {
        type: Number,
    },
    m_numLaps: {
        type: Number,
    },
    m_numTyreStints: {
        type: Number,
    },
    m_bestLapTimeLapNum: {
        type: Number,
    },
    m_bestSector1LapNum: {
        type: Number,
    },
    m_bestSector2LapNum: {
        type: Number,
    },
    m_bestSector3LapNum: {
        type: Number,
    },
    m_lapHistoryData: {
        type: Array<LapHistoryData>,
    },
    m_tyreStintsHistoryData: {
        type: Array<TyreStintsHistoryData>,
    },

    // basic
    createdAt: {
        type: Date,
        default: new Date()
    },
})

SessionHistorySchema.index({ createdAt: -1 }, { unique: false })

const SessionHistory = mongoose.model<ISessionHistoryDoc>('sessionhistory', SessionHistorySchema)

export default SessionHistory
