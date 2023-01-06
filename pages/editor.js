import { useRef } from 'react';
import Editor from '../components/Editor';

export default function EditorPage() {
  const editorRef = useRef()

  return (
    <div>
        <Editor editorRef={editorRef}/>
    </div>
  )
}
