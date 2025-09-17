import { EditorState } from 'prosemirror-state';
import { schema } from 'prosemirror-schema-basic';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { undo, redo } from 'prosemirror-history';
import { toggleMark } from 'prosemirror-commands';

/**
 * Creates the ProseMirror editor configuration
 */
export const createEditorConfig = () => ({
  schema,
  plugins: [
    history(),
    keymap({
      "Mod-z": undo,
      "Mod-y": redo,
      "Mod-b": toggleMark(schema.marks.strong),
      "Mod-i": toggleMark(schema.marks.em),
    })
  ]
});

/**
 * Creates a new editor state with the default configuration
 */
export const createEditorState = (): EditorState => {
  const config = createEditorConfig();
  return EditorState.create(config);
};
