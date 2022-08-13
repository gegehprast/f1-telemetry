import mongoose, { Schema, Document } from 'mongoose'

export interface ILapDataDoc extends Document {
    // PacketHeader
    m_packetFormat: number;
    m_packetVersion: number;
    m_packetId: number;
    m_sessionUID: string;
    m_sessionTime: number;
    m_frameIdentifier: number;
    m_playerCarIndex: number;
    m_surfaceType: number[];

    // LapData
    m_lastLapTimeInMS: number; // correct one
    m_currentLapTimeInMS: number; // correct one
    m_sector1TimeInMS: number; // correct one
    m_sector2TimeInMS: number; // correct one

    m_lastLapTime: number;
    m_currentLapTime: number;
    m_bestLapTime: number;
    m_sector1Time: number;
    m_sector2Time: number;
    m_lapDistance: number;
    m_totalDistance: number;
    m_safetyCarDelta: number;
    m_carPosition: number;
    m_currentLapNum: number;
    m_pitStatus: number;
    m_sector: number;
    m_currentLapInvalid: number;
    m_penalties: number;
    m_gridPosition: number;
    m_driverStatus: number;
    m_resultStatus: number;

    // basic
    carIndex: number;
    createdAt: Date
}

export const LapDataSchema: Schema = new Schema({
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

    // LapData
    m_lastLapTimeInMS: {
        type: Number
    },
    m_currentLapTimeInMS: {
        type: Number
    },
    m_sector1TimeInMS: {
        type: Number
    },
    m_sector2TimeInMS: {
        type: Number
    },

    m_lastLapTime: {
        type: Number
    },
    m_currentLapTime: {
        type: Number
    },
    m_bestLapTime: {
        type: Number
    },
    m_sector1Time: {
        type: Number
    },
    m_sector2Time: {
        type: Number
    },
    m_lapDistance: {
        type: Number
    },
    m_totalDistance: {
        type: Number
    },
    m_safetyCarDelta: {
        type: Number
    },
    m_carPosition: {
        type: Number
    },
    m_currentLapNum: {
        type: Number
    },
    m_pitStatus: {
        type: Number
    },
    m_sector: {
        type: Number
    },
    m_currentLapInvalid: {
        type: Number
    },
    m_penalties: {
        type: Number
    },
    m_gridPosition: {
        type: Number
    },
    m_driverStatus: {
        type: Number
    },
    m_resultStatus: {
        type: Number
    },

    // basic
    carIndex: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

LapDataSchema.index({ createdAt: -1 }, { unique: false })

LapDataSchema.index({ m_currentLapNum: 1 }, { unique: false })

const LapData = mongoose.model<ILapDataDoc>('lapdata', LapDataSchema)

export default LapData
