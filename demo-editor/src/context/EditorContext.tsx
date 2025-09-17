import React, { createContext, useContext } from 'react';
import type { EditorStateType, EditorAction, EditorContextType } from '../types/editor';

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
}

interface EditorProviderProps {
  children: React.ReactNode;
  state: EditorStateType;
  dispatch: React.Dispatch<EditorAction>;
}

export function EditorProvider({ children, state, dispatch }: EditorProviderProps) {
  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}
