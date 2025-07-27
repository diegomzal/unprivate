export const NotesReducerActionTypes = {
    SET_TEXT: 'SET_TEXT',
    SET_STATUS: 'SET_STATUS',
    SET_KEY: 'SET_KEY',
    SET_INITIAL_TEXT: 'SET_INITIAL_TEXT',
    SET_MARKDOWN_TOGGLE: 'SET_MARKDOWN_TOGGLE'
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
    | { type: typeof NotesReducerActionTypes.SET_MARKDOWN_TOGGLE; payload: boolean };

export type State = {
    text: string;
    status: StatusType;
    key: string;
    updatedAt?: Date;
    showMarkdown: boolean;
};

export type StatusType = keyof typeof StatusTypes;

export type Theme = 'light' | 'dark';
export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};