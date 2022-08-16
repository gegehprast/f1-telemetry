import { Tyre } from '../Types'

export const TYRES: Record<number, Tyre> = {
    0: { color: '#ffb3c3', name: 'Hyper Hyper Soft' },
    1: { color: '#ffb3c3', name: 'Hyper Soft' },
    2: { color: '#b14ba7', name: 'Ultra Soft' },
    3: { color: '#f92d29', name: 'Super Soft' },
    4: { color: '#ebd25f', name: 'Soft' },
    5: { color: '#ffffff', name: 'Medium' },
    6: { color: '#03a2f3', name: 'Hard' },
    7: { color: '#ff803f', name: 'Super Hard' },
    8: { color: '#3ac82b', name: 'Intermediate' },
    9: { color: '#4491d2', name: 'Wet' },
    10: { color: '#3ac82b', name: 'Dry' },
    11: { color: '#4491d2', name: 'Wet' },
    12: { color: '#f92d29', name: 'Super Soft' },
    13: { color: '#f92d29', name: 'Soft' },
    14: { color: '#ebd25f', name: 'Medium' },
    15: { color: '#ffffff', name: 'Hard' },
    16: { color: '#4491d2', name: 'Wet' },
    17: { color: '#f92d29', name: 'C5' },
    18: { color: '#f92d29', name: 'C4' },
    19: { color: '#ebd25f', name: 'C3' },
    20: { color: '#ffffff', name: 'C2' },
    21: { color: '#ffffff', name: 'C1' },
}

export const FORMULA_ACTUAL_TYRES: Record<number, Record<number, Tyre>> = {
    0: {
        8: { color: '#3ac82b', name: 'Intermediate' },
        9: { color: '#4491d2', name: 'Wet' },
        17: { color: '#f92d29', name: 'C5' },
        18: { color: '#f92d29', name: 'C4' },
        19: { color: '#ebd25f', name: 'C3' },
        20: { color: '#ffffff', name: 'C2' },
        21: { color: '#ffffff', name: 'C1' },
    },
    1: {
        10: { color: '#3ac82b', name: 'Dry' },
        11: { color: '#4491d2', name: 'Wet' },
    },
    2: {
        12: { color: '#f92d29', name: 'Super Soft' },
        13: { color: '#f92d29', name: 'Soft' },
        14: { color: '#ebd25f', name: 'Medium' },
        15: { color: '#ffffff', name: 'Hard' },
        16: { color: '#4491d2', name: 'Wet' },
    },
    3: {
        12: { color: '#f92d29', name: 'Super Soft' },
        13: { color: '#f92d29', name: 'Soft' },
        14: { color: '#ebd25f', name: 'Medium' },
        15: { color: '#ffffff', name: 'Hard' },
        16: { color: '#4491d2', name: 'Wet' },
    },
}

export const FORMULA_VISUAL_TYRES: Record<number, Record<number, Tyre>> = {
    0: {
        7: { color: '#3ac82b', name: 'Intermediate' },
        8: { color: '#4491d2', name: 'Wet' },
        16: { color: '#f92d29', name: 'Soft' },
        17: { color: '#ebd25f', name: 'Medium' },
        18: { color: '#ffffff', name: 'Hard' },
    },
    1: {
        7: { color: '#3ac82b', name: 'Intermediate' },
        8: { color: '#4491d2', name: 'Wet' },
        16: { color: '#f92d29', name: 'Soft' },
        17: { color: '#ebd25f', name: 'Medium' },
        18: { color: '#ffffff', name: 'Hard' },
    },
    2: {
        15: { color: '#4491d2', name: 'Wet' },
        19: { color: '#f92d29', name: 'Super Soft' },
        20: { color: '#f92d29', name: 'Soft' },
        21: { color: '#ebd25f', name: 'Medium' },
        22: { color: '#ffffff', name: 'Hard' },
    },
}
