export interface ISessionDoc {
    // PacketHeader
    m_packetFormat: number
    m_packetVersion: number
    m_packetId: number
    m_sessionUID: string
    m_sessionTime: number
    m_frameIdentifier: number
    m_playerCarIndex: number
    m_surfaceType: number[]

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
    createdAt: string

    // extras
    sessionHistory: ISessionHistoryDoc
    participants: IParticipantDoc[]
}

export interface ISessionHistoryDoc {
    // PacketHeader
    m_packetFormat: number
    m_packetVersion: number
    m_packetId: number
    m_sessionUID: string
    m_sessionTime: number
    m_frameIdentifier: number
    m_playerCarIndex: number
    m_surfaceType: number[]

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
    createdAt: string
}

export interface IParticipantDoc {
    // PacketHeader
    m_packetFormat: number
    m_packetVersion: number
    m_packetId: number
    m_sessionUID: string
    m_sessionTime: number
    m_frameIdentifier: number
    m_playerCarIndex: number
    m_surfaceType: number[]

    // ParticipantData
    m_aiControlled: number
    m_driverId: number
    m_name: string
    m_nationality: number
    m_raceNumber: number
    m_teamId: number

    // PacketParticipantsData
    m_numCars: number

    // basic
    carIndex: number
    createdAt: string
}

export interface ILapDataDoc {
    // PacketHeader
    m_packetFormat: number
    m_packetVersion: number
    m_packetId: number
    m_sessionUID: string
    m_sessionTime: number
    m_frameIdentifier: number
    m_playerCarIndex: number
    m_surfaceType: number[]

    // LapData
    m_lastLapTimeInMS: number // correct one
    m_currentLapTimeInMS: number // correct one
    m_sector1TimeInMS: number // correct one
    m_sector2TimeInMS: number // correct one
    
    m_lastLapTime: number
    m_currentLapTime: number
    m_bestLapTime: number
    m_sector1Time: number
    m_sector2Time: number
    m_lapDistance: number
    m_totalDistance: number
    m_safetyCarDelta: number
    m_carPosition: number
    m_currentLapNum: number
    m_pitStatus: number
    m_sector: number
    m_currentLapInvalid: number
    m_penalties: number
    m_gridPosition: number
    m_driverStatus: number
    m_resultStatus: number

    // basic
    carIndex: number
    createdAt: string

    // extras
    add_m_currentLapTimeInMS: number
    add_m_sector1TimeInMS: number
    add_m_sector2TimeInMS: number
    add_m_sector3TimeInMS: number
    add_m_lapValidBitFlags: number
    add_stint: TyreStintsHistoryData
}

export interface MarshalZone {
    m_zoneStart: number
    m_zoneFlag: number
}

export interface WeatherForecastSample {
    m_sessionType: number
    m_timeOffset: number
    m_weather: number
    m_trackTemperature: number
    m_airTemperature: number
}

export interface LapHistoryData {
    m_lapTimeInMS: number
    m_sector1TimeInMS: number
    m_sector2TimeInMS: number
    m_sector3TimeInMS: number
    m_lapValidBitFlags: number
}

export interface TyreStintsHistoryData {
    m_endLap: number
    m_tyreActualCompound: number
    m_tyreVisualCompound: number
}

export interface Team {
    name: string
    color: string
}
export interface Driver {
    firstName: string
    lastName: string
    abbreviation: string
}
export interface Track {
    name: string
}
export declare type EventCode = string
export interface Coordinate {
    x: number
    y: number
}
export interface Tyre {
    color: string
    name: string
}
export declare type Packet = string
export declare type PacketSize = number
export interface SessionTypes {
    short: string
    long: string
}
