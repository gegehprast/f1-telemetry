import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { TRACKS } from '../../constants/track';
import { FORMULA_ACTUAL_TYRES, FORMULA_VISUAL_TYRES, TYRES } from '../../constants/tyres';
import { ParsedSession, parseSession } from '../../helpers/sessionparser';
import { convertDuration } from '../../helpers/time'
import { ILapDataDoc, ISessionDoc } from '../../Types';

type SessionWithLaps = ISessionDoc & { laps: ILapDataDoc[] }

const getSessionWithLaps = async (sessionUID: string) => {
    return await fetch(`http://localhost:3001/api/laps/${sessionUID}`).then(res => res.json()) as SessionWithLaps
}

const getBestTimeIndex = (m_lapHistoryData: ILapDataDoc[], key: keyof ILapDataDoc) => {
    const filtered = [...m_lapHistoryData].filter(item => item[key] !== 0)
    const sorted = filtered.sort((a, b) => {
        if (a[key] < b[key]) {
            return -1;
        }

        if (a[key] > b[key]) {
            return 1;
        }

        return 0;
    })
    
    if (!sorted.length) {
        return null
    }

    return m_lapHistoryData.findIndex(lap => lap.m_currentLapNum === sorted[0].m_currentLapNum)
}

const Lap: NextPage = () => {
    const router = useRouter()
    const { sessionUID } = router.query
    const [session, setSession] = useState<ParsedSession>()
    const [laps, setLaps] = useState<ILapDataDoc[]>([])
    const [bestLapIndex, setBestLapIndex] = useState<number|null>(0)
    const [bestSector1Index, setBestSector1Index] = useState<number|null>(0)
    const [bestSector2Index, setBestSector2Index] = useState<number|null>(0)
    const [bestSector3Index, setBestSector3Index] = useState<number|null>(0)

    useEffect(() => {
        async function _getSessions() {
            if (!sessionUID) {
                return
            }

            const session = await getSessionWithLaps(sessionUID as string)

            setSession(parseSession(session))

            setLaps(session.laps)

            setBestLapIndex(
                getBestTimeIndex(session.laps, 'add_m_currentLapTimeInMS')
            )
            setBestSector1Index(
                getBestTimeIndex(session.laps, 'add_m_sector1TimeInMS')
            )
            setBestSector2Index(
                getBestTimeIndex(session.laps, 'add_m_sector2TimeInMS')
            )
            setBestSector3Index(
                getBestTimeIndex(session.laps, 'add_m_sector3TimeInMS')
            )
        }

        _getSessions()
    }, [sessionUID])

    return (
        <div>
            <Head>
                <title>F1 Telemetry</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {session && <main className='w-1/2 min-h-screen py-10 mx-auto font-mono bg-gray-100'>
                <h1 className='text-4xl text-center '>LAPS</h1>
                
                <table className='w-[30%] mt-10'>
                    <tbody>
                        <tr>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                Formula
                            </td>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                {session.formula}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                Type
                            </td>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                {session.type} ({session.totalLap} Laps)
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                Track
                            </td>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                {session.track}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                Team
                            </td>
                            <td className='p-2 border' style={{ borderColor: session.team.color, color: session.team.color }}>
                                {session.team.name}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                Driver
                            </td>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                {session.driver.firstName} {session.driver.lastName}
                            </td>
                        </tr>
                        <tr>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                Date
                            </td>
                            <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                {session.date.toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short', hourCycle: 'h23' })}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='w-full mt-10'>
                    <thead>
                        <tr>
                            <th className='p-2 border'>Lap</th>
                            <th className='p-2 border'>Pos</th>
                            <th className='p-2 border'>Tyre</th>
                            <th className='p-2 border'>Lap Time</th>
                            <th className='p-2 border' colSpan={3}>Sector Times</th>
                        </tr>
                    </thead>

                    <tbody>
                        {laps.map((lap, idx) => (
                            <tr key={idx} className='hover:bg-blue-100'>
                                <td className='p-2 text-center border'>{lap.m_currentLapNum}</td>
                                <td className='p-2 text-center border'>{'>'} {lap.m_carPosition}</td>
                                <td className='p-2 text-center border'>
                                    <span className='p-1 font-bold rounded-full' 
                                        style={{ 
                                            backgroundColor: FORMULA_ACTUAL_TYRES[session.m_formula][lap.add_stint.m_tyreActualCompound].color 
                                        }}
                                    >
                                        {FORMULA_ACTUAL_TYRES[session.m_formula][lap.add_stint.m_tyreActualCompound].name} 
                                    </span>
                                </td>
                                <td className={`p-2 text-center border ${bestLapIndex === idx && 'bg-violet-100'}`}>
                                    <span className={`${lap.m_currentLapInvalid === 1 ? 'line-through' : ''}`}>
                                        {convertDuration(lap.add_m_currentLapTimeInMS)}
                                    </span>
                                </td>
                                <td className={`p-2 text-center border ${bestSector1Index === idx && 'bg-violet-100'}`}>
                                    <span className={`${lap.m_currentLapInvalid === 1 ? 'line-through' : ''}`}>
                                        {convertDuration(lap.add_m_sector1TimeInMS)}
                                    </span>
                                </td>
                                <td className={`p-2 text-center border ${bestSector2Index === idx && 'bg-violet-100'}`}>
                                    <span className={`${lap.m_currentLapInvalid === 1 ? 'line-through' : ''}`}>
                                        {convertDuration(lap.add_m_sector2TimeInMS)}
                                    </span>
                                </td>
                                <td className={`p-2 text-center border ${bestSector3Index === idx && 'bg-violet-100'}`}>
                                    <span className={`${lap.m_currentLapInvalid === 1 ? 'line-through' : ''}`}>
                                        {convertDuration(lap.add_m_sector3TimeInMS)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>}
        </div>
    )
}

export default Lap
