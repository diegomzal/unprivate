export const NotesReducerActionTypes = {
    SET_TEXT: 'SET_TEXT',
    SET_STATUS: 'SET_STATUS',
    SET_KEY: 'SET_KEY',
    SET_KEY_VISIBILITY: 'SET_KEY_VISIBILITY',
    SET_INITIAL_TEXT: 'SET_INITIAL_TEXT'
} as const;

export const StatusTypes = {
    SAVED: 'SAVED',
    SAVING: 'SAVING',
    ERROR: 'ERROR',
    FETCHING: 'FETCHING',
    IDLE: 'IDLE',
    PRISTINE: 'PRISTINE'
} as const;

export type StatusType = keyof typeof StatusTypes;