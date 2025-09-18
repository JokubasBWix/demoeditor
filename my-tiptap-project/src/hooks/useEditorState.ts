import { useEditorState } from '@tiptap/react'
import { Editor } from '@tiptap/core'

export interface EditorStateData {
  isEditable: boolean
  currentSelection: any
  currentContent: any
  isBold: boolean
  isItalic: boolean
}

export const useEditorStateData = (editor: Editor | null) => {
  return useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null

      return {
        isEditable: editor.isEditable,
        currentSelection: editor.state.selection,
        currentContent: editor.getJSON(),
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
      }
    },
  })
}
