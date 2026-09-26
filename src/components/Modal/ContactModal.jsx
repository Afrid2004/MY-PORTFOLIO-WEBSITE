"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import {
  FiX,
  FiMail,
  FiUser,
  FiFileText,
  FiPaperclip,
  FiSend,
} from "react-icons/fi";

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Reset form and close modal
  const handleClose = () => {
    if (loading) return;

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setAttachments([]);
    setError("");

    const fileInput = document.getElementById("contact-attachment");

    if (fileInput) {
      fileInput.value = "";
    }

    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) {
      setAttachments([]);
      return;
    }

    // Maximum 5 MB per file
    const invalidFile = files.find((file) => file.size > 5 * 1024 * 1024);

    if (invalidFile) {
      setError(`"${invalidFile.name}" must be less than 5 MB.`);

      e.target.value = "";
      setAttachments([]);

      return;
    }

    setAttachments(files);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("subject", formData.subject);
      data.append("message", formData.message);

      // Add multiple attachments
      attachments.forEach((file) => {
        data.append("attachments", file);
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message.");
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setAttachments([]);
      setError("");

      // Reset file input
      const fileInput = document.getElementById("contact-attachment");

      if (fileInput) {
        fileInput.value = "";
      }

      // Close modal
      onClose();

      // Success Alert
      await Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your message has been sent successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-all duration-200 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-base-content/10 bg-base-100 shadow-2xl transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-base-content/10 bg-base-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">Send Me a Message</h2>

            <p className="mt-0.5 text-xs text-base-content/40">
              Have a project or opportunity? Let&apos;s get in touch.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
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

            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-xs font-medium text-base-content/70"
                >
                  Name
                </label>

                <div className="relative">
                  <FiUser
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/35"
                  />

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="h-[42px] w-full rounded-lg border border-base-content/10 bg-base-200 pl-10 pr-3.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-xs font-medium text-base-content/70"
                >
                  Email Address
                </label>

                <div className="relative">
                  <FiMail
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/35"
                  />

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="h-[42px] w-full rounded-lg border border-base-content/10 bg-base-200 pl-10 pr-3.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                  />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-xs font-medium text-base-content/70"
              >
                Subject
              </label>

              <div className="relative">
                <FiFileText
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/35"
                />

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project discussion"
                  required
                  className="h-[42px] w-full rounded-lg border border-base-content/10 bg-base-200 pl-10 pr-3.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-xs font-medium text-base-content/70"
              >
                Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows={5}
                required
                className="w-full resize-y rounded-lg border border-base-content/10 bg-base-200 px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-base-content/25 focus:border-primary/40"
              />
            </div>

            {/* Attachment */}
            <div>
              <label
                htmlFor="contact-attachment"
                className="mb-2 block text-xs font-medium text-base-content/70"
              >
                Attachment
                <span className="ml-1 text-base-content/35">
                  (Optional, max 5 MB)
                </span>
              </label>

              <label
                htmlFor="contact-attachment"
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-base-content/15 bg-base-200 px-3.5 py-3 transition-colors hover:border-primary/40"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FiPaperclip size={16} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">
                    {attachments.length > 0
                      ? `${attachments.length} file${
                          attachments.length > 1 ? "s" : ""
                        } selected`
                      : "Choose files"}
                  </p>

                  {attachments.length === 0 && (
                    <p className="mt-0.5 text-[11px] text-base-content/35">
                      PDF, DOC, DOCX, JPG, PNG, etc.
                    </p>
                  )}
                </div>

                <input
                  id="contact-attachment"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2 border-t border-base-content/10 pt-5">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="cursor-pointer rounded-lg border border-base-content/10 px-4 py-2.5 text-sm text-base-content/55 transition-colors hover:bg-base-content/5 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-w-36 cursor-pointer items-center justify-center gap-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-content transition-all active:scale-[.95] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FiSend className="rotate-40" size={15} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
