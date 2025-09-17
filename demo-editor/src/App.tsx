import { useEditorReducer } from './hooks/useEditorReducer';
import { EditorProvider } from './context/EditorContext';
import { ProseMirrorEditor } from './components/ProseMirrorEditor';
import { EditorToolbar } from './components/EditorToolbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { WixDesignSystemProvider } from '@wix/design-system';
import './App.css';

function App() {
  const [editorState, dispatch] = useEditorReducer();

  return (
    <WixDesignSystemProvider>
      <ErrorBoundary>
        <EditorProvider state={editorState} dispatch={dispatch}>
          <div className="app">
            <h1>Text Editor</h1>
            <div className="editor-container">
              <EditorToolbar />
              <ProseMirrorEditor className="editor-wrapper" />
            </div>
          </div>
        </EditorProvider>
      </ErrorBoundary>
    </WixDesignSystemProvider>
  );
}

export default App;