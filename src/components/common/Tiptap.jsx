import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Heading1, Heading2, Italic, List, Pilcrow, Strikethrough, X } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const MAX_CHARS = 2000;
const MIN_CHARS = 20;

const MenuButton = ({ onClick, active, children }) => (
  <Button
    type="button"
    onClick={onClick}
    size="sm"
    className={cn(
      "h-8 w-8 rounded-lg transition-all",
      active
        ? "bg-[#1a1814] text-white hover:bg-[#272420]"
        : "bg-transparent text-[#6b6966] hover:bg-[#f0ede6] hover:text-[#1a1814]"
    )}
  >
    {children}
  </Button>
);

const Tiptap = ({ className = "", onChange, content }) => {
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = html.replace(/<[^>]*>/g, "").trim();
      setCharCount(text.length);
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class: [
          "prose prose-sm max-w-none focus:outline-none outline-none border-none",
          "text-[#1a1814] [&_*]:text-[#1a1814]",
          "[&_h1]:text-[18px] [&_h1]:font-bold [&_h1]:tracking-tight",
          "[&_h2]:text-[16px] [&_h2]:font-semibold",
          "[&_ul]:list-disc [&_ul]:pl-4",
          "[&_p]:leading-relaxed",
          className,
        ].join(" "),
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
    const text = (content ?? "").replace(/<[^>]*>/g, "").trim();
    setCharCount(text.length);
  }, [content, editor]);

  const menuClass =
    "flex items-center gap-0.5 rounded-[10px] border border-black/[0.08] bg-white p-1 shadow-[0_4px_16px_rgba(0,0,0,0.1)]";

  return (
    <div className="relative">
      {/* Editor box */}
      <div
        className={cn(
          "relative rounded-[12px] border border-black/[0.1] bg-[#faf9f7]",
          "min-h-[440px]",
          "transition-all focus-within:border-[#D85A30] focus-within:bg-white",
          "focus-within:shadow-[0_0_0_3px_rgba(216,90,48,0.11)]",
          "cursor-text"
          
        )}
        onClick={() => editor?.commands.focus()}
      >
        <EditorContent
          editor={editor}
          className="px-4 pt-4 pb-10 text-[14px] text-[#1a1814]"
        />

        {/* Footer bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-2.5 border-t border-black/[0.06]">
          <span className="text-[11.5px] text-[#9a9590]">
            {charCount} / {MAX_CHARS}
          </span>
          {charCount >= MIN_CHARS ? (
            <span className="flex items-center gap-1 text-[11.5px] font-medium text-[#3B6D11]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Good to go
            </span>
          ) : (
            <span className="text-[11.5px] font-medium text-[#D85A30]">
              {MIN_CHARS - charCount} more needed
            </span>
          )}
        </div>
      </div>

      {/* Floating menu — appears on empty line */}
      {editor && (
        <FloatingMenu editor={editor} className={menuClass}>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
          >
            <Heading1 className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            active={
              !editor.isActive("heading") && !editor.isActive("bulletList")
            }
          >
            <Pilcrow className="h-4 w-4" />
          </MenuButton>
        </FloatingMenu>
      )}

      {/* Bubble menu — appears on text selection */}
      {editor && (
        <BubbleMenu editor={editor} className={menuClass}>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic className="h-4 w-4" />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
          >
            <Strikethrough className="h-4 w-4" />
          </MenuButton>
        </BubbleMenu>
      )}
    </div>
  );
};

export default Tiptap;
