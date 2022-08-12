import {
    LapHistoryData,
    PacketHeader,
    TyreStintsHistoryData,
} from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ISessionHistoryDoc extends Document {
    m_header: PacketHeader;
    m_carIdx: number;
    m_numLaps: number;
    m_numTyreStints: number;
    m_bestLapTimeLapNum: number;
    m_bestSector1LapNum: number;
    m_bestSector2LapNum: number;
    m_bestSector3LapNum: number;
    m_lapHistoryData: LapHistoryData[];
    m_tyreStintsHistoryData: TyreStintsHistoryData[];
}

export const SessionHistorySchema: Schema = new Schema({
    m_header: {
        type: Object,
        required: true,
    },
    m_carIdx: {
        type: Number,
        required: true,
    },
    m_numLaps: {
        type: Number,
        required: true,
    },
    m_numTyreStints: {
        type: Number,
        required: true,
    },
    m_bestLapTimeLapNum: {
        type: Number,
        required: true,
    },
    m_bestSector1LapNum: {
        type: Number,
        required: true,
    },
    m_bestSector2LapNum: {
        type: Number,
        required: true,
    },
    m_bestSector3LapNum: {
        type: Number,
        required: true,
    },
    m_lapHistoryData: {
        type: Array<LapHistoryData>,
        required: true,
    },
    m_tyreStintsHistoryData: {
        type: Array<TyreStintsHistoryData>,
        required: true,
    },
})

const SessionHistory = mongoose.model<ISessionHistoryDoc>('sessionhistory', SessionHistorySchema)

export default SessionHistory
