import { Divider, Spin, Typography, ConfigProvider, theme } from "antd";
import { useReducer, useRef } from "react";
import reducer from "./store/NotesReducer";
import { DefaultNotesState } from "../constants";
import { StatusTypes } from "../types";
import KeyInput from "./KeyInput";
import StatusHeader from "./StatusHeader";
import NoteInput from "./NoteInput";
import styled from "styled-components";
import Lightswitch from "./Lightswitch";
import { useTheme } from "./store/ThemeContext";

const { Title, Paragraph } = Typography;

function Notes() {
  const [state, dispatch] = useReducer(reducer, DefaultNotesState);
  const isPristine = useRef(false);
  const { theme } = useTheme();

  return (
      <Wrapper $dark={theme === "dark"}>
        <HeaderWrapper>
          <Title level={2} style={{ marginBottom: 0 }}>Unprivate Notes</Title>
          <Lightswitch />
        </HeaderWrapper>
        <Divider />
        <Paragraph>Just type a key, and you will get the value associated to that key. NOTE: Keep in mind that anyone with that key can view & edit the content.</Paragraph>
        <KeyInput dispatch={dispatch} state={state} isPristine={isPristine} />
        {state.status === StatusTypes.FETCHING ? (
          <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
        ) : (
          state.status !== StatusTypes.IDLE && (
            <>
              <StatusHeader state={state} dispatch={dispatch} />
              <NoteInput dispatch={dispatch} state={state} isPristine={isPristine} />
            </>
          )
        )}
      </Wrapper>
  );
}

const Wrapper = styled.div<{ $dark?: boolean }>`
  max-width: 1024px;
  margin: 15px auto;
  background: ${({ $dark }) => ($dark ? '#181c1f' : '#fff')};
  color: ${({ $dark }) => ($dark ? '#f5f6fa' : 'inherit')};
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 16px 32px 32px 32px;
  transition: background 0.2s, color 0.2s;
`;

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

export default Notes;