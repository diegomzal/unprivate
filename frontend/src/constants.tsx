import { StatusTypes } from './types';

export const DefaultNotesState = {
    text: '',
    status: StatusTypes.IDLE,
    key: '',
    currentKey: '',
    showMarkdown: true,
    darkMode: false,
    isLive: false
} as const;