import { DRIVERS } from "../constants/drivers";
import { FORMULAS } from "../constants/formulas";
import { SESSION_TYPES } from "../constants/sessionTypes";
import { TEAMS } from "../constants/teams";
import { TRACKS } from "../constants/track";
import { ISessionDoc, LapHistoryData } from "../Types";
import { convertDuration } from "./time";

const getBestTimeFromLapHistory = (
    m_lapHistoryData: LapHistoryData[],
    key: keyof LapHistoryData
) => {
    const sorted = [...m_lapHistoryData].sort((a, b) => {
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

const getBestTimesData = (m_lapHistoryData: LapHistoryData[]) => {
    if (m_lapHistoryData.length) {
        const bestLapTimeData = getBestTimeFromLapHistory(
            m_lapHistoryData,
            'm_lapTimeInMS'
        )
        const bestSector1TimeData = getBestTimeFromLapHistory(
            m_lapHistoryData,
            'm_sector1TimeInMS'
        )
        const bestSector2TimeData = getBestTimeFromLapHistory(
            m_lapHistoryData,
            'm_sector2TimeInMS'
        )
        const bestSector3TimeData = getBestTimeFromLapHistory(
            m_lapHistoryData,
            'm_sector3TimeInMS'
        )
        
        return {
            bestLapTime: bestLapTimeData.m_lapTimeInMS,
            bestSector1Time: bestSector1TimeData.m_sector1TimeInMS,
            bestSector2Time: bestSector2TimeData.m_sector2TimeInMS,
            bestSector3Time: bestSector3TimeData.m_sector3TimeInMS,
            bestLapTimeValid: checkFlag(bestLapTimeData.m_lapValidBitFlags || 0).includes('lap'),
            bestSector1TimeValid: checkFlag(bestSector1TimeData.m_lapValidBitFlags || 0).includes('sector1'),
            bestSector2TimeValid: checkFlag(bestSector2TimeData.m_lapValidBitFlags || 0).includes('sector2'),
            bestSector3TimeValid: checkFlag(bestSector3TimeData.m_lapValidBitFlags || 0).includes('sector3'),
        }
    }

    return {
        bestLapTime: 0,
        bestSector1Time: 0,
        bestSector2Time: 0,
        bestSector3Time: 0,
        bestLapTimeValid: true,
        bestSector1TimeValid: true,
        bestSector2TimeValid: true,
        bestSector3TimeValid: true,
    }
}

export const parseSession = (session: ISessionDoc) => {
    const bestTimesData = getBestTimesData(session.sessionHistory.m_lapHistoryData)
    const player = session.participants.find(
        (participant) => participant.carIndex === session.m_playerCarIndex
    )

    let team = { name: 'N/A', color: '#000000' }
    let driver = {
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

    return {
        sessionUID: session.m_sessionUID,
        m_formula: session.m_formula,
        formula: FORMULAS[session.m_formula],
        track: TRACKS[session.m_trackId].name,
        team: team,
        driver: driver,
        type: SESSION_TYPES[session.m_sessionType].long,
        totalLap: session.m_totalLaps,
        bestLapTime: convertDuration(bestTimesData.bestLapTime),
        bestSector1Time: convertDuration(bestTimesData.bestSector1Time),
        bestSector2Time: convertDuration(bestTimesData.bestSector2Time),
        bestSector3Time: convertDuration(bestTimesData.bestSector3Time),
        bestLapTimeValid: bestTimesData.bestLapTimeValid,
        bestSector1TimeValid: bestTimesData.bestSector1TimeValid,
        bestSector2TimeValid: bestTimesData.bestSector2TimeValid,
        bestSector3TimeValid: bestTimesData.bestSector3TimeValid,
        date: new Date(
            new Date(session.createdAt).getTime() - session.m_sessionTime
        ),
    }
}

export type ParsedSession = ReturnType<typeof parseSession>
