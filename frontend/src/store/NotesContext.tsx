import { createContext, useContext, useReducer, type ReactNode } from "react";
import reducer from './NotesReducer';
import { DefaultNotesState } from "../constants";
import { type NotesContextType } from "../types";

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children } : { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, DefaultNotesState);
    return (
        <NotesContext.Provider value={{ state, dispatch }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
};