export const KNOB   = 'KNOB'
export const BUTTON = 'BUTTON'

export default {
    'AKAI professional LLC': {
        'LPD8 MIDI 1': {
            columns: 8,
            rows: 2,
            inputs: {
                1: {
                    type: KNOB,
                    name: 'K1',
                    column: 4,
                    row: 0
                },
                2: {
                    type: KNOB ,
                    name: 'K2',
                    column: 5,
                    row: 0
                },
                3: {
                    type: KNOB,
                    name: 'K3',
                    column: 6,
                    row: 0
                },
                4: {
                    type: KNOB,
                    name: 'K4',
                    column: 7,
                    row: 0
                },
                5: {
                    type: KNOB,
                    name: 'K5',
                    column: 4,
                    row: 1
                },
                6: {
                    type: KNOB,
                    name: 'K6',
                    column: 5,
                    row: 1
                },
                7: {
                    type: KNOB,
                    name: 'K7',
                    column: 6,
                    row: 1
                },
                8: {
                    type: KNOB,
                    name: 'K8',
                    column: 7,
                    row: 1
                },
                36: {
                    type: BUTTON,
                    name: 'PAD1',
                    column: 0,
                    row: 1
                },
                37: {
                    type: BUTTON,
                    name: 'PAD2',
                    column: 1,
                    row: 1
                },
                38: {
                    type: BUTTON,
                    name: 'PAD3',
                    column: 2,
                    row: 1
                },
                39: {
                    type: BUTTON,
                    name: 'PAD4',
                    column: 3,
                    row: 1
                },
                40: {
                    type: BUTTON,
                    name: 'PAD5',
                    column: 0,
                    row: 0
                },
                41: {
                    type: BUTTON,
                    name: 'PAD6',
                    column: 1,
                    row: 0
                },
                42: {
                    type: BUTTON,
                    name: 'PAD7',
                    column: 2,
                    row: 0
                },
                43: {
                    type: BUTTON,
                    name: 'PAD8',
                    column: 3,
                    row: 0
                }
            }
        }
    }
}
