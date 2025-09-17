import { useCallback } from 'react';
import { useEditorContext } from '../context/EditorContext';
import { wrapInList, liftListItem } from 'prosemirror-schema-list';
import { NodeType } from 'prosemirror-model';


export const useListToggle = (listType: NodeType) => {
  const { state } = useEditorContext();
  
  const toggleList = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!state.editorView || !state.editorState) return;
    
    const { editorState, editorView } = state;
    const schema = editorState.schema;
    
    const isInList = isInListOfType(editorState, listType);
    
    if (isInList) {

      const liftCommand = liftListItem(schema.nodes.list_item);
      liftCommand(editorState, editorView.dispatch);
    } else {
      const wrapCommand = wrapInList(listType);
      wrapCommand(editorState, editorView.dispatch);
    }
    
    editorView.focus();
  }, [state.editorView, state.editorState, listType]);
  
  const isActive = isInListOfType(state.editorState, listType);
  
  return {
    toggleList,
    isActive,
    isDisabled: !state.isReady
  };
};

const isInListOfType = (editorState: any, listType: NodeType): boolean => {
  if (!editorState) return false;
  
  const { selection } = editorState;
  const { $from } = selection;
  
  for (let depth = $from.depth; depth > 0; depth--) {
    const node = $from.node(depth);
    if (node.type === listType) {
      return true;
    }
  }
  
  return false;
};
