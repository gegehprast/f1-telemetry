import { PacketFinalClassificationData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import FinalClassification from '../models/FinalClassification'
import { Listener, MinifiedPacketHeader } from './Helper'

export const finalClassificationHandler: Listener = async (
    data: PacketFinalClassificationData
) => {
    try {
        for (let i = 0; i < data.m_classificationData.length; i++) {
            const finalClassificationData = data.m_classificationData[i]

            const doc = new FinalClassification({
                ...MinifiedPacketHeader(data.m_header),
                ...finalClassificationData,
                ...{
                    m_numCars: data.m_numCars,
                    carIndex: i,
                    createdAt: new Date(),
                },
            })

            await doc.save()
        }
    } catch (error) {
        console.log(error)
    }
}
