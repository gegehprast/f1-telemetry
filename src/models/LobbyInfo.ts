import { LobbyInfoData, PacketHeader } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ILobbyInfoDoc extends Document {
    m_header: PacketHeader;
    m_numPlayers: number;
    m_lobbyPlayers: LobbyInfoData[];
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
})

const LobbyInfo = mongoose.model<ILobbyInfoDoc>('lobbyinfo', LobbyInfoSchema)

export default LobbyInfo
