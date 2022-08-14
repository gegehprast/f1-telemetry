import mongoose, { Schema, Document } from 'mongoose'

export interface ICarSetupDoc extends Document {
    // PacketHeader
    m_packetFormat: number;
    m_packetVersion: number;
    m_packetId: number;
    m_sessionUID: string;
    m_sessionTime: number;
    m_frameIdentifier: number;
    m_playerCarIndex: number;
    m_surfaceType: number[];

    // CarSetupData
    m_frontWing: number;
    m_rearWing: number;
    m_onThrottle: number;
    m_offThrottle: number;
    m_frontCamber: number;
    m_rearCamber: number;
    m_frontToe: number;
    m_rearToe: number;
    m_frontSuspension: number;
    m_rearSuspension: number;
    m_frontAntiRollBar: number;
    m_rearAntiRollBar: number;
    m_frontSuspensionHeight: number;
    m_rearSuspensionHeight: number;
    m_brakePressure: number;
    m_brakeBias: number;
    m_frontTyrePressure: number;
    m_rearTyrePressure: number;
    m_ballast: number;
    m_fuelLoad: number;

    // basic
    createdAt: Date
}

export const CarSetupSchema: Schema = new Schema({
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

    // CarSetupData
    m_frontWing: {
        type: Number
    },
    m_rearWing: {
        type: Number
    },
    m_onThrottle: {
        type: Number
    },
    m_offThrottle: {
        type: Number
    },
    m_frontCamber: {
        type: Number
    },
    m_rearCamber: {
        type: Number
    },
    m_frontToe: {
        type: Number
    },
    m_rearToe: {
        type: Number
    },
    m_frontSuspension: {
        type: Number
    },
    m_rearSuspension: {
        type: Number
    },
    m_frontAntiRollBar: {
        type: Number
    },
    m_rearAntiRollBar: {
        type: Number
    },
    m_frontSuspensionHeight: {
        type: Number
    },
    m_rearSuspensionHeight: {
        type: Number
    },
    m_brakePressure: {
        type: Number
    },
    m_brakeBias: {
        type: Number
    },
    m_frontTyrePressure: {
        type: Number
    },
    m_rearTyrePressure: {
        type: Number
    },
    m_ballast: {
        type: Number
    },
    m_fuelLoad: {
        type: Number
    },

    // basic
    createdAt: {
        type: Date,
        default: new Date()
    },
})

CarSetupSchema.index({ createdAt: -1 }, { unique: false })

CarSetupSchema.on('index', function(err) {
    if (err) {
        console.error('CarSetupSchema index error: %s', err);
    } else {
        console.info('CarSetupSchema indexing complete');
    }
});

const CarSetup = mongoose.model<ICarSetupDoc>('carsetup', CarSetupSchema)

export default CarSetup
