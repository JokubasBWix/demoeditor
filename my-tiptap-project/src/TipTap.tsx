// src/Tiptap.tsx
import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useMemo } from 'react'
import EditorStateDisplay from './components/EditorStateDisplay'
import MenuBar from './components/MenuBar'
import { JokesExtension } from './plugins/jokes'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, JokesExtension],
    content: '<p>Hello World!</p>', // initial content
  })

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <EditorContext.Provider value={providerValue}>
      <div className="editor-container">
        <div className="editor-wrapper">
          <MenuBar editor={editor} />
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