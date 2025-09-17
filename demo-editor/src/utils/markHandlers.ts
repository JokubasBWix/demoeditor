import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { MarkType } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';

/**
 * Creates a generic mark handler that can be used for any mark type
 */
export const createMarkHandler = (markType: MarkType) => {
  return (editorState: EditorState, editorView: EditorView) => {
    const { selection } = editorState;
    const currentMarks = editorState.doc.resolve(selection.from).marks();
    const storedMarks = editorState.storedMarks;
    
    // Check if mark is active (either in current marks or stored marks)
    const hasMarkInCurrent = currentMarks.some(mark => mark.type === markType);
    const hasMarkInStored = storedMarks ? storedMarks.some(mark => mark.type === markType) : false;
    const hasMark = hasMarkInCurrent || hasMarkInStored;
    
    // If there's a selection, use toggleMark
    if (!selection.empty) {
      toggleMark(markType)(editorState, editorView.dispatch);
    } else {
      const tr = editorState.tr;
      if (hasMark) {
        // Remove stored mark when mark is active
        tr.removeStoredMark(markType);
      } else {
        // Add the mark
        tr.addStoredMark(markType.create());
      }
      editorView.dispatch(tr);
    }
    
    // Restore focus to the editor
    editorView.focus();
  };
};

/**
 * Simplified mark detection function
 */
export const isMarkActive = (editorState: EditorState | null, markType: MarkType): boolean => {
  if (!editorState) return false;
  
  const { selection } = editorState;
  
  // If there's a selection, check if the range has the mark
  if (!selection.empty) {
    return editorState.doc.rangeHasMark(selection.from, selection.to, markType);
  }
  
  // If no selection, check stored marks first (what will be applied to new text)
  const storedMarks = editorState.storedMarks;
  if (storedMarks) {
    return storedMarks.some(mark => mark.type === markType);
  }
  
  // Fall back to current position marks
  const $pos = editorState.doc.resolve(selection.from);
  const marks = $pos.marks();
  return marks.some(mark => mark.type === markType);
};
