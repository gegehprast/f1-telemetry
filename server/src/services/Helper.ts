import { PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'

export type Listener = (...args: any[]) => Promise<void>

export interface ModifiedPacketHeader {
    m_packetFormat: number
    m_packetVersion: number
    m_packetId: number
    m_sessionUID: string
    m_sessionTime: number
    m_frameIdentifier: number
    m_playerCarIndex: number
    m_surfaceType: number[]
}

export const m_headerParser = (
    m_header: PacketHeader
): ModifiedPacketHeader => {
    return {
        ...m_header,
        ...{ m_sessionUID: m_header.m_sessionUID.toString() },
    }
}

export const onlyPlayerCarIndex: <T>(
    m_playerCarIndex: number,
    data: T[]
) => (T | null)[] = (m_playerCarIndex, data) => {
    return data.map((item, idx) => {
        if (idx === m_playerCarIndex) {
            return item
        }

        return null
    })
}

export const onlyPlayerCarData: <T>(
    m_playerCarIndex: number,
    data: T[]
) => T | undefined = (m_playerCarIndex, data) => {
    return data.find((item, idx) => idx === m_playerCarIndex)
}
