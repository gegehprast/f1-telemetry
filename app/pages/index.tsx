import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SESSION_TYPES } from '../constants/sessionTypes'
import { TEAMS } from '../constants/teams'
import { TRACKS } from '../constants/track'
import { convertDuration } from '../helpers/time'
import { Session } from '../Types'

interface ParsedSession {
    sessionUID: string;
    type: string;
    track: string;
    team: string;
    totalLap: number
    bestLapTime: string;
    bestSector1Time: string;
    bestSector2Time: string;
    bestSector3Time: string;
    date: Date;
}

const getSessions = async () => {
    return await fetch('http://localhost:3000/api/sessions').then(res => res.json()) as Session[]
}

const Home: NextPage = () => {
    const [sessions, setSessions] = useState<ParsedSession[]>([])
    useEffect(() => {
        async function _getSessions() {
            const sessions = await getSessions()
            const parsedSessions = sessions.map(session => {
                const bestLapTimeData = session.sessionHistory.m_lapHistoryData[session.sessionHistory.m_bestLapTimeLapNum - 1]
                const bestSector1TimeData = session.sessionHistory.m_lapHistoryData[session.sessionHistory.m_bestSector1LapNum - 1]
                const bestSector2TimeData = session.sessionHistory.m_lapHistoryData[session.sessionHistory.m_bestSector2LapNum - 1]
                const bestSector3TimeData = session.sessionHistory.m_lapHistoryData[session.sessionHistory.m_bestSector3LapNum - 1]

                return {
                    sessionUID: session.m_header.m_sessionUID,
                    track: TRACKS[session.m_trackId].name,
                    team: TEAMS[session.participants.m_participants[session.m_header.m_playerCarIndex].m_teamId].name,
                    type: SESSION_TYPES[session.m_sessionType].long,
                    totalLap: session.m_totalLaps,
                    bestLapTime: convertDuration(bestLapTimeData ? bestLapTimeData.m_lapTimeInMS : 0),
                    bestSector1Time: convertDuration(bestSector1TimeData ? bestSector1TimeData.m_sector1TimeInMS : 0),
                    bestSector2Time: convertDuration(bestSector2TimeData ? bestSector2TimeData.m_sector2TimeInMS : 0),
                    bestSector3Time: convertDuration(bestSector3TimeData ? bestSector3TimeData.m_sector3TimeInMS : 0),
                    date: new Date((new Date(session.createdAt)).getTime() - session.m_header.m_sessionTime)
                }
            })

            setSessions(parsedSessions)
        }

        _getSessions()
    }, [])

    return (
        <div>
            <Head>
                <title>F1 Telemetry</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className='w-1/2 h-screen font-mono border'>
                <h1 className='text-4xl text-center '>SESSIONS</h1>

                <table className='w-full mt-10'>
                    <thead>
                        <tr>
                            <th className='border'>Track</th>
                            <th className='border'>Car</th>
                            <th className='border'>Type</th>
                            <th className='border'>Laps</th>
                            <th className='border'>Best Lap</th>
                            <th className='border' colSpan={3}>Best Sectors</th>
                            <th className='border'>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sessions.map(session => (
                            <Link key={session.sessionUID} href={`/laps/${session.sessionUID}`}>
                                <tr className='cursor-pointer hover:bg-gray-100'>
                                    <td className='border'>{session.track}</td>
                                    <td className='border'>{session.team}</td>
                                    <td className='border'>{session.type}</td>
                                    <td className='text-center border'>{session.totalLap}</td>
                                    <td className='text-center border'>{session.bestLapTime}</td>
                                    <td className='text-center border'>{session.bestSector1Time}</td>
                                    <td className='text-center border'>{session.bestSector2Time}</td>
                                    <td className='text-center border'>{session.bestSector3Time}</td>
                                    <td className='text-center border' width={'22%'}>{session.date.toLocaleString('en-CA')}</td>
                                </tr>
                            </Link>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export default Home
