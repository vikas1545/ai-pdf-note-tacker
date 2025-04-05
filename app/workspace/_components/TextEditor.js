import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import EditorExtension from "./EditorExtension";

function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start Taking Your Notes Here...",
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
  });
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
