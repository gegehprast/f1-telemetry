import { PacketLobbyInfoData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import LobbyInfo from '../models/LobbyInfo'
import { Listener, m_headerParser } from './Helper'

export const lobbyInfoHandler: Listener = async (data: PacketLobbyInfoData) => {
    try {
        const doc = new LobbyInfo({
            ...data,
            ...{
                m_header: m_headerParser(data.m_header),
                createdAt: new Date(),
            },
        })
        await doc.save()
    } catch (error) {
        console.log(error)
    }
}
