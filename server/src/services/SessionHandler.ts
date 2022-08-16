import { PacketSessionData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import Session from '../models/Session'
import { Listener, parsePacketHeader } from './Helper'

export const sessionHandler: Listener = async (data: PacketSessionData) => {
    try {
        const header = parsePacketHeader(data.m_header)
        await Session.updateOne(
            { m_sessionUID: header.m_sessionUID },
            {
                ...header,
                ...{
                    m_weather: data.m_weather,
                    m_trackTemperature: data.m_trackTemperature,
                    m_airTemperature: data.m_airTemperature,
                    m_totalLaps: data.m_totalLaps,
                    m_trackLength: data.m_trackLength,
                    m_sessionType: data.m_sessionType,
                    m_trackId: data.m_trackId,
                    m_era: data.m_era,
                    m_formula: data.m_formula,
                    m_sessionTimeLeft: data.m_sessionTimeLeft,
                    m_sessionDuration: data.m_sessionDuration,
                    m_pitSpeedLimit: data.m_pitSpeedLimit,
                    m_gamePaused: data.m_gamePaused,
                    m_isSpectating: data.m_isSpectating,
                    m_spectatorCarIndex: data.m_spectatorCarIndex,
                    m_sliProNativeSupport: data.m_sliProNativeSupport,
                    m_numMarshalZones: data.m_numMarshalZones,
                    m_marshalZones: data.m_marshalZones,
                    m_safetyCarStatus: data.m_safetyCarStatus,
                    m_networkGame: data.m_networkGame,
                    m_numWeatherForecastSamples:
                        data.m_numWeatherForecastSamples,
                    m_weatherForecastSamples: data.m_weatherForecastSamples,
                    createdAt: new Date(),
                },
            },
            {
                upsert: true,
                setDefaultsOnInsert: true,
            }
        ).exec()
    } catch (error) {
        console.log(error)
    }
}
