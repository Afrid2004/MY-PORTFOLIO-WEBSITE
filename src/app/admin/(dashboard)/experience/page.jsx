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

const WorkExperiencePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWork, setEditingWork] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [workExperiences, setWorkExperiences] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    current: true,
    address: "",
    addressUrl: "",
    responsibilities: [""],
    technologies: [""],
    status: true,
  });

  // Get all work experiences
  const fetchWorkExperiences = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/work-experiences", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch work experiences!");
      }

      setWorkExperiences(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reorder work experiences
  const handleReorder = async (reorderedWorkExperiences) => {
    setWorkExperiences(reorderedWorkExperiences);

    try {
      const res = await fetch("/api/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "workExperiences",
          ids: reorderedWorkExperiences.map((item) => item._id),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to update work experience order!",
        );
      }
    } catch (error) {
      setError(error.message);

      await fetchWorkExperiences();
    }
  };

  useEffect(() => {
    fetchWorkExperiences();
  }, []);

  // Search data
  const filteredWorkExperiences = workExperiences.filter((item) => {
    const searchValue = search.toLowerCase();

    return (
      item.role?.toLowerCase().includes(searchValue) ||
      item.company?.toLowerCase().includes(searchValue)
    );
  });

  // Format date
  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Handle normal inputs
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle current checkbox
  const handleCurrentChange = (event) => {
    const checked = event.target.checked;

    setFormData((prev) => ({
      ...prev,
      current: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  // Add item
  const addArrayItem = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: [...prev[name], ""],
    }));
  };

  // Responsibilities + Technologies
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

  // Remove item
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

  // Create work experience
  const handleCreate = () => {
    setError("");
    setEditingWork(null);

    setFormData({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      current: true,
      address: "",
      addressUrl: "",
      responsibilities: [""],
      technologies: [""],
      status: true,
    });

    setModalOpen(true);
  };

  // Edit work experience
  const handleEdit = (work) => {
    setError("");
    setEditingWork(work);

    setFormData({
      role: work.role || "",
      company: work.company || "",
      startDate: work.startDate
        ? new Date(work.startDate).toISOString().split("T")[0]
        : "",
      endDate:
        work.endDate && !work.current
          ? new Date(work.endDate).toISOString().split("T")[0]
          : "",
      current: work.current ?? false,
      address: work.address || "",
      addressUrl: work.addressUrl || "",
      responsibilities:
        work.responsibilities?.length > 0 ? work.responsibilities : [""],
      technologies: work.technologies?.length > 0 ? work.technologies : [""],
      status: work.status ?? true,
    });

    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    if (submitting) {
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

        role: formData.role.trim(),
        company: formData.company.trim(),
        address: formData.address.trim(),
        addressUrl: formData.addressUrl.trim(),

        startDate: formData.startDate,

        endDate: formData.current ? null : formData.endDate || null,

        responsibilities: formData.responsibilities
          .map((item) => item.trim())
          .filter(Boolean),

        technologies: formData.technologies
          .map((item) => item.trim())
          .filter(Boolean),
      };

      let url = "/api/work-experiences";
      let method = "POST";

      if (editingWork) {
        url = `/api/work-experiences/${editingWork._id}`;
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

      const wasEditing = editingWork;

      setModalOpen(false);
      setEditingWork(null);

      setFormData({
        role: "",
        company: "",
        startDate: "",
        endDate: "",
        current: true,
        address: "",
        addressUrl: "",
        responsibilities: [""],
        technologies: [""],
        status: true,
      });

      await fetchWorkExperiences();

      await Swal.fire({
        icon: "success",
        title: wasEditing
          ? "Work Experience Updated!"
          : "Work Experience Created!",
        text: wasEditing
          ? "Work experience has been updated successfully."
          : "Work experience has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete work experience
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Work Experience?",
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

      const res = await fetch(`/api/work-experiences/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        await Swal.fire({
          icon: "error",
          title: "Delete Failed!",
          text: data.message || "Failed to delete work experience.",
        });

        return;
      }

      setWorkExperiences((prev) => prev.filter((item) => item._id !== id));

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Work experience has been deleted successfully.",
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
          <h1 className="text-2xl font-semibold">Work Experience</h1>

          <p className="mt-1 text-sm text-base-content/45">
            Manage the work experience displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
        >
          <FiPlus size={17} />
          Create Experience
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-xl border border-base-content/10 bg-base-100 px-3 py-2.5 sm:max-w-sm">
          <FiSearch size={16} className="shrink-0 text-base-content/35" />

          <input
            type="text"
            placeholder="Search experience..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/30"
          />
        </div>

        <div className="text-xs text-base-content/40">
          {filteredWorkExperiences.length} Experiences
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-base-content/10 bg-base-100">
        {/* Table Header */}
        <div className="hidden grid-cols-12 border-b border-base-content/10 bg-base-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-base-content/35 md:grid">
          <div className="col-span-5">Experience</div>

          <div className="col-span-3">Date</div>

          <div className="col-span-2">Status</div>

          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Experience List */}
        <div className="divide-y divide-base-content/10">
          {loading ? (
            <WorkExperienceLoading />
          ) : error && workExperiences.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-error">{error}</p>
            </div>
          ) : filteredWorkExperiences.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
              <p className="text-sm font-medium text-base-content/50">
                No work experience found
              </p>

              <p className="mt-1 text-xs text-base-content/30">
                {search
                  ? "No work experience matches your search."
                  : "Create your first work experience to get started."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
                >
                  <FiPlus size={17} />
                  Create Experience
                </button>
              )}
            </div>
          ) : (
            <ReorderList
              items={filteredWorkExperiences}
              onReorder={handleReorder}
            >
              {(work, { attributes, listeners }) => (
                <div className="grid grid-cols-1 gap-5 px-4 py-4 transition-colors hover:bg-base-content/[0.02] sm:px-5 sm:py-5 md:grid-cols-12 md:items-center md:gap-0">
                  {/* Experience */}
                  <div className="min-w-0 md:col-span-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 justify-center">
                        {/* Drag Handle */}
                        <button
                          type="button"
                          {...attributes}
                          {...listeners}
                          className="hidden md:flex h-8 w-8 cursor-grab items-center justify-center rounded-lg text-base-content/25 transition-colors hover:bg-base-content/5 hover:text-base-content/60 active:cursor-grabbing"
                          title="Drag to reorder"
                        >
                          <FiMenu size={16} />
                        </button>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {work.role}
                          </p>

                          <p className="mt-1 truncate text-xs text-primary">
                            {work.company}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-base-content/35">
                            Experience #{String(work._id).slice(-6)}
                          </p>
                        </div>
                      </div>

                      {/* Mobile Actions */}
                      <div className="flex shrink-0 items-center gap-2 md:hidden">
                        <button
                          type="button"
                          onClick={() => handleEdit(work)}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                          title="Edit"
                        >
                          <FiEdit2 size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(work._id)}
                          disabled={deletingId === work._id}
                          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === work._id ? (
                            <FiLoader size={15} className="animate-spin" />
                          ) : (
                            <FiTrash2 size={15} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="md:col-span-3">
                    <div className="flex items-center justify-between gap-3 md:block">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                        Date
                      </span>

                      <div className="text-right md:text-left">
                        <p className="text-xs text-base-content/65">
                          {formatDate(work.startDate)}
                          {" → "}
                          {work.current ? "Present" : formatDate(work.endDate)}
                        </p>

                        {work.current && (
                          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between gap-3 md:block">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                        Status
                      </span>

                      {work.status ? (
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

                  {/* Desktop Actions */}
                  <div className="hidden items-center justify-end gap-2 md:col-span-2 md:flex">
                    <button
                      type="button"
                      onClick={() => handleEdit(work)}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                      title="Edit"
                    >
                      <FiEdit2 size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(work._id)}
                      disabled={deletingId === work._id}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === work._id ? (
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
                {editingWork
                  ? "Update Work Experience"
                  : "Create Work Experience"}
              </h2>

              <p className="mt-0.5 text-xs text-base-content/40">
                {editingWork
                  ? "Update the selected work experience information."
                  : "Add a new work experience to your portfolio."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseModal}
              disabled={submitting}
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

              {/* Role */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Job Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Junior Full Stack Web Developer"
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
                  placeholder="e.g. Centre for Computer Studies Ltd."
                  className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Start Date */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-base-content/70">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    disabled={formData.current}
                    className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
                  />
                </div>
              </div>

              {/* Current */}
              <div className="flex items-center justify-between rounded-xl border border-base-content/10 bg-base-200 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">Currently Working</p>

                  <p className="mt-0.5 text-[11px] text-base-content/40">
                    If enabled, you do not need to enter an end date.
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="current"
                  checked={formData.current}
                  onChange={handleCurrentChange}
                  className="toggle toggle-primary"
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. 72, Nizam Shankar Plaza, Dhaka"
                  className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Address URL */}
              <div>
                <label className="mb-2 block text-xs font-medium text-base-content/70">
                  Address URL
                </label>

                <input
                  type="url"
                  name="addressUrl"
                  value={formData.addressUrl}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-xs font-medium text-base-content/70">
                    Responsibilities
                  </label>

                  <button
                    type="button"
                    onClick={() => addArrayItem("responsibilities")}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-primary"
                  >
                    <FiPlus size={14} />
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.responsibilities.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleArrayChange(
                            "responsibilities",
                            index,
                            e.target.value,
                          )
                        }
                        placeholder={`Responsibility ${index + 1}`}
                        className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                      />

                      {formData.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeArrayItem("responsibilities", index)
                          }
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
                  <p className="text-sm font-medium">Active Experience</p>

                  <p className="mt-0.5 text-[11px] text-base-content/40">
                    Show this experience on your portfolio.
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
                  disabled={submitting}
                  className="cursor-pointer rounded-lg border border-base-content/10 px-4 py-2.5 text-sm text-base-content/55 transition-colors hover:bg-base-content/5 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-w-36 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-content transition-all active:scale-[.95] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Spin />

                      {editingWork ? "Updating..." : "Creating..."}
                    </>
                  ) : editingWork ? (
                    "Update Experience"
                  ) : (
                    "Create Experience"
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

export default WorkExperiencePage;
