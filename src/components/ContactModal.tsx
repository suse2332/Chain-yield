"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

export default function ContactModal() {
  const { address } = useAccount();

  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    file: null as File | null,
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async () => {
    if (!form.message || !address) return;

    setSubmitting(true);

    try {
      let attachmentUrl = null;

      if (form.file) {
        setUploading(true);
        const fileData = new FormData();
        fileData.append("file", form.file);

        const res = await axios.post("/api/upload", fileData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        attachmentUrl = res.data.url;
        setUploading(false);
      }

      await axios.post("/api/messages", {
        wallet: address,
        name: form.name,
        email: form.email,
        message: form.message,
        attachmentUrl,
      });

      alert("Message sent!");
      setForm({ name: "", email: "", message: "", file: null });
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Contact Support
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-red-400 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Contact Support</h2>

            <input
              className="w-full bg-gray-800 p-2 mb-3 rounded text-white"
              placeholder="Your Name (optional)"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
            <input
              className="w-full bg-gray-800 p-2 mb-3 rounded text-white"
              placeholder="Email (optional)"
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            />
            <textarea
              className="w-full bg-gray-800 p-2 mb-3 rounded text-white"
              placeholder="Your Message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            />
            <input
              type="file"
              accept="image/*,.pdf,.zip,.log"
              className="mb-4 text-white"
              onChange={handleFileChange}
            />

            <button
              onClick={handleSubmit}
              disabled={submitting || uploading}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 w-full rounded disabled:opacity-50"
            >
              {uploading
                ? "Uploading file..."
                : submitting
                ? "Sending..."
                : "Send Message"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
