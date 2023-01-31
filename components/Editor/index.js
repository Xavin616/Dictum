import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from '@tiptap/extension-highlight';
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useStore from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export default function Editor({ editorRef }) {
  const getOutput = useStore((state) => state.output)
  const [editorContent, setEditorContent] = useState(getOutput)
  //console.log(getOutput)

  const editor = useEditor({
    extensions: [
        StarterKit,
        Underline,
        Link,
        Superscript,
        SubScript,
        Highlight,
        TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content: ``,
    editable: true,
    onUpdate({ editor }) {
      if (getOutput !== editor.getHTML()) {
        setEditorContent(editor.getHTML());
      } 
    }
  }, [])

  useEffect(() => {
    editor && editor.commands.setContent(getOutput)
  }, [editor, getOutput])   
  // editor.commands.setContent('<p>Yes!</p>')

  const matches = useMediaQuery('(max-width: 600px)');

  return (
    <RichTextEditor 
      ref={editorRef}
      editor={editor}
      withTypographyStyles={false}
      styles={{
        root: {
          border: 'none',
          margin: '-16px -16px',
        },
        toolbar: {
          marginBottom: '0.7rem',
          justifyContent: 'center'
        },
        content: {
          padding: matches ? '7.5px 5px' : '35px 70px 70px 70px',
          width: matches ? '95%' : '70%',
          minHeight: '25.7cm',
          margin: '0rem auto 3rem auto',
          border: 'none',
          fontSize: matches ? '0.8rem' : '1rem'
        }
      }}
    >
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <Button className="mr-1" color="dark" size="xs"
            onClick={() => {
              navigator.clipboard.writeText(editorContent);
              showNotification({
                title: "Copied to clipboard",
                icon: <IconCheck />,
                autoClose: 2500
              })
            }}
          >
            Copy to Clipboard
          </Button>

          <Button disabled className="mr-1" size="xs">Save as PDF</Button>
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content/>
    </RichTextEditor>
  )
}
