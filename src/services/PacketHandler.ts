type Listener = (...args: any[]) => void

export const eventHandler: Listener = (event) => {
    console.log({ name: 'event', event })
}

export const motionHandler: Listener = (event) => {
    console.log({ name: 'motion', event })
}

export const carSetupsHandler: Listener = (event) => {
    console.log({ name: 'carSetups', event })
}

export const lapDataHandler: Listener = (event) => {
    console.log({ name: 'lapData', event })
}

export const sessionHandler: Listener = (event) => {
    console.log({ name: 'session', event })
}

export const participantsHandler: Listener = (event) => {
    console.log({ name: 'participants', event })
}

export const carTelemetryHandler: Listener = (event) => {
    console.log({ name: 'carTelemetry', event })
}

export const carStatusHandler: Listener = (event) => {
    console.log({ name: 'carStatus', event })
}

export const finalClassificationHandler: Listener = (event) => {
    console.log({ name: 'finalClassification', event })
}

export const lobbyInfoHandler: Listener = (event) => {
    console.log({ name: 'lobbyInfo', event })
}

export const carDamageHandler: Listener = (event) => {
    console.log({ name: 'carDamage', event })
}

export const sessionHistoryHandler: Listener = (event) => {
    console.log({ name: 'sessionHistory', event })
}
