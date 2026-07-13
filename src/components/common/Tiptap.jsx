import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Heading1, Heading2, Italic, List, Pilcrow, Strikethrough, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const Tiptap = ({className="", onChange, content}) => {
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    onUpdate: ({editor}) => {
      const html = editor.getHTML();
      const text = html.replace(/<[^>]*>/g, "").trim();
      setCharCount(text?.length);
      onChange?.(html);
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

  useEffect(() => {
    if (!editor) return;

    if(content && editor.getHTML() !== content){
      editor.commands.setContent(content);
    }
    const text = (content ?? "").replace(/<[^>]*>/g, "").trim();
    setCharCount(text.length);
  }, [content, editor])


  return (
    <div>
      <div className="mb-4 rounded-lg border border-border bg-background p-4">
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none text-foreground [&_*]:text-foreground"
        />
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-muted-foreground">
            {charCount} characters
          </span>
          {charCount >= 20 ? (
            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              ✓ Good to go
            </span>
          ) : (
            <span className="text-xs font-medium text-destructive">
              {20 - charCount} more characters needed
            </span>
          )}
        </div>
      </div>

      {editor && (
        <FloatingMenu
          editor={editor}
          className="flex items-center gap-1 rounded-lg border border-border bg-div p-1 shadow-md"
        >
          <Button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            variant={
              editor.isActive("heading", { level: 1 }) ? "default" : "ghost"
            }
            size="sm"
            className="h-8 w-8"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            variant={
              editor.isActive("heading", { level: 2 }) ? "default" : "ghost"
            }
            size="sm"
            className="h-8 w-8"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            variant={editor.isActive("bulletList") ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            variant={
              !editor.isActive("heading") && !editor.isActive("bulletList")
                ? "default"
                : "ghost"
            }
            size="sm"
            className="h-8 w-8"
          >
            <Pilcrow className="h-4 w-4" />
          </Button>
        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu
          editor={editor}
          className="flex items-center gap-1 rounded-lg border border-border bg-div p-1 shadow-md"
        >
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant={editor.isActive("bold") ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive("italic") ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            variant={editor.isActive("strike") ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </BubbleMenu>
      )}
    </div>
  );
};

export default Tiptap;
