export const NotesReducerActionTypes = {
    SET_TEXT: 'SET_TEXT',
    SET_STATUS: 'SET_STATUS',
    SET_KEY: 'SET_KEY',
    SET_KEY_VISIBILITY: 'SET_KEY_VISIBILITY'
} as const;

export const StatusTypes = {
    SAVED: 'SAVED',
    SAVING: 'SAVING',
    ERROR: 'ERROR',
    FETCHING: 'FETCHING',
    IDLE: 'IDLE'
} as const;

export type StatusType = keyof typeof StatusTypes;