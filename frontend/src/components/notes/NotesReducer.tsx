import { NotesReducerActionTypes, type StatusType } from '../../types';

type Action =
    | { type: typeof NotesReducerActionTypes.SET_TEXT; payload: string }
    | { type: typeof NotesReducerActionTypes.SET_STATUS; payload: StatusType }
    | { type: typeof NotesReducerActionTypes.SET_KEY; payload: string }
    | { type: typeof NotesReducerActionTypes.SET_KEY_VISIBILITY; payload: boolean };

type State = {
    text: string;
    status: StatusType;
    key: string;
    keyVisible: boolean;
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case NotesReducerActionTypes.SET_TEXT:
            return { ...state, text: action.payload };
        case NotesReducerActionTypes.SET_STATUS:
            return { ...state, status: action.payload };
        case NotesReducerActionTypes.SET_KEY:
            const re = /^[A-Za-z][A-Za-z0-9]*$/;
            if (!re.test(action.payload)) {
                return state;
            }
            return { ...state, key: action.payload };
        case NotesReducerActionTypes.SET_KEY_VISIBILITY:
            return { ...state, keyVisible: action.payload };
        default:
            return state;
    }
}

export default reducer;