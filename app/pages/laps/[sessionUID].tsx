import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { TYRES } from '../../constants/tyres';
import { convertDuration } from '../../helpers/time'
import { ILapDataDoc } from '../../Types';

const getLaps = async (sessionUID: string) => {
    return await fetch(`http://localhost:3001/api/laps/${sessionUID}`).then(res => res.json()) as ILapDataDoc[]
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

            const laps = await getLaps(sessionUID as string)

            setLaps(laps)

            setBestLapIndex(
                getBestTimeIndex(laps, 'add_m_currentLapTimeInMS')
            )
            setBestSector1Index(
                getBestTimeIndex(laps, 'add_m_sector1TimeInMS')
            )
            setBestSector2Index(
                getBestTimeIndex(laps, 'add_m_sector2TimeInMS')
            )
            setBestSector3Index(
                getBestTimeIndex(laps, 'add_m_sector3TimeInMS')
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

            <main className='w-1/2 h-screen mx-auto font-mono'>
                <h1 className='text-4xl text-center '>LAPS</h1>

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
                                    <span className='p-1 font-bold rounded-full' style={{ backgroundColor: TYRES[lap.add_stint.m_tyreActualCompound].color }}>
                                        {TYRES[lap.add_stint.m_tyreActualCompound].name}
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
            </main>
        </div>
    )
}

export default Lap
