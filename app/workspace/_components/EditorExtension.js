import { chatSession } from "@/configs/AIModel";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import {
  Bold,
  Italic,
  Underline,
  StrikethroughIcon,
  HighlighterIcon,
  Sparkle,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function EditorExtension({ editor }) {
  const { fileId } = useParams();
  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();

  const onAIClick = async () => {
    toast("AI Model is preparing your answer...");
    try {
      const selectedText = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        " "
      );

      // console.log("selectedText :", selectedText);
      const result = await SearchAI({
        query: selectedText,
        fileId: fileId,
      });

      const UnformattedAns = JSON.parse(result);
      let AllUnformattedAns = "";
      UnformattedAns &&
        UnformattedAns.forEach((item) => {
          AllUnformattedAns = AllUnformattedAns + item.pageContent;
        });

      const PROMPT =
        "For question :" +
        selectedText +
        " and with the given content as answer," +
        " please give appropriate answer in HTML format. The answer content is: " +
        AllUnformattedAns;

      const AiModelResult = await chatSession.sendMessage(PROMPT);
      const FinalAns = AiModelResult.response
        .text()
        .replaceAll("```", "")
        .replace("html", "");
      console.log("finalAns : ", FinalAns);
      const AllText = editor.getHTML();
      editor.commands.setContent(
        AllText + "<p><strong>Answer :</strong>" + FinalAns + " </p>"
      );

      saveNotes({
        notes: editor.getHTML(),
        fileId: fileId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    editor && (
      <div className="p-5">
        <div className="control-group">
          <div className="button-group flex gap-3 ">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "text-blue-500" : ""}
            >
              <Bold />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "text-blue-500" : ""}
            >
              <Italic />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "text-blue-500" : ""}
            >
              <Underline />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive("highlight") ? "text-blue-500" : ""}
            >
              <HighlighterIcon />
            </button>

            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "text-blue-500" : ""}
            >
              <StrikethroughIcon />
            </button>

            {/* <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
              }
            >
              <AlignLeft />
            </button>

            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" }) ? "text-blue-500" : ""
              }
            >
              <AlignCenter />
            </button>

            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" }) ? "text-blue-500" : ""
              }
            >
              <AlignRight />
            </button>
          */}

            <button
              onClick={() => onAIClick()}
              className={"hover:text-blue-500"}
            >
              <Sparkle />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditorExtension;
