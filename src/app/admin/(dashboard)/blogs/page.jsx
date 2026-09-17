"use client";

import React, { useEffect, useState } from "react";

import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiSearch,
  FiLoader,
  FiMenu,
} from "react-icons/fi";

import Swal from "sweetalert2";

import Spin from "@/components/loadings/Spin";
import ReorderList from "../components/reorder/ReorderList";
import WorkExperienceLoading from "../components/loadings/workExperienceLoading";
import TiptapEditor from "../components/editor/TiptapEditor";

const categories = [
  "Laravel",
  "React.js",
  "Next.js",
  "JavaScript",
  "PHP",
  "MongoDB",
  "Web Development",
  "Database",
  "Career",
  "Other",
];

const BlogsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    image: "",
    tags: [""],
    readTime: "",
    publishedAt: new Date().toISOString().split("T")[0],
    keywords: [""],
    status: true,
  });

  // Get all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/blogs", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch blogs!");
      }

      setBlogs(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reorder blogs
  const handleReorder = async (reorderedBlogs) => {
    setBlogs(reorderedBlogs);

    try {
      const res = await fetch("/api/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "blogs",
          ids: reorderedBlogs.map((item) => item._id),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update blog order!");
      }
    } catch (error) {
      setError(error.message);

      await fetchBlogs();
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Search blogs
  const filteredBlogs = blogs.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item.title?.toLowerCase().includes(searchValue) ||
      item.category?.toLowerCase().includes(searchValue) ||
      item.excerpt?.toLowerCase().includes(searchValue) ||
      item.slug?.toLowerCase().includes(searchValue)
    );
  });

  // Handle normal inputs
  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    const nameValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      if (name === "title") {
        return {
          ...prev,
          title: value,
          slug: generateSlug(value),
        };
      }
      return {
        ...prev,
        [name]: nameValue,
      };
    });
  };

  const generateSlug = (text) => {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // শুধু letters, numbers, space, hyphen রাখে
      .replace(/\s+/g, "-") // spaces → hyphen
      .replace(/-+/g, "-") // multiple hyphen → single hyphen
      .replace(/^-+|-+$/g, ""); // শুরু/শেষের hyphen remove
  };

  // Handle blog image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    try {
      setError("");
      setUploadingImage(true);

      // Check image size
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image size must be less than 5 MB!");
      }

      // Check image type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPG, PNG and WebP images are allowed!");
      }

      // Get temporary upload URL
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

      // Upload image directly to Cloudflare R2
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

      // Create public image URL
      const imageUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${urlData.key}`;

      // Save image URL
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } catch (error) {
      setError(error.message || "Failed to upload image!");
    } finally {
      setUploadingImage(false);

      // Allow selecting the same file again
      event.target.value = "";
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // Add array item
  const addArrayItem = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: [...prev[name], ""],
    }));
  };

  // Handle tags change
  const handleArrayChange = (name, index, value) => {
    setFormData((prev) => {
      const items = [...prev[name]];

      items[index] = value;

      return {
        ...prev,
        [name]: items,
      };
    });
  };

  // Remove array item
  const removeArrayItem = (name, index) => {
    setFormData((prev) => {
      if (prev[name].length === 1) {
        return prev;
      }

      return {
        ...prev,
        [name]: prev[name].filter((_, itemIndex) => itemIndex !== index),
      };
    });
  };

  // Create blog
  const handleCreate = () => {
    setError("");
    setEditingBlog(null);

    setFormData({
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      content: "",
      image: "",
      tags: [""],
      readTime: "",
      publishedAt: new Date().toISOString().split("T")[0],
      keywords: [""],
      status: true,
    });

    setModalOpen(true);
  };

  // Edit blog
  const handleEdit = (blog) => {
    setError("");
    setEditingBlog(blog);

    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      image: blog.image || "",
      tags: blog.tags?.length > 0 ? blog.tags : [""],
      readTime: blog.readTime || "",
      publishedAt: blog.publishedAt
        ? new Date(blog.publishedAt).toISOString().split("T")[0]
        : "",
      keywords: blog?.keywords?.length > 0 ? blog.keywords : [""],
      status: blog.status ?? true,
    });

    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    if (submitting || uploadingImage) {
      return;
    }

    setModalOpen(false);
  };

  // Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      setSubmitting(true);

      const cleanedFormData = {
        ...formData,

        title: formData.title.trim(),
        slug: formData.slug.trim(),
        category: formData.category.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        image: formData.image.trim(),
        readTime: formData.readTime.trim(),
        tags: formData.tags.map((item) => item.trim()).filter(Boolean),
        keywords: formData.keywords.map((item) => item.trim()).filter(Boolean),
      };

      let url = "/api/blogs";
      let method = "POST";

      if (editingBlog) {
        url = `/api/blogs/${editingBlog._id}`;
        method = "PATCH";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedFormData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong!");
        return;
      }

      const wasEditing = editingBlog;

      setModalOpen(false);
      setEditingBlog(null);

      setFormData({
        title: "",
        slug: "",
        category: "",
        excerpt: "",
        content: "",
        image: "",
        tags: [""],
        readTime: "",
        publishedAt: "",
        keywords: [""],
        status: true,
      });

      await fetchBlogs();

      await Swal.fire({
        icon: "success",
        title: wasEditing ? "Blog Updated!" : "Blog Created!",
        text: wasEditing
          ? "Blog has been updated successfully."
          : "Blog has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Blog?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setDeletingId(id);

      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        await Swal.fire({
          icon: "error",
          title: "Delete Failed!",
          text: data.message || "Failed to delete blog.",
        });

        return;
      }

      setBlogs((prev) => prev.filter((item) => item._id !== id));

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Blog has been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message,
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Blogs</h1>

          <p className="mt-1 text-sm text-base-content/45">
            Manage the blog posts displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
        >
          <FiPlus size={17} />
          Create Blog
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-xl border border-base-content/10 bg-base-100 px-3 py-2.5 sm:max-w-sm">
          <FiSearch size={16} className="shrink-0 text-base-content/35" />

          <input
            type="text"
            placeholder="Search blog..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/30"
          />
        </div>

        <div className="text-xs text-base-content/40">
          {filteredBlogs.length} Blogs
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-base-content/10 bg-base-100">
        {/* Table Header */}
        <div className="hidden grid-cols-12 border-b border-base-content/10 bg-base-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-base-content/35 md:grid">
          <div className="col-span-5">Blog</div>

          <div className="col-span-2">Category</div>

          <div className="col-span-2">Status</div>

          <div className="col-span-3 text-right">Action</div>
        </div>

        {/* Blog List */}
        <div className="divide-y divide-base-content/10">
          {loading ? (
            <WorkExperienceLoading />
          ) : error && blogs.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-error">{error}</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
              <p className="text-sm font-medium text-base-content/50">
                No blog found
              </p>

              <p className="mt-1 text-xs text-base-content/30">
                {search
                  ? "No blog matches your search."
                  : "Create your first blog to get started."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
                >
                  <FiPlus size={17} />
                  Create Blog
                </button>
              )}
            </div>
          ) : (
            <ReorderList items={filteredBlogs} onReorder={handleReorder}>
              {(blog, { attributes, listeners }) => (
                <div className="grid min-w-0 grid-cols-1 gap-5 overflow-hidden px-4 py-4 transition-colors hover:bg-base-content/[0.02] sm:px-5 sm:py-5 md:grid-cols-12 md:items-center md:gap-0">
                  {/* Blog */}
                  <div className="min-w-0 md:col-span-5">
                    <div className="flex min-w-0 items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        {/* Drag Handle */}
                        <button
                          type="button"
                          {...attributes}
                          {...listeners}
                          className="hidden h-8 w-8 shrink-0 cursor-grab items-center justify-center rounded-lg text-base-content/25 transition-colors hover:bg-base-content/5 hover:text-base-content/60 active:cursor-grabbing md:flex"
                          title="Drag to reorder"
                        >
                          <FiMenu size={16} />
                        </button>

                        <div className="min-w-0">
                          <p className="break-words text-sm font-medium mb-2 text-primary">
                            {blog.title}
                          </p>

                          <p className="mb-2 line-clamp-1 break-words text-xs text-base-content/70">
                            {blog.excerpt}
                          </p>

                          <p className="break-words text-[11px] text-base-content/35">
                            Blog #{String(blog._id).slice(-6)}
                          </p>
                        </div>
                      </div>

                      {/* Mobile Actions */}
                      <div className="flex shrink-0 items-center gap-2 md:hidden">
                        <button
                          type="button"
                          onClick={() => handleEdit(blog)}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(blog._id)}
                          disabled={deletingId === blog._id}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === blog._id ? (
                            <FiLoader size={15} className="animate-spin" />
                          ) : (
                            <FiTrash2 size={15} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="min-w-0 md:col-span-2">
                    <div className="flex min-w-0 items-center justify-between gap-3 md:block">
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                        Category
                      </span>

                      <div className="min-w-0 flex-1 text-right md:text-left">
                        <span className="inline-flex max-w-full items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="min-w-0 md:col-span-2">
                    <div className="flex min-w-0 items-center justify-between gap-3 md:block">
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                        Status
                      </span>

                      <div className="shrink-0">
                        {blog.status ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-base-content/10 bg-base-content/5 px-2.5 py-1 text-[11px] font-medium text-base-content/40">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Actions */}
                  <div className="hidden items-center justify-end gap-2 md:col-span-3 md:flex">
                    <button
                      type="button"
                      onClick={() => handleEdit(blog)}
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                      title="Edit"
                    >
                      <FiEdit2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(blog._id)}
                      disabled={deletingId === blog._id}
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === blog._id ? (
                        <FiLoader size={15} className="animate-spin" />
                      ) : (
                        <FiTrash2 size={15} />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </ReorderList>
          )}
        </div>
      </div>

      {/* Create / Update Modal */}
      <div
        onClick={handleCloseModal}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all duration-200 ${modalOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-2xl transition-transform duration-300 ${modalOpen ? "scale-100" : "scale-95"}`}
        >
          {/* Modal Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-base-content/10 bg-base-100 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold">
                {editingBlog ? "Update Blog" : "Create Blog"}
              </h2>

              <p className="mt-0.5 text-xs text-base-content/40">
                {editingBlog
                  ? "Update the selected blog information."
                  : "Create a new blog for your portfolio."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseModal}
              disabled={submitting || uploadingImage}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-base-content/40 transition-colors hover:bg-base-content/5 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Form */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-5 p-5">
              {/* Error */}
              {error && (
                <div className="rounded-lg border border-error/20 bg-error/10 px-3.5 py-3">
                  <p className="text-xs font-medium text-error">{error}</p>
                </div>
              )}

              {/* Title + Category */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Title */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Blog Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Building Modern Web Apps with Laravel"
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                  />
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full cursor-pointer rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40"
                  >
                    <option value="">Select category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Slug */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Slug
                </label>

                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e.g. building-modern-web-apps-with-laravel"
                  className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />

                <p className="mt-1.5 text-[11px] text-base-content/35">
                  Used for the blog URL.
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Excerpt
                </label>

                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Write a short summary of the blog..."
                  className="w-full resize-none rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Content */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Content
                </label>

                <TiptapEditor
                  value={formData.content}
                  onChange={(content) =>
                    setFormData((prev) => ({
                      ...prev,
                      content,
                    }))
                  }
                />

                <p className="mt-1.5 text-[11px] text-base-content/35">
                  Use the toolbar to format your blog content.
                </p>
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Blog Image
                </label>

                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageUpload}
                  disabled={uploadingImage || submitting}
                  className="file-input w-full rounded-lg border border-base-content/10 bg-base-200 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                />

                <p className="mt-1.5 text-[11px] text-base-content/35">
                  JPG, PNG or WebP. Maximum 5 MB.
                </p>

                {/* Uploading */}
                {uploadingImage && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-primary">
                    <FiLoader size={14} className="animate-spin" />
                    Uploading image...
                  </div>
                )}

                {/* Image Preview */}
                {formData.image && !uploadingImage && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-base-content/10 bg-base-200">
                    <div className="flex items-center justify-between border-b border-base-content/10 px-4 py-3">
                      <p className="text-xs font-medium text-base-content/60">
                        Current Image
                      </p>

                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        disabled={submitting}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-error/20 bg-error/10 px-3 py-1.5 text-xs font-medium text-error transition-colors hover:bg-error/15 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <FiTrash2 size={13} />
                        Remove Image
                      </button>
                    </div>

                    <div className="p-4">
                      <img
                        src={formData.image}
                        alt="Blog preview"
                        className="h-48 w-full rounded-lg object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Read Time + Published Date */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Read Time */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Read Time
                  </label>

                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="e.g. 6 min read"
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                  />
                </div>

                {/* Published Date */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Published Date
                  </label>

                  <input
                    type="date"
                    name="publishedAt"
                    value={formData.publishedAt}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-medium text-base-content/70">
                    Tags
                  </label>

                  <button
                    type="button"
                    onClick={() => addArrayItem("tags")}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-primary"
                  >
                    <FiPlus size={14} />
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.tags.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayChange("tags", index, e.target.value)
                        }
                        placeholder={`Tag ${index + 1}`}
                        className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                      />

                      {formData.tags.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem("tags", index)}
                          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/10 text-error transition-all active:scale-[.95]"
                        >
                          <FiX size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO */}
              <div className="rounded-xl border border-base-content/10 bg-base-200/40 p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold">SEO Settings</h3>

                  <p className="mt-1 text-[11px] text-base-content/40">
                    Optimize this blog for search engines.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Keywords */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-xs font-medium text-base-content/70">
                        SEO Keywords
                      </label>
                      <button
                        type="button"
                        onClick={() => addArrayItem("keywords")}
                        className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-primary"
                      >
                        <FiPlus size={14} />
                        Add
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formData.keywords.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleArrayChange(
                                "keywords",
                                index,
                                e.target.value,
                              )
                            }
                            placeholder={`Keyword ${index + 1}`}
                            className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                          />

                          {formData.keywords.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeArrayItem("keywords", index)}
                              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/10 text-error transition-all active:scale-[.95]"
                            >
                              <FiX size={15} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-3 rounded-xl border border-base-content/10 bg-base-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium">Blog Status</p>

                  <p className="mt-0.5 text-[11px] text-base-content/40">
                    Choose whether this blog is a draft or published.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                  className="toggle toggle-primary"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-base-content/10 pt-5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting || uploadingImage}
                  className="cursor-pointer rounded-lg border border-base-content/10 px-4 py-2.5 text-sm text-base-content/55 transition-colors hover:bg-base-content/5 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="inline-flex min-w-32 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-content transition-all active:scale-[.95] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Spin />

                      {editingBlog ? "Updating..." : "Creating..."}
                    </>
                  ) : editingBlog ? (
                    "Update Blog"
                  ) : (
                    "Create Blog"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
