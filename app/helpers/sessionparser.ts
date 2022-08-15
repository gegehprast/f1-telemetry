import { DRIVERS } from "../constants/drivers";
import { SESSION_TYPES } from "../constants/sessionTypes";
import { TEAMS } from "../constants/teams";
import { TRACKS } from "../constants/track";
import { Driver, ISessionDoc, LapHistoryData, Team } from "../Types";
import { convertDuration } from "./time";

export interface ParsedSession {
    sessionUID: string
    type: string
    track: string
    driver?: Driver
    team?: Team
    totalLap: number
    bestLapTime?: string
    bestSector1Time?: string
    bestSector2Time?: string
    bestSector3Time?: string
    bestLapTimeValid?: boolean
    bestSector1TimeValid?: boolean
    bestSector2TimeValid?: boolean
    bestSector3TimeValid?: boolean
    date: Date
}

const getBestTime = (
    m_lapHistoryData: LapHistoryData[],
    key: keyof LapHistoryData
) => {
    const sorted = m_lapHistoryData.sort((a, b) => {
        if (a[key] < b[key]) {
            return -1
        }

        if (a[key] > b[key]) {
            return 1
        }

        return 0
    })

    return sorted[0]
}

const FLAGS = {
    lap: 1,
    sector1: 2,
    sector2: 4,
    sector3: 8,
}

const checkFlag = (num: number) => {
    var selected = []

    if ((num & FLAGS.lap) === FLAGS.lap) selected.push('lap')
    if ((num & FLAGS.sector1) === FLAGS.sector1) selected.push('sector1')
    if ((num & FLAGS.sector2) === FLAGS.sector2) selected.push('sector2')
    if ((num & FLAGS.sector3) === FLAGS.sector3) selected.push('sector3')

    return selected
}

export const parseSession: (sessions: ISessionDoc) => ParsedSession = (session) => {
    let bestLapTimeData: LapHistoryData | undefined,
        bestSector1TimeData: LapHistoryData | undefined,
        bestSector2TimeData: LapHistoryData | undefined,
        bestSector3TimeData: LapHistoryData | undefined,
        bestLapTimeValid: boolean | undefined,
        bestSector1TimeValid: boolean | undefined,
        bestSector2TimeValid: boolean | undefined,
        bestSector3TimeValid: boolean | undefined

    let team: Team | undefined, driver: Driver | undefined

    if (session.sessionHistory) {
        bestLapTimeData = getBestTime(
            session.sessionHistory.m_lapHistoryData,
            'm_lapTimeInMS'
        )
        bestSector1TimeData = getBestTime(
            session.sessionHistory.m_lapHistoryData,
            'm_sector1TimeInMS'
        )
        bestSector2TimeData = getBestTime(
            session.sessionHistory.m_lapHistoryData,
            'm_sector2TimeInMS'
        )
        bestSector3TimeData = getBestTime(
            session.sessionHistory.m_lapHistoryData,
            'm_sector3TimeInMS'
        )
        bestLapTimeValid = checkFlag(
            bestLapTimeData.m_lapValidBitFlags || 0
        ).includes('lap')
        bestSector1TimeValid = checkFlag(
            bestSector1TimeData.m_lapValidBitFlags || 0
        ).includes('sector1')
        bestSector2TimeValid = checkFlag(
            bestSector2TimeData.m_lapValidBitFlags || 0
        ).includes('sector2')
        bestSector3TimeValid = checkFlag(
            bestSector3TimeData.m_lapValidBitFlags || 0
        ).includes('sector3')
    }

    if (session.participants) {
        const player = session.participants.find(
            (participant) => participant.carIndex === session.m_playerCarIndex
        )

        team = { name: 'N/A', color: '#000000' }
        driver = {
            abbreviation: 'SAI',
            firstName: 'Carlos',
            lastName: 'Sainz',
        }

        if (player) {
            driver = DRIVERS[player.m_driverId] || {
                abbreviation: player.m_name,
                firstName: player.m_name,
                lastName: player.m_name,
            }
            team = TEAMS[player.m_teamId] || team
        }
    }

    return {
        sessionUID: session.m_sessionUID,
        track: TRACKS[session.m_trackId].name,
        team: team,
        driver: driver,
        type: SESSION_TYPES[session.m_sessionType].long,
        totalLap: session.m_totalLaps,
        bestLapTime: bestLapTimeData && convertDuration(bestLapTimeData.m_lapTimeInMS),
        bestSector1Time: bestLapTimeData && convertDuration(bestLapTimeData.m_sector1TimeInMS),
        bestSector2Time: bestLapTimeData && convertDuration(bestLapTimeData.m_sector2TimeInMS),
        bestSector3Time: bestLapTimeData && convertDuration(bestLapTimeData.m_sector3TimeInMS),
        bestLapTimeValid: bestLapTimeValid,
        bestSector1TimeValid: bestSector1TimeValid,
        bestSector2TimeValid: bestSector2TimeValid,
        bestSector3TimeValid: bestSector3TimeValid,
        date: new Date(
            new Date(session.createdAt).getTime() - session.m_sessionTime
        ),
    }
}
