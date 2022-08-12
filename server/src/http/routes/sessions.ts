import express from 'express'
import Session from '../../models/Session'
import { exceptionHandler } from '../exceptions/handler'

const handler = (router: express.Router) => {
    router.get('/sessions', async (req, res) => {
        try {
            const perPage = 1
            const page = 1
            const sessions = await Session.aggregate([
                // each Object is an aggregation.
                {
                    $sort: { createdAt: -1 },
                },
                {
                    $group: {
                        originalId: { $first: '$_id' }, // Hold onto original ID.
                        _id: '$m_header.m_sessionUID', // Set the unique identifier
                        m_header: { $first: '$m_header' },
                        m_weather: { $first: '$m_weather' },
                        m_trackTemperature: { $first: '$m_trackTemperature' },
                        m_airTemperature: { $first: '$m_airTemperature' },
                        m_totalLaps: { $first: '$m_totalLaps' },
                        m_trackLength: { $first: '$m_trackLength' },
                        m_sessionType: { $first: '$m_sessionType' },
                        m_trackId: { $first: '$m_trackId' },
                        m_era: { $first: '$m_era' },
                        m_formula: { $first: '$m_formula' },
                        m_sessionTimeLeft: { $first: '$m_sessionTimeLeft' },
                        m_sessionDuration: { $first: '$m_sessionDuration' },
                        m_pitSpeedLimit: { $first: '$m_pitSpeedLimit' },
                        m_gamePaused: { $first: '$m_gamePaused' },
                        m_isSpectating: { $first: '$m_isSpectating' },
                        m_spectatorCarIndex: { $first: '$m_spectatorCarIndex' },
                        m_sliProNativeSupport: {
                            $first: '$m_sliProNativeSupport',
                        },
                        m_numMarshalZones: { $first: '$m_numMarshalZones' },
                        m_marshalZones: { $first: '$m_marshalZones' },
                        m_safetyCarStatus: { $first: '$m_safetyCarStatus' },
                        m_networkGame: { $first: '$m_networkGame' },
                        m_numWeatherForecastSamples: {
                            $first: '$m_numWeatherForecastSamples',
                        },
                        m_weatherForecastSamples: {
                            $first: '$m_weatherForecastSamples',
                        },
                        createdAt: { $first: '$createdAt' },
                    },
                },
                {
                    $project: {
                        _id: '$originalId', // Restore original ID.
                        m_header: '$m_header',
                        m_weather: '$m_weather',
                        m_trackTemperature: '$m_trackTemperature',
                        m_airTemperature: '$m_airTemperature',
                        m_totalLaps: '$m_totalLaps',
                        m_trackLength: '$m_trackLength',
                        m_sessionType: '$m_sessionType',
                        m_trackId: '$m_trackId',
                        m_era: '$m_era',
                        m_formula: '$m_formula',
                        m_sessionTimeLeft: '$m_sessionTimeLeft',
                        m_sessionDuration: '$m_sessionDuration',
                        m_pitSpeedLimit: '$m_pitSpeedLimit',
                        m_gamePaused: '$m_gamePaused',
                        m_isSpectating: '$m_isSpectating',
                        m_spectatorCarIndex: '$m_spectatorCarIndex',
                        m_sliProNativeSupport: '$m_sliProNativeSupport',
                        m_numMarshalZones: '$m_numMarshalZones',
                        m_marshalZones: '$m_marshalZones',
                        m_safetyCarStatus: '$m_safetyCarStatus',
                        m_networkGame: '$m_networkGame',
                        m_numWeatherForecastSamples:
                            '$m_numWeatherForecastSamples',
                        m_weatherForecastSamples: '$m_weatherForecastSamples',
                        createdAt: '$createdAt',
                    },
                },
            ])
                .sort({ createdAt: -1 })
                .skip((page - 1) * perPage)
                .limit(perPage)
                .exec()

            res.json(sessions)
        } catch (error) {
            return exceptionHandler(error, res)
        }
    })
}

export default handler
