import { StatusTypes } from './types';

export const DefaultNotesState = {
    text: '',
    status: StatusTypes.IDLE,
    key: '',
    keyVisible: false
} as const;