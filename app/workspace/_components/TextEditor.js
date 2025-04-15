import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import EditorExtension from "./EditorExtension";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Highlight from "@tiptap/extension-highlight";
import Strike from '@tiptap/extension-strike'
import Underline from "@tiptap/extension-underline";
import Text from '@tiptap/extension-text'

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Strike,
      Underline,
      Text,
      Placeholder.configure({
        placeholder: "Start Taking Your Notes Here...",
      }),
      Highlight.configure({ multicolor: true })
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
  });

  useEffect(() => {
    editor && editor.commands.setContent(notes);
  }, [notes, editor]);

  return (
    <div>
      <EditorExtension editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
