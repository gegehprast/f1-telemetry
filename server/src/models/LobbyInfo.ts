import { LobbyInfoData, PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ILobbyInfoDoc extends Document {
    m_header: PacketHeader
    m_numPlayers: number
    m_lobbyPlayers: LobbyInfoData[]
    createdAt: Date
}

export const LobbyInfoSchema: Schema = new Schema({
    m_header: {
        type: Object,
    },
    m_numPlayers: {
        type: Number,
    },
    m_lobbyPlayers: {
        type: Array<LobbyInfoData>,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

const LobbyInfo = mongoose.model<ILobbyInfoDoc>('lobbyinfo', LobbyInfoSchema)

export default LobbyInfo
