import { Spin } from "antd";
import { useReducer, useRef } from "react";
import reducer from "./store/NotesReducer";
import { DefaultNotesState } from "../constants";
import { StatusTypes } from "../types";
import KeyInput from "./KeyInput";
import StatusHeader from "./StatusHeader";
import NoteInput from "./NoteInput";
import styled from "styled-components";

function Notes() {
  const [state, dispatch] = useReducer(reducer, DefaultNotesState);
  const isPristine = useRef(false);

  return (
    <Wrapper>
      <KeyInput dispatch={dispatch} state={state} isPristine={isPristine} />
      {state.status === StatusTypes.FETCHING ? (
        <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />
      ) : (
        state.status !== StatusTypes.IDLE && (
          <>
            <StatusHeader state={state} />
            <NoteInput dispatch={dispatch} state={state} isPristine={isPristine} />
          </>
        )
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
    max-width: 1024px;
    margin: 15px auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    padding: 32px;
`;

export default Notes;