import mongoose, { Schema, Document } from 'mongoose'

export interface ICarTelemetryDoc extends Document {
    // PacketHeader
    m_packetFormat: number;
    m_packetVersion: number;
    m_packetId: number;
    m_sessionUID: string;
    m_sessionTime: number;
    m_frameIdentifier: number;
    m_playerCarIndex: number;
    m_surfaceType: number[];

    // CarTelemetryData
    m_speed: number;
    m_throttle: number;
    m_steer: number;
    m_brake: number;
    m_clutch: number;
    m_gear: number;
    m_tyresPressure: number[];
    m_brakesTemperature: number[];
    m_tyresSurfaceTemperature: number[];
    m_tyresInnerTemperature: number[];
    m_engineRPM: number;
    m_drs: number;
    m_revLightsPercent: number;
    m_engineTemperature: number;

    // PacketCarTelemetryData
    m_buttonStatus: number;
    m_mfdPanelIndex: number;
    m_mfdPanelIndexSecondaryPlayer: number;
    m_suggestedGear: number;

    createdAt: Date;
}

export const CarTelemetrySchema: Schema = new Schema({
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

    // CarTelemetryData
    m_speed: {
        type: Number
    },
    m_throttle: {
        type: Number
    },
    m_steer: {
        type: Number
    },
    m_brake: {
        type: Number
    },
    m_clutch: {
        type: Number
    },
    m_gear: {
        type: Number
    },
    m_tyresPressure: {
        type: Array<Number>
    },
    m_brakesTemperature: {
        type: Array<Number>
    },
    m_tyresSurfaceTemperature: {
        type: Array<Number>
    },
    m_tyresInnerTemperature: {
        type: Array<Number>
    },
    m_engineRPM: {
        type: Number
    },
    m_drs: {
        type: Number
    },
    m_revLightsPercent: {
        type: Number
    },
    m_engineTemperature: {
        type: Number
    },

    // PacketCarTelemetryData
    m_buttonStatus: {
        type: Number,
    },
    m_mfdPanelIndex: {
        type: Number,
    },
    m_mfdPanelIndexSecondaryPlayer: {
        type: Number,
    },
    m_suggestedGear: {
        type: Number,
    },

    // basic
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

CarTelemetrySchema.index({ createdAt: -1 }, { unique: false })

CarTelemetrySchema.on('index', function(err) {
    if (err) {
        console.error('CarTelemetrySchema index error: %s', err);
    } else {
        console.info('CarTelemetrySchema indexing complete');
    }
});

const CarTelemetry = mongoose.model<ICarTelemetryDoc>('cartelemetry', CarTelemetrySchema)

export default CarTelemetry
