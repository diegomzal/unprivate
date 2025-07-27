import { Button, Flex, Input } from "antd";
import { NotesReducerActionTypes, StatusTypes, type Action, type NoteObject, type State } from "../types";
import { getNote } from "../api/noteApi";
import type { RefObject } from "react";
import { useNoteSocket } from "../hooks/useNoteSocket";

type KeyInputProps = {
  dispatch: React.Dispatch<Action>;
  state: State;
  isPristine: RefObject<boolean>;
};

function KeyInput({dispatch, state, isPristine}: KeyInputProps) {

    const handleUpdate = (updatedNote: string) => {
        isPristine.current = true;
        dispatch({ type: NotesReducerActionTypes.SET_TEXT, payload: updatedNote });
    };

    const handleLiveUpdate = (isLive: boolean) => {
        dispatch({ type: NotesReducerActionTypes.SET_IS_LIVE, payload: isLive });
    };

    useNoteSocket(state.currentKey, handleUpdate, handleLiveUpdate);

    const submitKey = async () => {
        if (state.key) {
            dispatch({ type: NotesReducerActionTypes.SET_CURRENT_KEY, payload: state.key });
            dispatch({ type: NotesReducerActionTypes.SET_STATUS, payload: {status: StatusTypes.FETCHING} });
            let response = await getNote(state.key);    
            isPristine.current = true;
            dispatch({ type: NotesReducerActionTypes.SET_INITIAL_TEXT, payload: { key: state.key, value: response.value || '', updatedAt: response.updatedAt } as NoteObject });
        }
    }

    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.value;
        const re = /^[\w\d\s!@#$%^&*()\-_=+\[\]{};:'",.<>?|~`]*$/;
        if (!re.test(key)) {
            return;
        }
        dispatch({ type: NotesReducerActionTypes.SET_KEY, payload: key });
    };


    return (
        <Flex gap={16} align='center' style={{ marginBottom: 16 }}>
            <Input
                placeholder="Type a key here. Can be anything!"
                maxLength={128}
                value={state.key}
                disabled={state.status === StatusTypes.FETCHING}
                onChange={handleKeyChange}
                onPressEnter={submitKey}
                count={{ show: true, max: 128 }}
                style={{ flex: 1, minWidth: 0, fontSize: 16, borderRadius: 8 }}
            />
            <Button
                type="primary"
                onClick={submitKey}
                disabled={!state.key || state.status === StatusTypes.FETCHING}
                size="large"
                style={{ borderRadius: 8, fontWeight: 500 }}
            >
                Submit
            </Button>
        </Flex>
    )
}

export default KeyInput;