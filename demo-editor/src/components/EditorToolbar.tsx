import { schema } from 'prosemirror-schema-basic';
import { useMarkToggle } from '../hooks/useMarkToggle';
import { useHistoryActions } from '../hooks/useHistoryActions';
import { Bold, Italic, Undo, Redo } from '@wix/wix-ui-icons-common';

export function EditorToolbar() {
  const boldToggle = useMarkToggle(schema.marks.strong);
  const italicToggle = useMarkToggle(schema.marks.em);
  const { handleUndo, handleRedo, canUndo, canRedo, isDisabled } = useHistoryActions();

  return (
    <div className="editor-toolbar">
      <button 
        onMouseDown={boldToggle.toggleMark} 
        disabled={boldToggle.isDisabled}
        className={boldToggle.isActive ? 'active' : ''}
      >
        <Bold size="20" />
      </button>
      <button 
        onMouseDown={italicToggle.toggleMark} 
        disabled={italicToggle.isDisabled}
        className={italicToggle.isActive ? 'active' : ''}
      >
        <Italic size="20" />
      </button>
      <div className="toolbar-separator" />
      <button onMouseDown={handleUndo} disabled={isDisabled || !canUndo}>
        <Undo size="20" />
      </button>
      <button onMouseDown={handleRedo} disabled={isDisabled || !canRedo}>
        <Redo size="20" />
      </button>
    </div>
  );
}
