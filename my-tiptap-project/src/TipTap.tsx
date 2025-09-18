// src/Tiptap.tsx
import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { BulletList, ListItem } from '@tiptap/extension-list'
import Paragraph from '@tiptap/extension-paragraph'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import { useMemo } from 'react'
import EditorStateDisplay from './components/EditorStateDisplay'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, BulletList, ListItem], // define your extension array
    content: '<p>Hello World!</p>', // initial content
  })

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="editor-container">
        <div className="editor-wrapper">
          <EditorContent editor={editor} />
        </div>
        <div className="state-display-wrapper">
          <EditorStateDisplay />
        </div>
      </div>
    </EditorContext.Provider>
  )
}

export default Tiptap