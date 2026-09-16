"use client";

import React, { useRef, useState } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiImage,
  FiCode,
  FiLoader,
  FiType,
  FiList,
  FiMessageSquare,
  FiMenu,
} from "react-icons/fi";

const TiptapEditor = ({ value, onChange }) => {
  const fileInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],

    content: value || "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  // Add Link
  const handleAddLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Enter URL", previousUrl || "https://");

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
        target: "_blank",
      })
      .run();
  };

  // Upload Image
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadingImage(true);

      // Max 5MB
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image size must be less than 5 MB!");
      }

      // Allowed image types
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG and WebP images are allowed!");
      }

      // Get R2 Presigned Upload URL
      const urlResponse = await fetch("/api/upload/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      const urlData = await urlResponse.json();

      if (!urlResponse.ok) {
        throw new Error(urlData.message || "Failed to prepare image upload!");
      }

      // Upload Image to Cloudflare R2
      const uploadResponse = await fetch(urlData.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image to Cloudflare R2!");
      }

      // Public Image URL
      const imageUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${urlData.key}`;

      // Insert Image into Tiptap
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
        })
        .run();
    } catch (error) {
      alert(error.message || "Failed to upload image!");
    } finally {
      setUploadingImage(false);

      // Reset input
      event.target.value = "";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-base-content/10 bg-base-200">
      {/* ==============================
          TOOLBAR
      ============================== */}
      <div className="flex flex-wrap items-center gap-1 border-b border-base-content/10 bg-base-300 p-2">
        {/* Bold */}
        <button
          type="button"
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded-md p-2 transition ${
            editor.isActive("bold")
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <FiBold size={18} />
        </button>

        {/* Italic */}
        <button
          type="button"
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded-md p-2 transition ${
            editor.isActive("italic")
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <FiItalic size={18} />
        </button>

        {/* Underline */}
        <button
          type="button"
          title="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`rounded-md p-2 transition ${
            editor.isActive("underline")
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <FiUnderline size={18} />
        </button>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-base-content/10" />

        {/* Paragraph */}
        <button
          type="button"
          title="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`rounded-md p-2 transition ${
            editor.isActive("paragraph")
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <FiType size={18} />
        </button>

        {/* Heading 2 */}
        <button
          type="button"
          title="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`rounded-md p-2 transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <span className="text-xs font-bold">H2</span>
        </button>

        {/* Heading 3 */}
        <button
          type="button"
          title="Heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`rounded-md p-2 transition ${
            editor.isActive("heading", { level: 3 })
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <span className="text-xs font-bold">H3</span>
        </button>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-base-content/10" />

        {/* Bullet List */}
        <button
          type="button"
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded-md p-2 transition ${
            editor.isActive("bulletList")
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <FiList size={18} />
        </button>

        {/* Numbered List */}
        <button
          type="button"
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded-md p-2 transition ${
            editor.isActive("orderedList")
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <FiMenu size={18} />
        </button>

        {/* Blockquote */}
        <button
          type="button"
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`rounded-md p-2 transition ${
            editor.isActive("blockquote")
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <FiMessageSquare size={18} />
        </button>

        {/* Code Block */}
        <button
          type="button"
          title="Code Block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`rounded-md p-2 transition ${
            editor.isActive("codeBlock")
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <FiCode size={18} />
        </button>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-base-content/10" />

        {/* Link */}
        <button
          type="button"
          title="Add Link"
          onClick={handleAddLink}
          className={`rounded-md p-2 transition ${
            editor.isActive("link")
              ? "bg-primary text-primary-content"
              : "text-base-content hover:bg-base-content/10"
          }`}
        >
          <FiLink size={18} />
        </button>

        {/* Image */}
        <button
          type="button"
          title="Insert Image"
          disabled={uploadingImage}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 rounded-md p-2 text-base-content transition hover:bg-base-content/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploadingImage ? (
            <FiLoader size={18} className="animate-spin" />
          ) : (
            <FiImage size={18} />
          )}
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* ==============================
          EDITOR
      ============================== */}
      <EditorContent
        editor={editor}
        className="tiptap-editor min-h-[400px] p-5"
      />
    </div>
  );
};

export default TiptapEditor;
