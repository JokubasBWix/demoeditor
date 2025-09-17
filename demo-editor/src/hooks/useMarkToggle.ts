import { useCallback } from 'react';
import { useEditorContext } from '../context/EditorContext';
import { createMarkHandler, isMarkActive } from '../utils/markHandlers';
import { MarkType } from 'prosemirror-model';

/**
 * Custom hook for mark toggle operations
 */
export const useMarkToggle = (markType: MarkType) => {
  const { state } = useEditorContext();
  
  const toggleMark = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!state.editorView || !state.editorState) return;
    
    const markHandler = createMarkHandler(markType);
    markHandler(state.editorState, state.editorView);
  }, [state.editorView, state.editorState, markType]);
  
  const isActive = isMarkActive(state.editorState, markType);
  
  return {
    toggleMark,
    isActive,
    isDisabled: !state.isReady
  };
};
