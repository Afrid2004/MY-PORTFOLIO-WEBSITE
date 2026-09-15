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

const CertificationsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [certifications, setCertifications] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    duration: "",
    credential: "",
    image: "",
    description: "",
    highlights: [""],
    technologies: [""],
    status: true,
  });

  // Get all certifications
  const fetchCertifications = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/certifications", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch certifications!");
      }

      setCertifications(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reorder certifications
  const handleReorder = async (reorderedCertifications) => {
    setCertifications(reorderedCertifications);

    try {
      const res = await fetch("/api/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "certifications",
          ids: reorderedCertifications.map((item) => item._id),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update certification order!",
        );
      }
    } catch (error) {
      setError(error.message);

      await fetchCertifications();
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  // Search certifications
  const filteredCertifications = certifications.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item.title?.toLowerCase().includes(searchValue) ||
      item.issuer?.toLowerCase().includes(searchValue) ||
      item.credential?.toLowerCase().includes(searchValue)
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

  // Handle certificate image upload
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

      // Get temporary upload URL from our API
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

      // Save image URL in formData
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

  // Handle certificate image remove
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

  // Handle array change
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

  // Create certification
  const handleCreate = () => {
    setError("");
    setEditingCertification(null);

    setFormData({
      title: "",
      issuer: "",
      duration: "",
      credential: "",
      image: "",
      description: "",
      highlights: [""],
      technologies: [""],
      status: true,
    });

    setModalOpen(true);
  };

  // Edit certification
  const handleEdit = (certification) => {
    setError("");
    setEditingCertification(certification);

    setFormData({
      title: certification.title || "",
      issuer: certification.issuer || "",
      duration: certification.duration || "",
      credential: certification.credential || "",
      image: certification.image || "",
      description: certification.description || "",
      highlights:
        certification.highlights?.length > 0 ? certification.highlights : [""],
      technologies:
        certification.technologies?.length > 0
          ? certification.technologies
          : [""],
      status: certification.status ?? true,
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
        issuer: formData.issuer.trim(),
        duration: formData.duration.trim(),
        credential: formData.credential.trim(),
        image: formData.image.trim(),
        description: formData.description.trim(),

        highlights: formData.highlights
          .map((item) => item.trim())
          .filter(Boolean),

        technologies: formData.technologies
          .map((item) => item.trim())
          .filter(Boolean),
      };

      let url = "/api/certifications";
      let method = "POST";

      if (editingCertification) {
        url = `/api/certifications/${editingCertification._id}`;
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

      const wasEditing = editingCertification;

      setModalOpen(false);
      setEditingCertification(null);

      setFormData({
        title: "",
        issuer: "",
        duration: "",
        credential: "",
        image: "",
        description: "",
        highlights: [""],
        technologies: [""],
        status: true,
      });

      await fetchCertifications();

      await Swal.fire({
        icon: "success",
        title: wasEditing ? "Certification Updated!" : "Certification Created!",
        text: wasEditing
          ? "Certification has been updated successfully."
          : "Certification has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete certification
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Certification?",
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

      const res = await fetch(`/api/certifications/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        await Swal.fire({
          icon: "error",
          title: "Delete Failed!",
          text: data.message || "Failed to delete certification.",
        });

        return;
      }

      setCertifications((prev) => prev.filter((item) => item._id !== id));

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Certification has been deleted successfully.",
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
          <h1 className="text-2xl font-semibold">Certifications</h1>

          <p className="mt-1 text-sm text-base-content/45">
            Manage the certifications displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
        >
          <FiPlus size={17} />
          Create Certification
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-xl border border-base-content/10 bg-base-100 px-3 py-2.5 sm:max-w-sm">
          <FiSearch size={16} className="shrink-0 text-base-content/35" />

          <input
            type="text"
            placeholder="Search certification..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/30"
          />
        </div>

        <div className="text-xs text-base-content/40">
          {filteredCertifications.length} Certifications
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-base-content/10 bg-base-100">
        {/* Table Header */}
        <div className="hidden grid-cols-12 border-b border-base-content/10 bg-base-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-base-content/35 md:grid">
          <div className="col-span-5">Certification</div>

          <div className="col-span-3">Issuer</div>

          <div className="col-span-2">Status</div>

          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Certification List */}
        <div className="divide-y divide-base-content/10">
          {loading ? (
            <WorkExperienceLoading />
          ) : error && certifications.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-error">{error}</p>
            </div>
          ) : filteredCertifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
              <p className="text-sm font-medium text-base-content/50">
                No certification found
              </p>

              <p className="mt-1 text-xs text-base-content/30">
                {search
                  ? "No certification matches your search."
                  : "Create your first certification to get started."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
                >
                  <FiPlus size={17} />
                  Create Certification
                </button>
              )}
            </div>
          ) : (
            <ReorderList
              items={filteredCertifications}
              onReorder={handleReorder}
            >
              {(certification, { attributes, listeners }) => (
                <div className="grid min-w-0 grid-cols-1 gap-5 overflow-hidden px-4 py-4 transition-colors hover:bg-base-content/[0.02] sm:px-5 sm:py-5 md:grid-cols-12 md:items-center md:gap-0">
                  {/* Certification */}
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
                          <p className="break-words text-sm font-medium">
                            {certification.title}
                          </p>

                          <p className="mt-1 break-words text-xs text-primary">
                            {certification.issuer}
                          </p>

                          <p className="mt-0.5 break-words text-[11px] text-base-content/35">
                            Certification #{String(certification._id).slice(-6)}
                          </p>
                        </div>
                      </div>

                      {/* Mobile Actions */}
                      <div className="flex shrink-0 items-center gap-2 md:hidden">
                        <button
                          type="button"
                          onClick={() => handleEdit(certification)}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(certification._id)}
                          disabled={deletingId === certification._id}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === certification._id ? (
                            <FiLoader size={15} className="animate-spin" />
                          ) : (
                            <FiTrash2 size={15} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Issuer */}
                  <div className="min-w-0 md:col-span-3">
                    <div className="flex min-w-0 items-center justify-between gap-3 md:block">
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                        Issuer
                      </span>

                      <div className="min-w-0 flex-1 text-right md:text-left">
                        <p className="break-words text-xs text-base-content/65">
                          {certification.issuer}
                        </p>

                        <p className="mt-1 text-[11px] text-base-content/35">
                          {certification.duration}
                        </p>
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
                        {certification.status ? (
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
                      onClick={() => handleEdit(certification)}
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                      title="Edit"
                    >
                      <FiEdit2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(certification._id)}
                      disabled={deletingId === certification._id}
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === certification._id ? (
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
                {editingCertification
                  ? "Update Certification"
                  : "Create Certification"}
              </h2>

              <p className="mt-0.5 text-xs text-base-content/40">
                {editingCertification
                  ? "Update the selected certification information."
                  : "Add a new certification to your portfolio."}
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

              {/* Title */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Certification Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Professional Web Application Development using Laravel & React"
                  className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Issuer */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Issuer
                </label>

                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleChange}
                  placeholder="e.g. ISDB-BISEW IT Scholarship Project"
                  className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Duration + Credential */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Duration */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Duration
                  </label>

                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 2026"
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                  />
                </div>

                {/* Credential */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Credential
                  </label>

                  <input
                    type="text"
                    name="credential"
                    value={formData.credential}
                    onChange={handleChange}
                    placeholder="e.g. Certificate"
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                  />
                </div>
              </div>

              {/* Certificate Image */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Certificate Image
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
                        alt="Certificate preview"
                        className="h-48 w-full rounded-lg object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write a short description about this certification..."
                  className="w-full resize-none rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Highlights */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-medium text-base-content/70">
                    Key Highlights
                  </label>

                  <button
                    type="button"
                    onClick={() => addArrayItem("highlights")}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-primary"
                  >
                    <FiPlus size={14} />
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.highlights.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayChange("highlights", index, e.target.value)
                        }
                        placeholder={`Highlight ${index + 1}`}
                        className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                      />

                      {formData.highlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem("highlights", index)}
                          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/10 text-error transition-all active:scale-[.95]"
                        >
                          <FiX size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-medium text-base-content/70">
                    Technologies
                  </label>

                  <button
                    type="button"
                    onClick={() => addArrayItem("technologies")}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-primary"
                  >
                    <FiPlus size={14} />
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.technologies.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayChange(
                            "technologies",
                            index,
                            e.target.value,
                          )
                        }
                        placeholder={`Technology ${index + 1}`}
                        className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                      />

                      {formData.technologies.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem("technologies", index)}
                          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/10 text-error transition-all active:scale-[.95]"
                        >
                          <FiX size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between rounded-xl border border-base-content/10 bg-base-200 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Active Certification</p>

                  <p className="mt-0.5 text-[11px] text-base-content/40">
                    Show this certification on your portfolio.
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

                      {editingCertification ? "Updating..." : "Creating..."}
                    </>
                  ) : editingCertification ? (
                    "Update Certification"
                  ) : (
                    "Create Certification"
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

export default CertificationsPage;
