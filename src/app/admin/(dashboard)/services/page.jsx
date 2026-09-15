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

import { getIcon } from "@/lib/iconLoader";

import ServicesLoading from "../components/loadings/serviceLoading";
import Spin from "@/components/loadings/Spin";
import ReorderList from "../components/reorder/ReorderList";

const ServicesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "FaCode",
    status: true,
  });

  // Get all services
  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/services", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch data!");
      }

      setServices(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Reorder services
  const handleReorder = async (reorderedServices) => {
    setServices(reorderedServices);

    try {
      const res = await fetch("/api/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "services",
          ids: reorderedServices.map((service) => service._id),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update service order!");
      }
    } catch (error) {
      setError(error.message);

      await fetchServices();
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Search data
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Handle all input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Create service
  const handleCreate = () => {
    setError("");
    setEditingService(null);

    setFormData({
      title: "",
      description: "",
      icon: "FaCode",
      status: true,
    });

    setModalOpen(true);
  };

  // Edit service
  const handleEdit = (service) => {
    setError("");
    setEditingService(service);

    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      status: service.status,
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

      let url = "/api/services";
      let method = "POST";

      if (editingService) {
        url = `/api/services/${editingService._id}`;
        method = "PATCH";
      }

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong!");
        return;
      }

      const wasEditing = editingService;

      setModalOpen(false);
      setEditingService(null);

      setFormData({
        title: "",
        description: "",
        icon: "FaCode",
        status: true,
      });

      await fetchServices();

      await Swal.fire({
        icon: "success",
        title: wasEditing ? "Service Updated!" : "Service Created!",
        text: wasEditing
          ? "Service has been updated successfully."
          : "Service has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setError(error.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete service
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Service?",
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

      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        await Swal.fire({
          icon: "error",
          title: "Delete Failed!",
          text: data.message || "Failed to delete service",
        });

        return;
      }

      setServices((prev) => prev.filter((service) => service._id !== id));

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Service has been deleted successfully.",
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
          <h1 className="text-2xl font-semibold">Services</h1>

          <p className="mt-1 text-sm text-base-content/45">
            Manage the services displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
        >
          <FiPlus size={17} />
          Create Service
        </button>
      </div>

      {/* Search */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-xl border border-base-content/10 bg-base-100 px-3 py-2.5 sm:max-w-sm">
          <FiSearch size={16} className="shrink-0 text-base-content/35" />

          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/30"
          />
        </div>

        <div className="text-xs text-base-content/40">
          {filteredServices.length} Services
        </div>
      </div>

      {/* Services Table */}
      <div className="overflow-hidden rounded-2xl border border-base-content/10 bg-base-100">
        {/* Table Header */}
        <div className="hidden grid-cols-12 border-b border-base-content/10 bg-base-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-base-content/35 md:grid">
          <div className="col-span-5">Service</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Services */}
        <div className="divide-y divide-base-content/10">
          {loading ? (
            <ServicesLoading />
          ) : error && services.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-error">{error}</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
              <p className="text-sm font-medium text-base-content/50">
                No services found
              </p>

              <p className="mt-1 text-xs text-base-content/30">
                {search
                  ? "No services match your search."
                  : "Create your first service to get started."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
                >
                  <FiPlus size={17} />
                  Create Service
                </button>
              )}
            </div>
          ) : (
            <ReorderList items={filteredServices} onReorder={handleReorder}>
              {(service, { attributes, listeners }) => {
                const Icon = getIcon(service.icon);
                return (
                  <div className="grid min-w-0 grid-cols-1 gap-5 overflow-hidden px-4 py-4 transition-colors hover:bg-base-content/[0.02] sm:px-5 sm:py-5 md:grid-cols-12 md:items-center md:gap-0">
                    {/* Service */}
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

                          <div className="flex min-w-0 items-start gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary">
                              {Icon ? (
                                <Icon size={19} />
                              ) : (
                                <span className="text-xs">API</span>
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="break-words text-sm font-medium">
                                {service.title}
                              </p>

                              <p className="mt-0.5 break-words text-[11px] text-base-content/35">
                                Service #{String(service._id).slice(-6)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions - Mobile */}
                        <div className="flex shrink-0 items-center gap-2 md:hidden">
                          <button
                            type="button"
                            onClick={() => handleEdit(service)}
                            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                            title="Edit"
                          >
                            <FiEdit2 size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(service._id)}
                            disabled={deletingId === service._id}
                            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === service._id ? (
                              <FiLoader size={15} className="animate-spin" />
                            ) : (
                              <FiTrash2 size={15} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="min-w-0 md:col-span-3">
                      <div className="flex min-w-0 items-start justify-between gap-4 md:block">
                        <p className="break-words text-xs leading-5 text-base-content/45">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="min-w-0 md:col-span-2">
                      <div className="flex min-w-0 items-center justify-between gap-3 md:block">
                        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-base-content/30 md:hidden">
                          Status
                        </span>

                        <div className="shrink-0">
                          {service.status ? (
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

                    {/* Actions - Desktop */}
                    <div className="hidden items-center justify-end gap-2 md:col-span-2 md:flex">
                      <button
                        type="button"
                        onClick={() => handleEdit(service)}
                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                        title="Edit"
                      >
                        <FiEdit2 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(service._id)}
                        disabled={deletingId === service._id}
                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all disabled:cursor-not-allowed disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === service._id ? (
                          <FiLoader size={15} className="animate-spin" />
                        ) : (
                          <FiTrash2 size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              }}
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
          className={`w-full max-w-lg overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-2xl transition-transform duration-300 ${
            modalOpen ? "scale-100" : "scale-95"
          }`}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-base-content/10 px-5 py-4">
            <div>
              <h2 className="text-lg font-semibold">
                {editingService ? "Update Service" : "Create Service"}
              </h2>

              <p className="mt-0.5 text-xs text-base-content/40">
                {editingService
                  ? "Update the selected service information."
                  : "Add a new service to your portfolio."}
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
          <form onSubmit={handleSubmit} className="space-y-5 p-5">
            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-error/20 bg-error/10 px-3.5 py-3">
                <p className="text-xs font-medium text-error">{error}</p>
              </div>
            )}

            {/* Service Title */}
            <div>
              <label className="mb-2 block text-xs font-medium text-base-content/70">
                Service Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Full Stack Web Development"
                className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
              />
            </div>

            {/* Icon Name */}
            <div>
              <label className="mb-2 block text-xs font-medium text-base-content/70">
                Icon Name
              </label>

              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="e.g. FaCode"
                className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
              />

              <p className="mt-1.5 text-[11px] text-base-content/35">
                Enter the React Icons component name, e.g. FaCode, FaLaravel,
                FaWordpress.
              </p>
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
                placeholder="Write a short description of this service..."
                className="w-full resize-none rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm leading-6 outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
              />
            </div>

            {/* Status */}
            <div className="flex items-center justify-between rounded-xl border border-base-content/10 bg-base-200 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Active Service</p>

                <p className="mt-0.5 text-[11px] text-base-content/40">
                  Show this service on your portfolio.
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
                className="inline-flex min-w-32 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-content transition-all active:scale-[.95] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Spin />
                    {editingService ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>{editingService ? "Update Service" : "Create Service"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
