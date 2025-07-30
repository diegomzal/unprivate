import { StatusTypes } from './types';

export const DefaultNotesState = {
    text: '',
    status: StatusTypes.IDLE,
    key: '',
    currentKey: '',
    darkMode: false,
    isLive: false,
    isRaw: false,
} as const;