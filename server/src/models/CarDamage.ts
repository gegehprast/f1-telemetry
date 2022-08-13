import { BrakeDamage, TyreDamage, TyreWear } from '@racehub-io/f1-telemetry-client/build/src/parsers/packets/types'
import mongoose, { Schema, Document } from 'mongoose'

export interface ICarDamageDoc extends Document {
    // PacketHeader
    m_packetFormat: number;
    m_packetVersion: number;
    m_packetId: number;
    m_sessionUID: string;
    m_sessionTime: number;
    m_frameIdentifier: number;
    m_playerCarIndex: number;
    m_surfaceType: number[];

    // CarDamageData
    m_tyresWear: TyreWear[];
    m_tyresDamage: TyreDamage;
    m_brakesDamage: BrakeDamage[];
    m_frontLeftWingDamage: number;
    m_frontRightWingDamage: number;
    m_rearWingDamage: number;
    m_floorDamage: number;
    m_diffuserDamage: number;
    m_sidepodDamage: number;
    m_drsFault: number;
    m_gearBoxDamage: number;
    m_engineDamage: number;
    m_engineMGUHWear: number;
    m_engineESWear: number;
    m_engineCEWear: number;
    m_engineICEWear: number;
    m_engineMGUKWear: number;
    m_engineTCWear: number;

    // basic
    createdAt: Date
}

export const CarDamageSchema: Schema = new Schema({
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

    // CarDamageData
    m_tyresWear: {
        type: Array<TyreWear>
    },
    m_tyresDamage: {
        type: Array<TyreDamage>
    },
    m_brakesDamage: {
        type: Array<BrakeDamage>
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
    m_floorDamage: {
        type: Number
    },
    m_diffuserDamage: {
        type: Number
    },
    m_sidepodDamage: {
        type: Number
    },
    m_drsFault: {
        type: Number
    },
    m_gearBoxDamage: {
        type: Number
    },
    m_engineDamage: {
        type: Number
    },
    m_engineMGUHWear: {
        type: Number
    },
    m_engineESWear: {
        type: Number
    },
    m_engineCEWear: {
        type: Number
    },
    m_engineICEWear: {
        type: Number
    },
    m_engineMGUKWear: {
        type: Number
    },
    m_engineTCWear: {
        type: Number
    },

    // basic
    createdAt: {
        type: Date,
        default: new Date()
    },
})

CarDamageSchema.index({ createdAt: -1 }, { unique: false })

const CarDamage = mongoose.model<ICarDamageDoc>('cardamage', CarDamageSchema)

export default CarDamage
