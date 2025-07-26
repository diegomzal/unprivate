import { Button, Flex, Input, Typography, Space, Spin } from "antd";
import { useEffect, useReducer } from "react";
import Markdown from "react-markdown";
import { useDebounce } from "use-debounce";
import reducer from "./NotesReducer";
import { DefaultNotesState } from "../../constants";
import { NotesReducerActionTypes, StatusTypes } from "../../types";
import { getNote } from "../../api/entryApi";

const { TextArea } = Input;
const { Text } = Typography;

function Notes() {
  const [state, dispatch] = useReducer(reducer, DefaultNotesState);
  const [debouncedText] = useDebounce(state.text, 500);

  useEffect(() => {
    if (debouncedText) {
      dispatch({ type: NotesReducerActionTypes.SET_STATUS, payload: StatusTypes.SAVING });
      setTimeout(() => { // Simulate saving data
        dispatch({ type: NotesReducerActionTypes.SET_STATUS, payload: StatusTypes.SAVED });
      }, 1000);
    }
  }, [debouncedText]);

  const submitKey = async () => {
    if (state.key) {
      dispatch({ type: NotesReducerActionTypes.SET_STATUS, payload: StatusTypes.FETCHING });
      let response = await getNote(state.key);
      dispatch({ type: NotesReducerActionTypes.SET_INITIAL_TEXT, payload: response.value || '' });
    }
  }
  
  function StatusText() {
    switch (state.status) {
      case StatusTypes.SAVING:
        return <><Text type="warning">Saving...</Text><Spin size="small" style={{ marginLeft: 8 }} /></>;
      case StatusTypes.SAVED:
      case StatusTypes.PRISTINE:
        return <Text type="success">Saved!</Text>;
      case StatusTypes.ERROR:
        return <Text type="danger">Error</Text>;
      default:
        return <></>;
    }
  }

  return (
    <>
      <Flex gap={10} align='center'>
        <Space.Compact style={{ width: '100%' }} >
          <Input.Password placeholder="Type key here" 
                          maxLength={128} 
                          value={state.key}
                          onChange={(e) => dispatch({ type: NotesReducerActionTypes.SET_KEY, payload: e.target.value })} 
                          count={{show: true, max: 128}} />
          <Button type="primary" onClick={submitKey}>Submit</Button>
        </Space.Compact>
      </Flex>
      {
        state.status === StatusTypes.FETCHING ?
          <Spin size="large" style={{ display: 'block', margin: '20px auto' }} /> :
          <>
            {
              state.status !== StatusTypes.IDLE &&
              <>
                <Text>Status: </Text><StatusText />
                <Space.Compact style={{ width: '100%', marginTop: '5px' }}>
                  <TextArea rows={30} 
                            style={{ width: '50%' }} 
                            onChange={(e) => dispatch({ type: NotesReducerActionTypes.SET_TEXT, payload: e.target.value })} 
                            value={state.text}
                            />
                  <div style={{ padding: '0px 10px 0px 10px' }}>
                    <Markdown>{state.text}</Markdown>
                  </div>
                </Space.Compact>
              </>
            }

          </>

      }

    </>
  )
}

export default Notes;