'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Code, Link as LinkIcon, Undo, Redo, Strikethrough } from 'lucide-react'
import { useEffect } from 'react'

interface EditorProps {
    content: string
    onChange: (html: string) => void
    editable?: boolean
}

export default function Editor({ content, onChange, editable = true }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: content,
        editable: editable,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    })

    // Update content if it changes externally (e.g. initial load)
    // Be careful with infinite loops here, usually only need it for initial or reset
    // skipping for now as `content` prop is mostly for initial state in this usecase.

    if (!editor) {
        return null
    }

    return (
        <div className="border rounded-md bg-card text-card-foreground shadow-sm">
            <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-muted/50 sticky top-0 z-10 w-full">
                <Toggle
                    pressed={editor.isActive('bold')}
                    onPressedChange={() => editor.chain().focus().toggleBold().run()}
                    icon={<Bold className="w-4 h-4" />}
                    aria-label="Bold"
                />
                <Toggle
                    pressed={editor.isActive('italic')}
                    onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                    icon={<Italic className="w-4 h-4" />}
                    aria-label="Italic"
                />
                <Toggle
                    pressed={editor.isActive('strike')}
                    onPressedChange={() => editor.chain().focus().toggleStrike().run()}
                    icon={<Strikethrough className="w-4 h-4" />}
                    aria-label="Strikethrough"
                />
                <div className="w-px h-6 bg-border mx-1" />
                <Toggle
                    pressed={editor.isActive('heading', { level: 1 })}
                    onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    icon={<Heading1 className="w-4 h-4" />}
                    aria-label="Heading 1"
                />
                <Toggle
                    pressed={editor.isActive('heading', { level: 2 })}
                    onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    icon={<Heading2 className="w-4 h-4" />}
                    aria-label="Heading 2"
                />
                <div className="w-px h-6 bg-border mx-1" />
                <Toggle
                    pressed={editor.isActive('bulletList')}
                    onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                    icon={<List className="w-4 h-4" />}
                    aria-label="Bullet List"
                />
                <Toggle
                    pressed={editor.isActive('orderedList')}
                    onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                    icon={<ListOrdered className="w-4 h-4" />}
                    aria-label="Ordered List"
                />
                <div className="w-px h-6 bg-border mx-1" />
                <Toggle
                    pressed={editor.isActive('blockquote')}
                    onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                    icon={<Quote className="w-4 h-4" />}
                    aria-label="Blockquote"
                />
                <Toggle
                    pressed={editor.isActive('codeBlock')}
                    onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
                    icon={<Code className="w-4 h-4" />}
                    aria-label="Code Block"
                />

                <div className="flex-1" />

                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="p-2 rounded-md hover:bg-muted disabled:opacity-50"
                    type="button"
                >
                    <Undo className="w-4 h-4" />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="p-2 rounded-md hover:bg-muted disabled:opacity-50"
                    type="button"
                >
                    <Redo className="w-4 h-4" />
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    )
}

function Toggle({ pressed, onPressedChange, icon, "aria-label": label }: { pressed: boolean, onPressedChange: () => void, icon: React.ReactNode, "aria-label": string }) {
    return (
        <button
            type="button"
            onClick={onPressedChange}
            aria-label={label}
            className={`p-2 rounded-md transition-colors ${pressed ? 'bg-primary/20 text-primary' : 'hover:bg-muted text-muted-foreground'}`}
        >
            {icon}
        </button>
    )
}
