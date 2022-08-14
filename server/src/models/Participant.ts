import mongoose, { Schema, Document } from 'mongoose'

export interface IParticipantDoc extends Document {
    // PacketHeader
    m_packetFormat: number;
    m_packetVersion: number;
    m_packetId: number;
    m_sessionUID: string;
    m_sessionTime: number;
    m_frameIdentifier: number;
    m_playerCarIndex: number;
    m_surfaceType: number[];
    
    // ParticipantData
    m_aiControlled: number;
    m_driverId: number;
    m_name: string;
    m_nationality: number;
    m_raceNumber: number;
    m_teamId: number;

    // PacketParticipantsData
    m_numCars: number

    // basic
    carIndex: number;
    createdAt: Date
}

export const ParticipantSchema: Schema = new Schema({
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
    
    // ParticipantData
    m_aiControlled: {
        type: Number
    },
    m_driverId: {
        type: Number
    },
    m_name: {
        type: String
    },
    m_nationality: {
        type: Number
    },
    m_raceNumber: {
        type: Number
    },
    m_teamId: {
        type: Number
    },

    // PacketParticipantsData
    m_numCars: {
        type: Number,
    },
    
    // basic
    carIndex: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

ParticipantSchema.index({ createdAt: -1 }, { unique: false })

ParticipantSchema.on('index', function(err) {
    if (err) {
        console.error('ParticipantSchema index error: %s', err);
    } else {
        console.info('ParticipantSchema indexing complete');
    }
});

const Participant = mongoose.model<IParticipantDoc>('participant', ParticipantSchema)

export default Participant
