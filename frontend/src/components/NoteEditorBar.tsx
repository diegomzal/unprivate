import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import styled from 'styled-components'
import { FontSizeOutlined, BoldOutlined, ItalicOutlined, StrikethroughOutlined, CodeOutlined, MinusOutlined, EnterOutlined, UndoOutlined, RedoOutlined, MessageOutlined } from '@ant-design/icons'
import { useTheme } from '../store/ThemeContext';

function NoteEditorBar({ editor }: { editor: Editor }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold') ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
                isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
                isBlockquote: ctx.editor.isActive('blockquote') ?? false,
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,
            }
        },
    })

    return (
        <BarWrapper $dark={isDark}>
            <ButtonGroup>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    $active={editorState.isBold}
                    disabled={!editorState.canBold}
                    title="Bold"
                >
                    <BoldOutlined />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    $active={editorState.isItalic}
                    disabled={!editorState.canItalic}
                    title="Italic"
                >
                    <ItalicOutlined />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    $active={editorState.isStrike}
                    disabled={!editorState.canStrike}
                    title="Strike"
                >
                    <StrikethroughOutlined />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    $active={editorState.isHeading1}
                    title="Heading 1"
                >
                    <FontSizeOutlined />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    $active={editorState.isHeading2}
                    title="Heading 2"
                >
                    <FontSizeOutlined style={{ fontSize: 16, opacity: 0.8 }} />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    $active={editorState.isHeading3}
                    title="Heading 3"
                >
                    <FontSizeOutlined style={{ fontSize: 14, opacity: 0.6 }} />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    $active={editorState.isCodeBlock}
                    title="Code Block"
                >
                    <CodeOutlined />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    $active={editorState.isBlockquote}
                    title="Blockquote"
                >
                    <MessageOutlined />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Divider"
                >
                    <MinusOutlined />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    title="Hard Break"
                >
                    <EnterOutlined />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editorState.canUndo}
                    title="Undo"
                >
                    <UndoOutlined />
                </IconButton>
                <IconButton $dark={isDark}
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editorState.canRedo}
                    title="Redo"
                >
                    <RedoOutlined />
                </IconButton>
            </ButtonGroup>
        </BarWrapper>
    )
}

const BarWrapper = styled.div<{ $dark?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $dark }) => $dark ? '#23272e' : '#f7f7f9'};
  border-radius: 8px;
  padding: 8px 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  margin-bottom: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 6px;
`;

const IconButton = styled.button<{ $active?: boolean, $dark?: boolean }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background: ${({ $active, $dark }) => $active ? ($dark ? '#31313a' : '#e6f7ff') : ($dark ? '#23272e' : 'white')};
  color: ${({ $active, $dark }) => $active ? '#1890ff' : ($dark ? '#f4f4f5' : '#444')};
  box-shadow: ${({ $active }) => $active ? '0 0 0 2px #91d5ff' : 'none'};
  transition: background 0.15s, color 0.15s, box-shadow 0.15s;
  cursor: pointer;
  font-size: 18px;
  &:hover:not(:disabled) {
    background: ${({ $dark }) => $dark ? '#31313a' : '#f0f5ff'};
    color: #1890ff;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default NoteEditorBar;