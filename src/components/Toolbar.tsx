import { type Editor } from "@tiptap/react";
import { Bold, Italic, List, ListOrdered, Heading2 } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

type Props = {
  editor: Editor | null;
};

export const Toolbar = ({ editor }: Props) => {
  if (!editor) return null;

  return (
    <div className="flex items-center w-full gap-1 p-2 bg-transparent border rounded-none border-input min-h-[50px]">
      {" "}
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="w-4 h-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="w-4 h-4" />
      </Toggle>
    </div>
  );
};
