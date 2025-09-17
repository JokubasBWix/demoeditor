import { useCallback } from 'react';
import { undo, redo } from 'prosemirror-history';
import { useEditorContext } from '../context/EditorContext';

export const useHistoryActions = () => {
  const { state } = useEditorContext();
  
  const handleUndo = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!state.editorView || !state.editorState) return;
    undo(state.editorState, state.editorView.dispatch);
    state.editorView.focus();
  }, [state.editorView, state.editorState]);
  
  const handleRedo = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!state.editorView || !state.editorState) return;
    redo(state.editorState, state.editorView.dispatch);
    state.editorView.focus();
  }, [state.editorView, state.editorState]);
  
  const canUndo = state.editorState ? undo(state.editorState) : false;
  const canRedo = state.editorState ? redo(state.editorState) : false;
  
  return {
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,
    isDisabled: !state.isReady
  };
};
