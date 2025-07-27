import { Input } from "antd";
import { NotesReducerActionTypes, StatusTypes, type Action, type State } from "../types";
import Markdown from "react-markdown";
import { useEffect, type RefObject } from "react";
import { useDebounce } from "use-debounce";
import { saveNote } from "../api/noteApi";
import styled from "styled-components";
import remarkGfm from 'remark-gfm'
import { useTheme } from "./store/ThemeContext";

const { TextArea } = Input;

type NoteInputProps = {
    dispatch: React.Dispatch<Action>;
    state: State & { showMarkdown?: boolean };
    isPristine: RefObject<boolean>;
};

function NoteInput({ dispatch, state, isPristine }: NoteInputProps) {
    const [debouncedText] = useDebounce(state.text, 500);
    const { theme } = useTheme();

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
                $fullwidth={!state.showMarkdown}
            />
            {state.showMarkdown !== false && (
                <MarkdownWrapper $dark={theme === 'dark'}>
                    <Markdown remarkPlugins={[remarkGfm]}>{state.text}</Markdown>
                </MarkdownWrapper>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    gap: 24px;

    @media (max-width: 700px) {
        flex-direction: column;
        gap: 12px;
    }
`;

const StyledTextArea = styled(TextArea)<{ $fullwidth?: boolean }>`
    width: ${({ $fullwidth }) => ($fullwidth ? '100%' : '50%')};
    font-size: 15px;
    border-radius: 8px;
    resize: vertical;
    min-height: 300px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);

    @media (max-width: 700px) {
        width: 100%;
        min-height: 180px;
    }
`;

const MarkdownWrapper = styled.div<{ $dark?: boolean }>`
    flex: 1;
    background: ${({ $dark }) => ($dark ? '#23272e' : '#fafbfc')};
    color: ${({ $dark }) => ($dark ? '#f5f6fa' : 'inherit')};
    border-radius: 8px;
    padding: 0px 18px 18px 18px;
    min-height: 300px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
    overflow: auto;

    @media (max-width: 700px) {
        min-height: 120px;
        padding: 12px 8px 12px 8px;
    }
`;

export default NoteInput;