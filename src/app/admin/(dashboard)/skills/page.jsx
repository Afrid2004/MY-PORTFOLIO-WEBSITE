"use client";

import { formatUnderLineText } from "@/lib/formatText";
import { getIcon } from "@/lib/iconLoader";
import React, { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSearch } from "react-icons/fi";

const SkillsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: 80,
    color: "#DBFF00",
    icon: "",
    status: true,
  });

  const skills = [
    {
      id: 1,
      name: "React.js",
      category: "frontend",
      level: 85,
      color: "#61DAFB",
      icon: "FaReact",
      status: true,
    },
    {
      id: 2,
      name: "Next.js",
      category: "frontend",
      level: 80,
      color: "#FFFFFF",
      icon: "SiNextdotjs",
      status: true,
    },
    {
      id: 3,
      name: "Laravel",
      category: "backend",
      level: 82,
      color: "#FF2D20",
      icon: "FaLaravel",
      status: true,
    },
    {
      id: 4,
      name: "MongoDB",
      category: "database",
      level: 78,
      color: "#47A248",
      icon: "SiMongodb",
      status: true,
    },
    {
      id: 5,
      name: "Git",
      category: "tools_other",
      level: 85,
      color: "#F05032",
      icon: "FaGitAlt",
      status: true,
    },
  ];

  // Handle all input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Create skill
  const handleCreate = () => {
    setEditingSkill(null);

    setFormData({
      name: "",
      category: "",
      level: 80,
      color: "#DBFF00",
      icon: "",
      status: true,
    });

    setModalOpen(true);
  };

  // Edit skill
  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      color: skill.color,
      icon: skill.icon,
      status: skill.status,
    });

    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Form Data:", formData);

    if (!editingSkill) {
      console.log("Creating new skill");
    } else {
      console.log("Updating skill:", editingSkill.id);
    }

    setModalOpen(false);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Skills</h1>

          <p className="mt-1 text-sm text-base-content/45">
            Manage the technologies and tools displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-content transition-all duration-200 active:scale-[.95] sm:w-fit"
        >
          <FiPlus size={17} />
          Create Skill
        </button>
      </div>

      {/* Search + Filter */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 rounded-xl border border-base-content/10 bg-base-100 px-3 py-2.5 sm:max-w-sm">
          <FiSearch size={16} className="shrink-0 text-base-content/35" />

          <input
            type="text"
            placeholder="Search skills..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/30"
          />
        </div>

        <div className="text-xs text-base-content/40">
          {skills.length} Skills
        </div>
      </div>

      {/* Skills Table */}
      <div className="overflow-hidden rounded-2xl border border-base-content/10 bg-base-100">
        {/* Table Header */}
        <div className="hidden grid-cols-12 border-b border-base-content/10 bg-base-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-base-content/35 md:grid">
          <div className="col-span-4">Skill</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-3">Level</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Skills */}
        <div className="divide-y divide-base-content/10">
          {skills.map((skill) => {
            const Icon = getIcon(skill.icon);

            return (
              <div
                key={skill.id}
                className="grid grid-cols-1 gap-4 px-5 py-5 transition-colors hover:bg-base-content/[0.02] md:grid-cols-12 md:items-center md:gap-0"
              >
                {/* Skill */}
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                      style={{
                        color: skill.color,
                        borderColor: `${skill.color}30`,
                        backgroundColor: `${skill.color}12`,
                      }}
                    >
                      {Icon && <Icon />}
                    </div>

                    <div>
                      <p className="text-sm font-medium">{skill.name}</p>

                      <p className="mt-0.5 text-[11px] text-base-content/35">
                        Skill #{skill.id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="md:col-span-2">
                  <span className="capitalize rounded-full border border-base-content/10 bg-base-200 px-2.5 py-1 text-[11px] text-base-content/55">
                    {formatUnderLineText(skill.category, " & ")}
                  </span>
                </div>

                {/* Level */}
                <div className="md:col-span-3">
                  <div className="flex max-w-52 items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-base-content/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>

                    <span
                      className="w-9 text-right text-xs font-medium"
                      style={{ color: skill.color }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  {skill.status ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-base-content/10 bg-base-content/5 px-2.5 py-1 text-[11px] font-medium text-base-content/40">
                      Inactive
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-start gap-2 md:col-span-1 md:justify-end">
                  <button
                    type="button"
                    onClick={() => handleEdit(skill)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-all active:scale-[0.95]"
                    title="Edit"
                  >
                    <FiEdit2 size={15} />
                  </button>

                  <button
                    type="button"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-error/20 bg-error/20 text-error transition-all"
                    title="Delete"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
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
                {editingSkill ? "Update Skill" : "Create Skill"}
              </h2>

              <p className="mt-0.5 text-xs text-base-content/40">
                {editingSkill
                  ? "Update the selected skill information."
                  : "Add a new skill to your portfolio."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseModal}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-base-content/40 transition-colors hover:bg-base-content/5 hover:text-base-content"
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 p-5">
            {/* Skill Name */}
            <div>
              <label className="mb-2 block text-xs font-medium text-base-content/70">
                Skill Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. React.js"
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
                placeholder="e.g. FaReact"
                className="w-full rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
              />

              <p className="mt-1.5 text-[11px] text-base-content/35">
                Enter the React Icons component name, e.g. FaReact, SiNextdotjs,
                FaLaravel.
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-xs font-medium text-base-content/70">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-primary w-full cursor-pointer rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40"
              >
                <option value="" disabled>
                  Select Category
                </option>

                <option value="frontend">Frontend</option>

                <option value="backend">Backend</option>

                <option value="database">Database</option>

                <option value="tools_other">Tools & Other</option>
              </select>
            </div>

            {/* Level */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-base-content/70">
                  Skill Level
                </label>

                <span className="text-xs text-primary">
                  {formData.level}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="range range-primary range-xs w-full"
              />
            </div>

            {/* Color */}
            <div>
              <label className="mb-2 block text-xs font-medium text-base-content/70">
                Skill Color
              </label>

              <div className="flex items-center gap-3">
                {/* Color Picker */}
                <input
                  type="color"
                  name="color"
                  value={formData.color || "#DBFF00"}
                  onChange={handleChange}
                  className="h-10 w-14 cursor-pointer rounded-lg border border-base-content/10 bg-base-200 p-1"
                />

                {/* Color Text */}
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="#DBFF00"
                  className="flex-1 rounded-xl border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/40"
                />
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between rounded-xl border border-base-content/10 bg-base-200 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Active Skill</p>

                <p className="mt-0.5 text-[11px] text-base-content/40">
                  Show this skill on your portfolio.
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
                className="cursor-pointer rounded-xl border border-base-content/10 px-4 py-2.5 text-sm text-base-content/55 transition-colors hover:bg-base-content/5 hover:text-base-content"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-content transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
              >
                {editingSkill ? "Update Skill" : "Create Skill"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
