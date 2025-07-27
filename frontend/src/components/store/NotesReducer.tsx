import { NotesReducerActionTypes, StatusTypes, type Action, type State } from '../../types';

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case NotesReducerActionTypes.SET_INITIAL_TEXT:
            return { ...state, text: action.payload.value, status: StatusTypes.SAVED, updatedAt: action.payload.updatedAt };
        case NotesReducerActionTypes.SET_TEXT:
            return { ...state, text: action.payload };
        case NotesReducerActionTypes.SET_STATUS:
            if (action.payload.status === StatusTypes.SAVED) {
                return { ...state, status: action.payload.status, updatedAt: action.payload.updatedAt };
            }
            return { ...state, status: action.payload.status };
        case NotesReducerActionTypes.SET_KEY:
            return { ...state, key: action.payload };
        case NotesReducerActionTypes.SET_MARKDOWN_TOGGLE:
            return { ...state, showMarkdown: action.payload };
        default:
            return state;
    }
}

export default reducer;