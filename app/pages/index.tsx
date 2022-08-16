import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ParsedSession, parseSession } from '../helpers/sessionparser'
import { ISessionDoc } from '../Types'

const getSessions = async () => {
    return await fetch('http://localhost:3001/api/sessions').then(res => res.json()) as ISessionDoc[]
}

const Home: NextPage = () => {
    const [sessions, setSessions] = useState<ParsedSession[]>([])
    useEffect(() => {
        async function _getSessions() {
            const sessions = await getSessions()
            const parsedSessions = sessions.map(session => parseSession(session))

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

            <main className='w-3/5 h-screen mx-auto font-mono'>
                <h1 className='text-4xl text-center '>SESSIONS</h1>

                <table className='w-full mt-10'>
                    <thead>
                        <tr>
                            <th className='p-2 border border-b-0'>Formula</th>
                            <th className='p-2 border border-b-0'>Track</th>
                            <th className='p-2 border border-b-0'>Driver</th>
                            <th className='p-2 border border-b-0'>Car</th>
                            <th className='p-2 border border-b-0'>Type</th>
                            <th className='p-2 border border-b-0'>Laps</th>
                            <th className='p-2 border border-b-0'>Best Lap</th>
                            <th className='p-2 border border-b-0' colSpan={3}>Best Sectors</th>
                            <th className='p-2 border border-b-0'>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sessions.map(session => (
                            <Link key={session.sessionUID} href={`/laps/${session.sessionUID}`}>
                                <tr className='cursor-pointer hover:bg-blue-100 odd:bg-gray-100' >
                                    <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                        {session.formula}
                                    </td>
                                    <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                        {session.track}
                                    </td>
                                    <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                        {session.driver.firstName} {session.driver.lastName}
                                    </td>
                                    <td className='p-2 border' style={{ borderColor: session.team.color, color: session.team.color }}>
                                        {session.team.name}
                                    </td>
                                    <td className='p-2 border' style={{ borderColor: session.team.color }}>
                                        {session.type}
                                    </td>
                                    <td className='p-2 text-center border' style={{ borderColor: session.team.color }}>
                                        {session.totalLap}
                                    </td>
                                    <td className={`p-2 text-center border ${!session.bestLapTimeValid && 'line-through'}`} style={{ borderColor: session.team.color }} width='10%'>
                                        {session.bestLapTime}
                                    </td>
                                    <td className={`p-2 text-center border ${!session.bestSector1TimeValid && 'line-through'}`} style={{ borderColor: session.team.color }} width='8%'>
                                        {session.bestSector1Time}
                                    </td>
                                    <td className={`p-2 text-center border ${!session.bestSector2TimeValid && 'line-through'}`} style={{ borderColor: session.team.color }} width='8%'>
                                        {session.bestSector2Time}
                                    </td>
                                    <td className={`p-2 text-center border ${!session.bestSector3TimeValid && 'line-through'}`} style={{ borderColor: session.team.color }} width='8%'>
                                        {session.bestSector3Time}
                                    </td>
                                    <td className='p-2 text-center border' style={{ borderColor: session.team.color }} width={'15%'}>
                                        {session.date.toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short', hourCycle: 'h23' })}
                                    </td>
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
