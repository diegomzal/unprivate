import { Input } from "antd";
import { NotesReducerActionTypes, StatusTypes, type Action, type State } from "../types";
import Markdown from "react-markdown";
import { useEffect, type RefObject } from "react";
import { useDebounce } from "use-debounce";
import { saveNote } from "../api/noteApi";
import styled from "styled-components";

const { TextArea } = Input;

type NoteInputProps = {
    dispatch: React.Dispatch<Action>;
    state: State;
    isPristine: RefObject<boolean>;
};

function NoteInput({ dispatch, state, isPristine }: NoteInputProps) {
    const [debouncedText] = useDebounce(state.text, 500);

    useEffect(() => {
        if (isPristine.current) {
            isPristine.current = false;
            return;
        }
        if (debouncedText) {
            dispatch({ type: NotesReducerActionTypes.SET_STATUS, payload: { status: StatusTypes.SAVING } });
            saveNote(state.key, debouncedText)
                .then((response) => {
                    dispatch({ type: NotesReducerActionTypes.SET_STATUS, payload: { status: StatusTypes.SAVED, updatedAt: response.updatedAt } });
                })
                .catch(() => {
                    dispatch({ type: NotesReducerActionTypes.SET_STATUS, payload: { status: StatusTypes.ERROR } });
                });
        }
    }, [debouncedText]);

    return (
        <Wrapper>
            <StyledTextArea
                rows={24}
                onChange={(e) => dispatch({ type: NotesReducerActionTypes.SET_TEXT, payload: e.target.value })}
                value={state.text}
                placeholder="Write your note here..."
            />
            <MarkdownWrapper>
                <Markdown>{state.text}</Markdown>
            </MarkdownWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    gap: 24px;
`;

const StyledTextArea = styled(TextArea)`
    width: 50%;
    font-size: 15px;
    border-radius: 8px;
    resize: vertical;
    min-height: 300px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`;

const MarkdownWrapper = styled.div`
    flex: 1;
    background: #fafbfc;
    border-radius: 8px;
    padding: 0px 18px 18px 18px;
    min-height: 300px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
    overflow: auto;
`;

export default NoteInput;