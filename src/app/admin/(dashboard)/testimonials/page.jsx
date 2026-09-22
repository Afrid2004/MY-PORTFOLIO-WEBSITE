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
  FiStar,
} from "react-icons/fi";
import Swal from "sweetalert2";
import Spin from "@/components/loadings/Spin";
import ReorderList from "../components/reorder/ReorderList";
import WorkExperienceLoading from "../components/loadings/workExperienceLoading";
import Image from "next/image";

const TestimonialsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState("");

  const emptyFormData = {
    image: "",
    name: "",
    desc: "",
    designation: "",
    company: "",
    rating: 5,
    isVerified: false,
    status: true,
  };

  const [formData, setFormData] = useState({
    ...emptyFormData,
  });

  // Get all testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/testimonials", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch testimonials!");
      }

      setTestimonials(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reorder testimonials
  const handleReorder = async (reorderedTestimonials) => {
    setTestimonials(reorderedTestimonials);

    try {
      const res = await fetch("/api/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "testimonials",
          ids: reorderedTestimonials.map((item) => item._id),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update testimonial order!");
      }
    } catch (error) {
      setError(error.message);
      await fetchTestimonials();
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Search testimonials
  const filteredTestimonials = testimonials.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(searchValue) ||
      item.desc?.toLowerCase().includes(searchValue) ||
      item.designation?.toLowerCase().includes(searchValue) ||
      item.company?.toLowerCase().includes(searchValue)
    );
  });

  // Handle normal inputs
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle testimonial image upload
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

      // Upload directly to Cloudflare R2
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

      // Allow selecting same file again
      event.target.value = "";
    }
  };

  // Remove testimonial image
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // Create testimonial
  const handleCreate = () => {
    setError("");
    setEditingTestimonial(null);

    setFormData({
      ...emptyFormData,
    });

    setModalOpen(true);
  };

  // Edit testimonial
  const handleEdit = (testimonial) => {
    setError("");
    setEditingTestimonial(testimonial);

    setFormData({
      image: testimonial.image || "",
      name: testimonial.name || "",
      desc: testimonial.desc || "",
      designation: testimonial.designation || "",
      company: testimonial.company || "",
      rating: testimonial.rating ?? 5,
      isVerified: testimonial.isVerified ?? false,
      status: testimonial.status ?? true,
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

        image: formData.image.trim(),

        name: formData.name.trim(),

        desc: formData.desc.trim(),

        designation: formData.designation.trim(),

        company: formData.company.trim(),

        rating: Number(formData.rating),

        isVerified: formData.isVerified,

        status: formData.status,
      };

      let url = "/api/testimonials";
      let method = "POST";

      if (editingTestimonial) {
        url = `/api/testimonials/${editingTestimonial._id}`;
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

      const wasEditing = editingTestimonial;

      setModalOpen(false);
      setEditingTestimonial(null);

      setFormData({
        ...emptyFormData,
      });

      await fetchTestimonials();

      await Swal.fire({
        icon: "success",
        title: wasEditing ? "Testimonial Updated!" : "Testimonial Created!",
        text: wasEditing
          ? "Testimonial has been updated successfully."
          : "Testimonial has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Testimonial?",
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

      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        await Swal.fire({
          icon: "error",
          title: "Delete Failed!",
          text: data.message || "Failed to delete testimonial.",
        });

        return;
      }

      setTestimonials((prev) => prev.filter((item) => item._id !== id));

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Testimonial has been deleted successfully.",
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
          <h1 className="text-2xl font-semibold">Testimonials</h1>

          <p className="mt-1 text-sm text-base-content/45">
            Manage the testimonials displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
        >
          <FiPlus size={17} />
          Create Testimonial
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-xl border border-base-content/10 bg-base-100 px-3 py-2.5 sm:max-w-sm">
          <FiSearch size={16} className="shrink-0 text-base-content/35" />

          <input
            type="text"
            placeholder="Search testimonial..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/30"
          />
        </div>

        <div className="text-xs text-base-content/40">
          {filteredTestimonials.length} Testimonials
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-base-content/10 bg-base-100">
        {/* Table Header */}
        <div className="hidden grid-cols-12 border-b border-base-content/10 bg-base-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-base-content/35 md:grid">
          <div className="col-span-5">Testimonial</div>

          <div className="col-span-2">Rating</div>

          <div className="col-span-2">Verified</div>

          <div className="col-span-1">Status</div>

          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Testimonial List */}
        <div className="divide-y divide-base-content/10">
          {loading ? (
            <WorkExperienceLoading />
          ) : error && testimonials.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-error">{error}</p>
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
              <p className="text-sm font-medium text-base-content/50">
                No testimonial found
              </p>

              <p className="mt-1 text-xs text-base-content/30">
                {search
                  ? "No testimonial matches your search."
                  : "Create your first testimonial to get started."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
                >
                  <FiPlus size={17} />
                  Create Testimonial
                </button>
              )}
            </div>
          ) : (
            <ReorderList items={filteredTestimonials} onReorder={handleReorder}>
              {(testimonial, { attributes, listeners }) => (
                <div className="grid min-w-0 grid-cols-1 gap-5 overflow-hidden px-4 py-4 transition-colors hover:bg-base-content/[0.02] sm:px-5 sm:py-5 md:grid-cols-12 md:items-center md:gap-0">
                  {/* Testimonial */}
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

                        {/* Testimonial Image */}
                        <div className="hidden h-12 w-12 shrink-0 overflow-hidden rounded-full border border-base-content/10 bg-base-200 sm:block">
                          {testimonial.image ? (
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-base-content/25">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="break-words text-sm font-medium">
                            {testimonial.name}
                          </p>

                          {(testimonial.designation || testimonial.company) && (
                            <p className="mt-1 break-words text-xs text-primary">
                              {testimonial.designation}

                              {testimonial.designation &&
                                testimonial.company &&
                                " · "}

                              {testimonial.company}
                            </p>
                          )}

                          <p className="mt-1 line-clamp-2 text-xs text-base-content/40">
                            {testimonial.desc}
                          </p>
                        </div>
                      </div>

                      {/* Mobile Actions */}
                      <div className="flex shrink-0 items-center gap-2 md:hidden">
                        <button
                          type="button"
                          onClick={() => handleEdit(testimonial)}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(testimonial._id)}
                          disabled={deletingId === testimonial._id}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === testimonial._id ? (
                            <FiLoader size={15} className="animate-spin" />
                          ) : (
                            <FiTrash2 size={15} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="min-w-0 md:col-span-2">
                    <div className="flex min-w-0 items-center justify-between gap-3 md:block">
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                        Rating
                      </span>

                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <FiStar
                            key={idx}
                            size={13}
                            className={
                              idx + 1 <= testimonial.rating
                                ? "fill-primary text-primary"
                                : "text-base-content/20"
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Verified */}
                  <div className="min-w-0 md:col-span-2">
                    <div className="flex min-w-0 items-center justify-between gap-3 md:block">
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                        Verified
                      </span>

                      <div className="shrink-0">
                        {testimonial.isVerified ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-base-content/10 bg-base-content/5 px-2.5 py-1 text-[11px] font-medium text-base-content/40">
                            Not Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Active Status */}
                  <div className="min-w-0 md:col-span-1">
                    <div className="flex min-w-0 items-center justify-between gap-3 md:block">
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                        Status
                      </span>

                      <div className="shrink-0">
                        {testimonial.status ? (
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
                  <div className="hidden items-center justify-end gap-2 md:col-span-2 md:flex">
                    <button
                      type="button"
                      onClick={() => handleEdit(testimonial)}
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                      title="Edit"
                    >
                      <FiEdit2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(testimonial._id)}
                      disabled={deletingId === testimonial._id}
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === testimonial._id ? (
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
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all duration-200 ${
          modalOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-2xl transition-transform duration-300 ${
            modalOpen ? "scale-100" : "scale-95"
          }`}
        >
          {/* Modal Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-base-content/10 bg-base-100 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold">
                {editingTestimonial
                  ? "Update Testimonial"
                  : "Create Testimonial"}
              </h2>

              <p className="mt-0.5 text-xs text-base-content/40">
                {editingTestimonial
                  ? "Update the selected testimonial information."
                  : "Add a new testimonial to your portfolio."}
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

              {/* Name */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Designation + Company */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Designation */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Designation
                  </label>

                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. Project Manager"
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. ABC Company"
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                  />
                </div>
              </div>

              {/* Testimonial Image */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Testimonial Image
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
                      <Image
                        src={formData.image}
                        alt="Testimonial preview"
                        width={400}
                        height={400}
                        className="mx-auto h-48 w-48 rounded-full object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Testimonial Description
                </label>

                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write the testimonial..."
                  className="w-full resize-none rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Rating
                </label>

                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40"
                >
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>

              {/* Verified */}
              <div className="flex items-center justify-between rounded-xl border border-base-content/10 bg-base-200 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Verified Testimonial</p>

                  <p className="mt-0.5 text-[11px] text-base-content/40">
                    Mark this testimonial as verified.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="isVerified"
                  checked={formData.isVerified}
                  onChange={handleChange}
                  className="toggle toggle-primary"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center justify-between rounded-xl border border-base-content/10 bg-base-200 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Active Testimonial</p>

                  <p className="mt-0.5 text-[11px] text-base-content/40">
                    Show this testimonial on your portfolio.
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
                  className="inline-flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-content transition-all active:scale-[.95] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Spin />

                      {editingTestimonial ? "Updating..." : "Creating..."}
                    </>
                  ) : editingTestimonial ? (
                    "Update Testimonial"
                  ) : (
                    "Create Testimonial"
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

export default TestimonialsPage;
