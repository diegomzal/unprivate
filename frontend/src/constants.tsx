import { StatusTypes } from './types';

export const DefaultNotesState = {
    text: '',
    status: StatusTypes.IDLE,
    key: '',
    showMarkdown: true,
    darkMode: false
} as const;