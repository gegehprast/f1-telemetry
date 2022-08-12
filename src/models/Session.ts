import {
    MarshalZone,
    PacketHeader,
    WeatherForecastSample,
} from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ISessionDoc extends Document {
    m_header: PacketHeader
    m_weather: number
    m_trackTemperature: number
    m_airTemperature: number
    m_totalLaps: number
    m_trackLength: number
    m_sessionType: number
    m_trackId: number
    m_era: number
    m_formula: number
    m_sessionTimeLeft: number
    m_sessionDuration: number
    m_pitSpeedLimit: number
    m_gamePaused: number
    m_isSpectating: number
    m_spectatorCarIndex: number
    m_sliProNativeSupport: number
    m_numMarshalZones: number
    m_marshalZones: MarshalZone[]
    m_safetyCarStatus: number
    m_networkGame: number
    m_numWeatherForecastSamples: number
    m_weatherForecastSamples: WeatherForecastSample[]
}

export const SessionSchema: Schema = new Schema({
    m_header: {
        type: Object,
        required: true,
    },
    m_weather: {
        type: Number,
        required: true,
    },
    m_trackTemperature: {
        type: Number,
        required: true,
    },
    m_airTemperature: {
        type: Number,
        required: true,
    },
    m_totalLaps: {
        type: Number,
        required: true,
    },
    m_trackLength: {
        type: Number,
        required: true,
    },
    m_sessionType: {
        type: Number,
        required: true,
    },
    m_trackId: {
        type: Number,
        required: true,
    },
    m_era: {
        type: Number,
        required: true,
    },
    m_formula: {
        type: Number,
        required: true,
    },
    m_sessionTimeLeft: {
        type: Number,
        required: true,
    },
    m_sessionDuration: {
        type: Number,
        required: true,
    },
    m_pitSpeedLimit: {
        type: Number,
        required: true,
    },
    m_gamePaused: {
        type: Number,
        required: true,
    },
    m_isSpectating: {
        type: Number,
        required: true,
    },
    m_spectatorCarIndex: {
        type: Number,
        required: true,
    },
    m_sliProNativeSupport: {
        type: Number,
        required: true,
    },
    m_numMarshalZones: {
        type: Number,
        required: true,
    },
    m_marshalZones: {
        type: Array<MarshalZone>,
        required: true,
    },
    m_safetyCarStatus: {
        type: Number,
        required: true,
    },
    m_networkGame: {
        type: Number,
        required: true,
    },
    m_numWeatherForecastSamples: {
        type: Number,
        required: true,
    },
    m_weatherForecastSamples: {
        type: Array<WeatherForecastSample>,
        required: true,
    },
})

const Session = mongoose.model<ISessionDoc>('session', SessionSchema)

export default Session
