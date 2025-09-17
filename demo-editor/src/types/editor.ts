import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export interface EditorStateType {
  editorState: EditorState | null;
  editorView: EditorView | null;
  isReady: boolean;
}

export type EditorAction = 
  | { type: 'INIT_EDITOR'; payload: { state: EditorState; view: EditorView } }
  | { type: 'UPDATE_STATE'; payload: EditorState }
  | { type: 'DESTROY_EDITOR' };

export interface EditorContextType {
  state: EditorStateType;
  dispatch: React.Dispatch<EditorAction>;
}
