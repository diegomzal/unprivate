export const NotesReducerActionTypes = {
    SET_TEXT: 'SET_TEXT',
    SET_STATUS: 'SET_STATUS',
    SET_KEY: 'SET_KEY',
    SET_CURRENT_KEY: 'SET_CURRENT_KEY',
    SET_INITIAL_TEXT: 'SET_INITIAL_TEXT',
    SET_IS_LIVE: 'SET_IS_LIVE',
    SET_IS_RAW: 'SET_IS_RAW'
} as const;

export const StatusTypes = {
    SAVED: 'SAVED',
    SAVING: 'SAVING',
    ERROR: 'ERROR',
    FETCHING: 'FETCHING',
    IDLE: 'IDLE'
} as const;

export type StatusTypeObject = {
    status: StatusType;
    updatedAt?: Date;
}

export type NoteObject = {
    key: string,
    value: string,
    updatedAt?: Date
}

export type Action =
    | { type: typeof NotesReducerActionTypes.SET_TEXT; payload: string }
    | { type: typeof NotesReducerActionTypes.SET_INITIAL_TEXT; payload: NoteObject }
    | { type: typeof NotesReducerActionTypes.SET_STATUS; payload: StatusTypeObject }
    | { type: typeof NotesReducerActionTypes.SET_KEY; payload: string }
    | { type: typeof NotesReducerActionTypes.SET_IS_RAW; payload: boolean }
    | { type: typeof NotesReducerActionTypes.SET_CURRENT_KEY; payload: string }
    | { type: typeof NotesReducerActionTypes.SET_IS_LIVE; payload: boolean };

export type State = {
    text: string;
    status: StatusType;
    key: string;
    currentKey: string;
    updatedAt?: Date;
    isLive: boolean;
    isRaw: boolean
};

export type StatusType = keyof typeof StatusTypes;

export type Theme = 'light' | 'dark';
export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};