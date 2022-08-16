import { PacketCarTelemetryData } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import CarTelemetry from '../models/CarTelemetry'
import { Listener, MinifiedPacketHeader, onlyPlayerCarData } from './Helper'

export const carTelemetryHandler: Listener = async (
    data: PacketCarTelemetryData
) => {
    try {
        const m_carTelemetryData = onlyPlayerCarData(
            data.m_header.m_playerCarIndex,
            data.m_carTelemetryData
        )
        const doc = new CarTelemetry({
            ...MinifiedPacketHeader(data.m_header),
            ...m_carTelemetryData,
            ...{
                m_buttonStatus: data.m_buttonStatus,
                m_mfdPanelIndex: data.m_mfdPanelIndex,
                m_mfdPanelIndexSecondaryPlayer:
                    data.m_mfdPanelIndexSecondaryPlayer,
                m_suggestedGear: data.m_suggestedGear,
                createdAt: new Date(),
            },
        })

        await doc.save()
    } catch (error) {
        console.log(error)
    }
}
