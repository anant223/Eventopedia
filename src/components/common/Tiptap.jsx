import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Heading1, Heading2, Italic, Pilcrow, Strikethrough, X } from "lucide-react";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";

const Tiptap = ({ className="", setClose }) => {
  const {setValue} = useFormContext()
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({editor}) => {
      setValue("desc", editor.getHTML(), {shouldValidate: true})
    },
    editorProps: {
      attributes: {
        class: [
          "prose",
          "prose-sm",
          "sm:prose",
          "lg:prose-lg",
          "xl:prose-xl",
          "max-w-none",
          "focus:outline-none",
          "border-none",
          "outline-none",
          className,
        ].join(" "),
      },
    },
  });


  return (
    <div className="w-full text-text p-4 bg-[#232c33] font-roboto rounded-2xl">
      <div className="flex justify-between items-center p-4">
        <h1 className=" font-semibold">Description :</h1>
        <button onClick={setClose} className="p-2 bg-gray-700 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[200px] px-2 py-3 bg-[#0f1010] rounded-lg border border-gray-700"
      />

      {/* Floating Menu for block-level formatting */}
      <FloatingMenu
        editor={editor}
        className="flex items-center gap-1 p-1 bg-[#1a1f23] rounded-lg shadow-lg"
      >
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-white/15 text-white"
              : "bg-gray-700 text-text"
          }
        >
          <Heading1 />
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-white/15 text-white"
              : "bg-gray-700 text-text"
          }
        >
          <Heading2 />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "bg-white/15 text-white"
              : "bg-gray-700 text-text"
          }
        >
          L
        </Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            !editor.isActive("heading") && !editor.isActive("bulletList")
              ? "bg-white/15 text-white"
              : "bg-gray-700 text-text"
          }
        >
          <Pilcrow />
        </Button>
      </FloatingMenu>

      {/* Bubble Menu for inline formatting */}
      <BubbleMenu
        editor={editor}
        className="flex items-center gap-1 p-1 bg-[#1a1f23] rounded-lg shadow-lg"
      >
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "bg-white/15 text-white"
              : "bg-gray-700 text-text"
          }
        >
          <Bold />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "bg-white/15 text-white"
              : "bg-gray-700 text-text"
          }
        >
          <Italic />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? "bg-white/15 text-white"
              : "bg-gray-700 text-text"
          }
        >
          <Strikethrough />
        </Button>
      </BubbleMenu>
    </div>
  );
};

export default Tiptap;
