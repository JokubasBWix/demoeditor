import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { MarkType } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';

export const createMarkHandler = (markType: MarkType) => {
  return (editorState: EditorState, editorView: EditorView) => {
    const { selection } = editorState;
    const currentMarks = editorState.doc.resolve(selection.from).marks();
    const storedMarks = editorState.storedMarks;
    
    const hasMarkInCurrent = currentMarks.some(mark => mark.type === markType);
    const hasMarkInStored = storedMarks ? storedMarks.some(mark => mark.type === markType) : false;
    const hasMark = hasMarkInCurrent || hasMarkInStored;
    
    if (!selection.empty) {
      toggleMark(markType)(editorState, editorView.dispatch);
    } else {
      const tr = editorState.tr;
      if (hasMark) {
        tr.removeStoredMark(markType);
      } else {
        tr.addStoredMark(markType.create());
      }
      editorView.dispatch(tr);
    }
    
    editorView.focus();
  };
};

export const isMarkActive = (editorState: EditorState | null, markType: MarkType): boolean => {
  if (!editorState) return false;
  
  const { selection } = editorState;
  
  if (!selection.empty) {
    return editorState.doc.rangeHasMark(selection.from, selection.to, markType);
  }
  
  const storedMarks = editorState.storedMarks;
  if (storedMarks) {
    return storedMarks.some(mark => mark.type === markType);
  }
  
  const $pos = editorState.doc.resolve(selection.from);
  const marks = $pos.marks();
  return marks.some(mark => mark.type === markType);
};
