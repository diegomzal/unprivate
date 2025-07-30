import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/react'
import NoteEditorBar from './NoteEditorBar'
import './NoteInput.css'
import styled from 'styled-components'
import { NotesReducerActionTypes, StatusTypes } from '../types'
import { useTheme } from '../store/ThemeContext'
import { Input } from 'antd'
import { useEffect, type RefObject } from 'react'
import { useDebounce } from 'use-debounce'
import { saveNote } from '../api/noteApi'
import { useNotesContext } from '../store/NotesContext'

type NoteInputProps = {
    isPristine: RefObject<boolean>;
};

function NoteInput({ isPristine }: NoteInputProps) {
    const { theme } = useTheme();
    const { state, dispatch } = useNotesContext();
    const { TextArea } = Input;

    const [debouncedText] = useDebounce(state.text, 500);

    useEffect(() => {
        if (isPristine.current) {
            isPristine.current = false;
            return;
        }
        if (debouncedText) {
            dispatch({ type: NotesReducerActionTypes.SET_STATUS, payload: { status: StatusTypes.SAVING } });
            saveNote(state.currentKey, debouncedText)
                .then((response) => {
                    dispatch({ type: NotesReducerActionTypes.SET_STATUS, payload: { status: StatusTypes.SAVED, updatedAt: response.updatedAt } });
                })
                .catch(() => {
                    dispatch({ type: NotesReducerActionTypes.SET_STATUS, payload: { status: StatusTypes.ERROR } });
                });
        }
    }, [debouncedText]);

    const editor = useEditor({
        extensions: [StarterKit],
        content: state.text,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            dispatch({ type: NotesReducerActionTypes.SET_TEXT, payload: html })
        }
    })

    return (
        <>
            <NoteEditorBar editor={editor} />
            {state.isRaw ? (
                <TextArea
                    value={state.text}
                    autoSize={{ minRows: 8, maxRows: 24 }}
                    readOnly       
                    style={{ fontFamily: 'monospace', fontSize: 14, background: theme === 'dark' ? '#18181b' : '#fff', color: theme === 'dark' ? '#f4f4f5' : '#222' }}
                />
            ) : (
                <StyledEditorWrapper $dark={theme === 'dark'}>
                    <div className="tiptap">
                        <EditorContent editor={editor} />
                    </div>
                </StyledEditorWrapper>
            )}



        </>
    )
}

const StyledEditorWrapper = styled.div<{ $dark?: boolean }>`
  background: ${({ $dark }) => $dark ? '#18181b' : '#fff'};
  border: 1.5px solid ${({ $dark }) => $dark ? '#27272a' : '#e5e7eb'};
  color: ${({ $dark }) => $dark ? '#f4f4f5' : '#222'};
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  min-height: 180px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  transition: border-color 0.2s;
  margin-bottom: 1.5rem;
  .tiptap {
    min-height: 120px;
    color: ${({ $dark }) => $dark ? '#f4f4f5' : '#222'};
  }
  .ProseMirror {
    background: transparent;
    color: ${({ $dark }) => $dark ? '#f4f4f5' : '#222'};
  }
  .ProseMirror:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

export default NoteInput;