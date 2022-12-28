import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor, EditorContent } from "@tiptap/react";
import Highlight from '@tiptap/extension-highlight';
import StarterKit from "@tiptap/starter-kit";
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import useStore from "../../store/store";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Editor() {
  const getOutput = useStore((state) => state.output)

  const content = getOutput
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
    content,
   })
    
   const matches = useMediaQuery('(max-width: 600px)');

  return (
    <RichTextEditor 
      editor={editor}
      withTypographyStyles={false}
      styles={{
        root: {
          border: 'none',
          margin: '-16px -16px'
        },
        toolbar: {
          marginBottom: '2rem',
          justifyContent: 'center'
        },
        content: {
          padding: matches ? '15px 30px' : '30px 68px',
          width: matches ? '90%' : '70%',
          minHeight: '95vh',
          margin: '0rem auto 1rem auto',
          border: 'none'
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
          <Button className="mr-1" color="dark" size="xs">Save Draft</Button>
          <Button className="mr-1" size="xs">Save as PDF</Button>
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content className="h-full" />
    </RichTextEditor>
  )
}
