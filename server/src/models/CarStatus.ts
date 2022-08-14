import { TyreDamage, TyreWear } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ICarStatusDoc extends Document {
    // PacketHeader
    m_packetFormat: number;
    m_packetVersion: number;
    m_packetId: number;
    m_sessionUID: string;
    m_sessionTime: number;
    m_frameIdentifier: number;
    m_playerCarIndex: number;
    m_surfaceType: number[];

    // CarStatusData
    m_tractionControl: number;
    m_antiLockBrakes: number;
    m_fuelMix: number;
    m_frontBrakeBias: number;
    m_pitLimiterStatus: number;
    m_fuelInTank: number;
    m_fuelCapacity: number;
    m_maxRPM: number;
    m_idleRPM: number;
    m_maxGears: number;
    m_drsAllowed: number;
    m_drsActivationDistance: number;
    m_tyresWear: TyreWear[];
    m_actualTyreCompound: number;
    m_visualTyreCompound: number;
    m_tyresAgeLaps: number;
    m_tyreCompound: number;
    m_tyresDamage: TyreDamage[];
    m_frontLeftWingDamage: number;
    m_frontRightWingDamage: number;
    m_rearWingDamage: number;
    m_drsFault: number;
    m_engineDamage: number;
    m_gearBoxDamage: number;
    m_exhaustDamage: number;
    m_vehicleFiaFlags: number;
    m_ersStoreEnergy: number;
    m_ersDeployMode: number;
    m_ersHarvestedThisLapMGUK: number;
    m_ersHarvestedThisLapMGUH: number;
    m_ersDeployedThisLap: number;

    // basic
    createdAt: Date
}

export const CarStatusSchema: Schema = new Schema({
    // PacketHeader
    m_packetFormat: {
        type: Number
    },
    m_packetVersion: {
        type: Number
    },
    m_packetId: {
        type: Number
    },
    m_sessionUID: {
        type: String
    },
    m_sessionTime: {
        type: Number
    },
    m_frameIdentifier: {
        type: Number
    },
    m_playerCarIndex: {
        type: Number
    },
    m_surfaceType: {
        type: Array<Number>
    },

    // CarStatusData
    m_tractionControl: {
        type: Number
    },
    m_antiLockBrakes: {
        type: Number
    },
    m_fuelMix: {
        type: Number
    },
    m_frontBrakeBias: {
        type: Number
    },
    m_pitLimiterStatus: {
        type: Number
    },
    m_fuelInTank: {
        type: Number
    },
    m_fuelCapacity: {
        type: Number
    },
    m_maxRPM: {
        type: Number
    },
    m_idleRPM: {
        type: Number
    },
    m_maxGears: {
        type: Number
    },
    m_drsAllowed: {
        type: Number
    },
    m_drsActivationDistance: {
        type: Number
    },
    m_tyresWear: {
        type: Array<TyreWear>
    },
    m_actualTyreCompound: {
        type: Number
    },
    m_visualTyreCompound: {
        type: Number
    },
    m_tyresAgeLaps: {
        type: Number
    },
    m_tyreCompound: {
        type: Number
    },
    m_tyresDamage: {
        type: Array<TyreDamage>
    },
    m_frontLeftWingDamage: {
        type: Number
    },
    m_frontRightWingDamage: {
        type: Number
    },
    m_rearWingDamage: {
        type: Number
    },
    m_drsFault: {
        type: Number
    },
    m_engineDamage: {
        type: Number
    },
    m_gearBoxDamage: {
        type: Number
    },
    m_exhaustDamage: {
        type: Number
    },
    m_vehicleFiaFlags: {
        type: Number
    },
    m_ersStoreEnergy: {
        type: Number
    },
    m_ersDeployMode: {
        type: Number
    },
    m_ersHarvestedThisLapMGUK: {
        type: Number
    },
    m_ersHarvestedThisLapMGUH: {
        type: Number
    },
    m_ersDeployedThisLap: {
        type: Number
    },

    // basic
    createdAt: {
        type: Date,
        default: new Date()
    },
})

CarStatusSchema.index({ createdAt: -1 }, { unique: false })

CarStatusSchema.on('index', function(err) {
    if (err) {
        console.error('CarStatusSchema index error: %s', err);
    } else {
        console.info('CarStatusSchema indexing complete');
    }
});

const CarStatus = mongoose.model<ICarStatusDoc>('carstatus', CarStatusSchema)

export default CarStatus
