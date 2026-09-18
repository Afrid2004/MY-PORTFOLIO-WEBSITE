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
import Image from "next/image";

const ProjectsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const formatDate = (date) => {
    if (!date) return "No date";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const emptyTechnology = {
    name: "",
    icon: "",
    color: "",
  };

  const [formData, setFormData] = useState({
    title: "",
    category: "Full Stack",
    description: "",
    image: "",
    technologies: [{ ...emptyTechnology }],
    liveUrl: "",
    githubUrl: "",
    projectStatus: "Completed",
    publishedDate: getTodayDate(),
    featured: false,
    status: true,
  });

  // Get all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/projects", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch projects!");
      }

      setProjects(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reorder projects
  const handleReorder = async (reorderedProjects) => {
    setProjects(reorderedProjects);

    try {
      const res = await fetch("/api/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "projects",
          ids: reorderedProjects.map((item) => item._id),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update project order!");
      }
    } catch (error) {
      setError(error.message);
      await fetchProjects();
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Search projects
  const filteredProjects = projects.filter((item) => {
    const searchValue = search.toLowerCase();

    const technologyMatch = item.technologies?.some((technology) =>
      technology.name?.toLowerCase().includes(searchValue),
    );

    return (
      item.title?.toLowerCase().includes(searchValue) ||
      item.category?.toLowerCase().includes(searchValue) ||
      item.projectStatus?.toLowerCase().includes(searchValue) ||
      technologyMatch
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

  // Handle project image upload
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

  // Remove project image
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // Add technology
  const addTechnology = () => {
    setFormData((prev) => ({
      ...prev,
      technologies: [...prev.technologies, { ...emptyTechnology }],
    }));
  };

  // Handle technology change
  const handleTechnologyChange = (index, field, value) => {
    setFormData((prev) => {
      const technologies = [...prev.technologies];

      technologies[index] = {
        ...technologies[index],
        [field]: value,
      };

      return {
        ...prev,
        technologies,
      };
    });
  };

  // Remove technology
  const removeTechnology = (index) => {
    setFormData((prev) => {
      if (prev.technologies.length === 1) {
        return prev;
      }

      return {
        ...prev,
        technologies: prev.technologies.filter(
          (_, itemIndex) => itemIndex !== index,
        ),
      };
    });
  };

  // Create project
  const handleCreate = () => {
    setError("");
    setEditingProject(null);

    setFormData({
      title: "",
      category: "Full Stack",
      description: "",
      image: "",
      technologies: [{ ...emptyTechnology }],
      liveUrl: "",
      githubUrl: "",
      projectStatus: "Completed",
      publishedDate: getTodayDate(),
      featured: false,
      status: true,
    });

    setModalOpen(true);
  };

  // Edit project
  const handleEdit = (project) => {
    setError("");
    setEditingProject(project);

    setFormData({
      title: project.title || "",
      category: project.category || "Full Stack",
      description: project.description || "",
      image: project.image || "",
      technologies: project.technologies?.length
        ? project.technologies
        : [{ name: "", icon: "", color: "" }],
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      projectStatus: project.projectStatus || "Completed",
      publishedDate: project.publishedDate
        ? String(project.publishedDate).slice(0, 10)
        : getTodayDate(),
      featured: project.featured ?? false,
      status: project.status ?? true,
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

        category: formData.category.trim(),

        description: formData.description.trim(),

        image: formData.image.trim(),

        technologies: formData.technologies
          .map((technology) => ({
            name: technology.name.trim(),
            icon: technology.icon.trim(),
            color: technology.color.trim(),
          }))
          .filter((technology) => technology.name),

        liveUrl: formData.liveUrl.trim(),

        githubUrl: formData.githubUrl.trim(),

        projectStatus: formData.projectStatus,

        publishedDate: formData.publishedDate,
      };

      let url = "/api/projects";
      let method = "POST";

      if (editingProject) {
        url = `/api/projects/${editingProject._id}`;
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

      const wasEditing = editingProject;

      setModalOpen(false);
      setEditingProject(null);

      setFormData({
        title: "",
        category: "Full Stack",
        description: "",
        image: "",
        technologies: [{ ...emptyTechnology }],
        liveUrl: "",
        githubUrl: "",
        projectStatus: "Completed",
        publishedDate: getTodayDate(),
        featured: false,
        status: true,
      });

      await fetchProjects();

      await Swal.fire({
        icon: "success",
        title: wasEditing ? "Project Updated!" : "Project Created!",
        text: wasEditing
          ? "Project has been updated successfully."
          : "Project has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Project?",
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

      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        await Swal.fire({
          icon: "error",
          title: "Delete Failed!",
          text: data.message || "Failed to delete project.",
        });

        return;
      }

      setProjects((prev) => prev.filter((item) => item._id !== id));

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Project has been deleted successfully.",
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
          <h1 className="text-2xl font-semibold">Projects</h1>

          <p className="mt-1 text-sm text-base-content/45">
            Manage the projects displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
        >
          <FiPlus size={17} />
          Create Project
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-xl border border-base-content/10 bg-base-100 px-3 py-2.5 sm:max-w-sm">
          <FiSearch size={16} className="shrink-0 text-base-content/35" />

          <input
            type="text"
            placeholder="Search project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/30"
          />
        </div>

        <div className="text-xs text-base-content/40">
          {filteredProjects.length} Projects
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-base-content/10 bg-base-100">
        {/* Table Header */}
        <div className="hidden grid-cols-12 border-b border-base-content/10 bg-base-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-base-content/35 md:grid">
          <div className="col-span-4">Project</div>

          <div className="col-span-2">Category</div>

          <div className="col-span-2">Project Status</div>

          <div className="col-span-2">Status</div>

          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Project List */}
        <div className="divide-y divide-base-content/10">
          {loading ? (
            <WorkExperienceLoading />
          ) : error && projects.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-error">{error}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
              <p className="text-sm font-medium text-base-content/50">
                No project found
              </p>

              <p className="mt-1 text-xs text-base-content/30">
                {search
                  ? "No project matches your search."
                  : "Create your first project to get started."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
                >
                  <FiPlus size={17} />
                  Create Project
                </button>
              )}
            </div>
          ) : (
            <ReorderList items={filteredProjects} onReorder={handleReorder}>
              {(project, { attributes, listeners }) => (
                <div className="grid min-w-0 grid-cols-1 gap-5 overflow-hidden px-4 py-4 transition-colors hover:bg-base-content/[0.02] sm:px-5 sm:py-5 md:grid-cols-12 md:items-center md:gap-0">
                  {/* Project */}
                  <div className="min-w-0 md:col-span-4">
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

                        {/* Project Image */}
                        <div className="hidden h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-base-content/10 bg-base-200 sm:block">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              width={64}
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
                            {project.title}
                          </p>

                          <p className="mt-1 break-words text-xs text-primary">
                            {project.category}
                          </p>

                         
                        </div>
                      </div>

                      {/* Mobile Actions */}
                      <div className="flex shrink-0 items-center gap-2 md:hidden">
                        <button
                          type="button"
                          onClick={() => handleEdit(project)}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(project._id)}
                          disabled={deletingId === project._id}
                          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === project._id ? (
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
                        <p className="break-words text-xs text-base-content/65">
                          {project.category}
                        </p>

                        <p className="mt-1 text-[11px] text-base-content/35">
                          {formatDate(project.publishedDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Project Status */}
                  <div className="min-w-0 md:col-span-2">
                    <div className="flex min-w-0 items-center justify-between gap-3 md:block">
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                        Project Status
                      </span>

                      <div className="shrink-0">
                        {project.projectStatus === "Ongoing" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/20 bg-warning/10 px-2.5 py-1 text-[11px] font-medium text-warning">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                            Ongoing
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Active Status */}
                  <div className="min-w-0 md:col-span-2">
                    <div className="flex min-w-0 items-center justify-between gap-3 md:block">
                      <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                        Status
                      </span>

                      <div className="shrink-0">
                        {project.status ? (
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
                      onClick={() => handleEdit(project)}
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                      title="Edit"
                    >
                      <FiEdit2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(project._id)}
                      disabled={deletingId === project._id}
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === project._id ? (
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
                {editingProject ? "Update Project" : "Create Project"}
              </h2>

              <p className="mt-0.5 text-xs text-base-content/40">
                {editingProject
                  ? "Update the selected project information."
                  : "Add a new project to your portfolio."}
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
                  Project Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. EverFast Express"
                  className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Category + Project Status */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Category */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40"
                  >
                    <option value="Full Stack">Full Stack</option>

                    <option value="Frontend">Frontend</option>

                    <option value="Backend">Backend</option>
                  </select>
                </div>

                {/* Project Status */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Project Status
                  </label>

                  <select
                    name="projectStatus"
                    value={formData.projectStatus}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40"
                  >
                    <option value="Completed">Completed</option>

                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
              </div>

              {/* Published Date */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Published Date
                </label>

                <input
                  type="date"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40"
                />

                <p className="mt-1.5 text-[11px] text-base-content/35">
                  By default, today&apos;s date is selected.
                </p>
              </div>

              {/* Project Image */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Project Image
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
                        alt="Project preview"
                        width={800}
                        height={400}
                        className="h-48 w-full object-contain"
                        unoptimized
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
                  placeholder="Write a short description about this project..."
                  className="w-full resize-none rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Technologies */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-medium text-base-content/70">
                    Technologies
                  </label>

                  <button
                    type="button"
                    onClick={addTechnology}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-primary"
                  >
                    <FiPlus size={14} />
                    Add Technology
                  </button>
                </div>

                <p className="mb-3 text-[11px] text-base-content/35">
                  Technology name is required. Icon name and color are optional.
                </p>

                <div className="space-y-3">
                  {formData.technologies.map((technology, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-base-content/10 bg-base-200 p-3"
                    >
                      {/* Technology Header */}
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-[11px] font-medium text-base-content/40">
                          Technology #{index + 1}
                        </p>

                        {formData.technologies.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTechnology(index)}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/10 text-error transition-all active:scale-[.95]"
                            title="Remove Technology"
                          >
                            <FiX size={14} />
                          </button>
                        )}
                      </div>

                      {/* Technology Name */}
                      <div className="mb-3">
                        <label className="mb-1.5 block text-[11px] font-medium text-base-content/60">
                          Technology Name
                          <span className="ml-1 text-error">*</span>
                        </label>

                        <input
                          type="text"
                          value={technology.name}
                          onChange={(e) =>
                            handleTechnologyChange(
                              index,
                              "name",
                              e.target.value,
                            )
                          }
                          placeholder="e.g. React"
                          className="w-full rounded-lg border border-base-content/10 bg-base-100 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                        />
                      </div>

                      {/* Icon Name + Color */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {/* Icon Name */}
                        <div>
                          <label className="mb-1.5 block text-[11px] font-medium text-base-content/60">
                            Icon Name
                            <span className="ml-1 text-base-content/30">
                              (Optional)
                            </span>
                          </label>

                          <input
                            type="text"
                            value={technology.icon}
                            onChange={(e) =>
                              handleTechnologyChange(
                                index,
                                "icon",
                                e.target.value,
                              )
                            }
                            placeholder="e.g. FaReact"
                            className="w-full rounded-lg border border-base-content/10 bg-base-100 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                          />

                          <p className="mt-1 text-[10px] text-base-content/30">
                            Example: FaReact, SiNextdotjs
                          </p>
                        </div>

                        {/* Icon Color */}
                        <div>
                          <label className="mb-1.5 block text-[11px] font-medium text-base-content/60">
                            Icon Color
                            <span className="ml-1 text-base-content/30">
                              (Optional)
                            </span>
                          </label>

                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={technology.color || "#000000"}
                              onChange={(e) =>
                                handleTechnologyChange(
                                  index,
                                  "color",
                                  e.target.value,
                                )
                              }
                              className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-base-content/10 bg-base-100 p-1"
                            />

                            <input
                              type="text"
                              value={technology.color}
                              onChange={(e) =>
                                handleTechnologyChange(
                                  index,
                                  "color",
                                  e.target.value,
                                )
                              }
                              placeholder="#61DAFB"
                              className="w-full rounded-lg border border-base-content/10 bg-base-100 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live URL + GitHub URL */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Live URL */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Live Demo URL
                  </label>

                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                  />
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    GitHub URL
                  </label>

                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                  />
                </div>
              </div>

              {/* Featured */}
              <div className="flex items-center justify-between rounded-xl border border-base-content/10 bg-base-200 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Featured Project</p>

                  <p className="mt-0.5 text-[11px] text-base-content/40">
                    Highlight this project on your portfolio.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="toggle toggle-primary"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center justify-between rounded-xl border border-base-content/10 bg-base-200 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Active Project</p>

                  <p className="mt-0.5 text-[11px] text-base-content/40">
                    Show this project on your portfolio.
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

                      {editingProject ? "Updating..." : "Creating..."}
                    </>
                  ) : editingProject ? (
                    "Update Project"
                  ) : (
                    "Create Project"
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

export default ProjectsPage;
