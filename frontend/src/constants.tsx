import { StatusTypes } from './types';

export const DefaultNotesState = {
    text: '',
    status: StatusTypes.IDLE,
    key: ''
} as const;