import { useReducer, useCallback } from 'react';
import type { EditorStateType, EditorAction } from '../types/editor';

const initialEditorState: EditorStateType = {
  editorState: null,
  editorView: null,
  isReady: false,
};

function editorReducer(state: EditorStateType, action: EditorAction): EditorStateType {
  switch (action.type) {
    case 'INIT_EDITOR':
      return {
        ...state,
        editorState: action.payload.state,
        editorView: action.payload.view,
        isReady: true,
      };
    case 'UPDATE_STATE':
      return {
        ...state,
        editorState: action.payload,
      };
    case 'DESTROY_EDITOR':
      return {
        ...state,
        editorState: null,
        editorView: null,
        isReady: false,
      };
    default:
      return state;
  }
}

export function useEditorReducer() {
  const [state, dispatch] = useReducer(editorReducer, initialEditorState);
  
  const stableDispatch = useCallback(dispatch, []);
  
  return [state, stableDispatch] as const;
}
