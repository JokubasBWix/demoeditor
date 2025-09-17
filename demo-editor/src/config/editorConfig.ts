import { EditorState } from 'prosemirror-state';
import { Schema } from 'prosemirror-model';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { addListNodes, liftListItem, sinkListItem, splitListItem } from 'prosemirror-schema-list';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { undo, redo } from 'prosemirror-history';
import { toggleMark, baseKeymap } from 'prosemirror-commands';

const createSchema = (): Schema => {
  const nodes = addListNodes(basicSchema.spec.nodes, "paragraph block*", "block");
  return new Schema({ 
    nodes, 
    marks: basicSchema.spec.marks 
  });
};

const createHistoryKeymap = () => ({
  "Mod-z": undo,
  "Mod-y": redo,
});

const createMarkKeymap = (schema: Schema) => ({
  "Mod-b": toggleMark(schema.marks.strong),
  "Mod-i": toggleMark(schema.marks.em),
});

const createListKeymap = (schema: Schema): Record<string, any> => {
  if (!schema.nodes.list_item) {
    return {};
  }

  return {
    "Enter": splitListItem(schema.nodes.list_item),
    "Tab": sinkListItem(schema.nodes.list_item),
    "Shift-Tab": liftListItem(schema.nodes.list_item),
  };
};

const buildKeymap = (schema: Schema) => ({
  ...createHistoryKeymap(),
  ...createMarkKeymap(schema),
  ...createListKeymap(schema),
});

const createPlugins = (schema: Schema) => [
  history(),
  keymap(buildKeymap(schema)),
  keymap(baseKeymap),
];

export const createEditorConfig = () => {
  const schema = createSchema();
  const plugins = createPlugins(schema);

  return {
    schema,
    plugins,
  };
};

export const createEditorState = (): EditorState => {
  const config = createEditorConfig();
  return EditorState.create(config);
};
