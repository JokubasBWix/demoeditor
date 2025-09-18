import { useCurrentEditor } from '@tiptap/react'
import { useEditorStateData } from '../hooks/useEditorState'

const EditorStateDisplay = () => {
  const { editor } = useCurrentEditor()
  const editorState = useEditorStateData(editor)

  if (!editorState) {
    return <div>Editor not available</div>
  }

  return (
    <div>
      <h3>Editor State</h3>
      <div>
        <strong>Is Editable:</strong> {editorState.isEditable ? 'Yes' : 'No'}
      </div>
      <div>
        <strong>Is Bold:</strong> {editorState.isBold ? 'Yes' : 'No'}
      </div>
      <div>
        <strong>Is Italic:</strong> {editorState.isItalic ? 'Yes' : 'No'}
      </div>
      <div>
        <strong>Selection:</strong> {JSON.stringify(editorState.currentSelection, null, 2)}
      </div>
      <div>
        <strong>Content:</strong>
        <pre>
          {JSON.stringify(editorState.currentContent, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default EditorStateDisplay
