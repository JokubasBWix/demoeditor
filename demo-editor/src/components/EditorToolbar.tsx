import { useMarkToggle } from '../hooks/useMarkToggle';
import { useListToggle } from '../hooks/useListToggle';
import { useHistoryActions } from '../hooks/useHistoryActions';
import { useEditorContext } from '../context/EditorContext';
import { Bold, Italic, Undo, Redo, List, NumberedList } from '@wix/wix-ui-icons-common';

export function EditorToolbar() {
  const { state } = useEditorContext();
  const schema = state.editorState?.schema;
  
  const boldToggle = useMarkToggle(schema?.marks.strong!);
  const italicToggle = useMarkToggle(schema?.marks.em!);
  const bulletListToggle = useListToggle(schema?.nodes.bullet_list!);
  const numberedListToggle = useListToggle(schema?.nodes.ordered_list!);
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
      <button 
        onMouseDown={bulletListToggle.toggleList} 
        disabled={bulletListToggle.isDisabled}
        className={bulletListToggle.isActive ? 'active' : ''}
      >
        <List size="20" />
      </button>
      <button 
        onMouseDown={numberedListToggle.toggleList} 
        disabled={numberedListToggle.isDisabled}
        className={numberedListToggle.isActive ? 'active' : ''}
      >
        <NumberedList size="20" />
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
