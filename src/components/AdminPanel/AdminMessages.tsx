"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type Message = {
  wallet: string;
  name?: string;
  email?: string;
  created: number;
  thread: {
    from: "user" | "admin";
    text: string;
    timestamp: number;
    attachmentUrl?: string | null;
  }[];
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [replies, setReplies] = useState<{ [wallet: string]: { text: string; file: File | null } }>({});

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/api/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleReply = async (wallet: string) => {
    const replyData = replies[wallet];
    if (!replyData?.text) return;

    let attachmentUrl = null;

    if (replyData.file) {
      try {
        const form = new FormData();
        form.append("file", replyData.file);
        const res = await axios.post("/api/upload", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        attachmentUrl = res.data.url;
      } catch (err) {
        alert("File upload failed");
        return;
      }
    }

    try {
      await axios.put("/api/messages", {
        wallet,
        reply: replyData.text,
        attachmentUrl,
      });

      alert("Reply sent");
      setReplies((prev) => ({ ...prev, [wallet]: { text: "", file: null } }));
      fetchMessages();
    } catch (err) {
      console.error("Failed to send reply:", err);
    }
  };

  return (
    <div className="text-white space-y-6">
      <h2 className="text-2xl font-bold">User Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-400">No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.wallet}
            className="bg-gray-800 rounded p-4 shadow-md border border-gray-700"
          >
            <div className="mb-2 text-sm text-gray-400">
              <span className="font-bold">Wallet:</span> {msg.wallet} <br />
              {msg.name && (
                <>
                  <span className="font-bold">Name:</span> {msg.name} <br />
                </>
              )}
              {msg.email && (
                <>
                  <span className="font-bold">Email:</span> {msg.email} <br />
                </>
              )}
              <span className="font-bold">Started:</span>{" "}
              {new Date(msg.created).toLocaleString()}
            </div>

            <div className="bg-gray-900 p-3 rounded space-y-2 max-h-72 overflow-y-auto text-sm">
              {msg.thread.map((entry, idx) => (
                <div
                  key={idx}
                  className={`${
                    entry.from === "admin" ? "text-green-400" : "text-blue-400"
                  }`}
                >
                  <div>
                    <strong>{entry.from === "admin" ? "Admin" : "User"}:</strong>{" "}
                    {entry.text}
                  </div>
                  {entry.attachmentUrl && (
                    <div className="mt-1">
                      <a
                        href={entry.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-yellow-400"
                      >
                        View Attachment
                      </a>
                    </div>
                  )}
                  <div className="text-gray-500 text-xs">
                    {new Date(entry.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <textarea
                className="w-full bg-gray-700 p-2 rounded text-white"
                rows={2}
                placeholder="Write a reply..."
                value={replies[msg.wallet]?.text || ""}
                onChange={(e) =>
                  setReplies((prev) => ({
                    ...prev,
                    [msg.wallet]: {
                      ...(prev[msg.wallet] || {}),
                      text: e.target.value,
                    },
                  }))
                }
              />
              <input
                type="file"
                accept="image/*,.pdf,.zip,.log"
                onChange={(e) =>
                  setReplies((prev) => ({
                    ...prev,
                    [msg.wallet]: {
                      ...(prev[msg.wallet] || {}),
                      file: e.target.files?.[0] || null,
                    },
                  }))
                }
              />
              <button
                onClick={() => handleReply(msg.wallet)}
                className="mt-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Send Reply
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
