import { PacketParticipantsData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import Participant from '../models/Participant'
import { Listener, m_headerParser } from './Helper'

export const participantsHandler: Listener = async (
    data: PacketParticipantsData
) => {
    try {
        for (let i = 0; i < data.m_participants.length; i++) {
            const header = m_headerParser(data.m_header)
            const participantData = data.m_participants[i]
            await Participant.updateOne(
                {
                    m_sessionUID: header.m_sessionUID,
                    carIndex: i,
                },
                {
                    ...header,
                    ...participantData,
                    ...{
                        carIndex: i,
                        createdAt: new Date(),
                    },
                },
                {
                    upsert: true,
                    setDefaultsOnInsert: true,
                }
            ).exec()
        }
    } catch (error) {
        console.log(error)
    }
}
