import { useEffect, useRef } from 'react';
import { EditorView } from 'prosemirror-view';
import { createEditorState } from '../config/editorConfig';
import { useEditorContext } from '../context/EditorContext';

interface ProseMirrorEditorProps {
  className?: string;
}

export function ProseMirrorEditor({ className }: ProseMirrorEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorViewRef = useRef<EditorView | null>(null);
  const isInitializedRef = useRef(false);
  const { dispatch } = useEditorContext();

  const handleEditorClick = () => {
    if (editorViewRef.current) {
      editorViewRef.current.focus();
    }
  };

  useEffect(() => {
    if (!editorRef.current || isInitializedRef.current) return;

    const editorState = createEditorState();

    const editorView = new EditorView(editorRef.current, {
      state: editorState,
      dispatchTransaction: (transaction) => {
        const newState = editorView.state.apply(transaction);
        editorView.updateState(newState);
        dispatch({ type: 'UPDATE_STATE', payload: newState });
      },
    });

    editorViewRef.current = editorView;
    isInitializedRef.current = true;

    dispatch({ type: 'INIT_EDITOR', payload: { state: editorState, view: editorView } });

    return () => {
      if (editorView) {
        editorView.destroy();
        editorViewRef.current = null;
        isInitializedRef.current = false;
        dispatch({ type: 'DESTROY_EDITOR' });
      }
    };
  }, []);

  return (
    <div className={className}>
      <div ref={editorRef} className="prosemirror-editor" onClick={handleEditorClick} />
    </div>
  );
}
