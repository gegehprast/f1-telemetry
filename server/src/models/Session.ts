import {
    MarshalZone,
    WeatherForecastSample,
} from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import { Schema, Document, model } from 'mongoose'
import { IParticipantDoc } from './Participant'
import { ISessionHistoryDoc } from './SessionHistory'
import { WithPagination } from './Types'

export interface ISessionDoc extends Document {
    // PacketHeader
    m_packetFormat: number;
    m_packetVersion: number;
    m_packetId: number;
    m_sessionUID: string;
    m_sessionTime: number;
    m_frameIdentifier: number;
    m_playerCarIndex: number;
    m_surfaceType: number[];

    // PacketSessionData
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

    // basic
    createdAt: Date

    // extras
    sessionHistory?: ISessionHistoryDoc
    participants?: IParticipantDoc[]
}

export const SessionSchema: Schema = new Schema(
    {
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

        // PacketSessionData
        m_weather: {
            type: Number,
        },
        m_trackTemperature: {
            type: Number,
        },
        m_airTemperature: {
            type: Number,
        },
        m_totalLaps: {
            type: Number,
        },
        m_trackLength: {
            type: Number,
        },
        m_sessionType: {
            type: Number,
        },
        m_trackId: {
            type: Number,
        },
        m_era: {
            type: Number,
        },
        m_formula: {
            type: Number,
        },
        m_sessionTimeLeft: {
            type: Number,
        },
        m_sessionDuration: {
            type: Number,
        },
        m_pitSpeedLimit: {
            type: Number,
        },
        m_gamePaused: {
            type: Number,
        },
        m_isSpectating: {
            type: Number,
        },
        m_spectatorCarIndex: {
            type: Number,
        },
        m_sliProNativeSupport: {
            type: Number,
        },
        m_numMarshalZones: {
            type: Number,
        },
        m_marshalZones: {
            type: Array<MarshalZone>,
        },
        m_safetyCarStatus: {
            type: Number,
        },
        m_networkGame: {
            type: Number,
        },
        m_numWeatherForecastSamples: {
            type: Number,
        },
        m_weatherForecastSamples: {
            type: Array<WeatherForecastSample>,
        },

        // basic
        createdAt: {
            type: Date,
            default: new Date()
        },
    }, 
    {
        query: {
            paginate(page: number, perPage: number) {
                return this.skip((page - 1) * perPage).limit(perPage)
            }
        }
    }
)

SessionSchema.index({ m_sessionUID: 1 }, { unique: false })
SessionSchema.index({ createdAt: -1 }, { unique: false })

SessionSchema.on('index', function(err) {
    if (err) {
        console.error('SessionSchema index error: %s', err);
    } else {
        console.info('SessionSchema indexing complete');
    }
});

const Session = model<ISessionDoc, WithPagination<ISessionDoc>>('session', SessionSchema)

export default Session
