// /pages/api/messages.ts

import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const FILE_PATH = path.join(process.cwd(), "data", "messages.json");

function readMessages() {
  if (!fs.existsSync(FILE_PATH)) return [];
  const raw = fs.readFileSync(FILE_PATH, "utf8");
  return JSON.parse(raw);
}

function writeMessages(data: any) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === "GET") {
    const data = readMessages();
    return res.status(200).json(data);
  }

  if (method === "POST") {
    const { wallet, name, email, message, attachmentUrl } = req.body;

    if (!wallet || !message) {
      return res.status(400).json({ error: "Missing wallet or message." });
    }

    const messages = readMessages();
    const existing = messages.find((m: any) => m.wallet === wallet);

    const newEntry = {
      from: "user",
      text: message,
      timestamp: Date.now(),
      attachmentUrl: attachmentUrl || null,
    };

    if (existing) {
      existing.thread.push(newEntry);
    } else {
      messages.push({
        wallet,
        name,
        email,
        created: Date.now(),
        thread: [newEntry],
      });
    }

    writeMessages(messages);
    return res.status(201).json({ success: true });
  }

  if (method === "PUT") {
    const { wallet, reply, attachmentUrl } = req.body;

    if (!wallet || !reply) {
      return res.status(400).json({ error: "Missing wallet or reply." });
    }

    const messages = readMessages();
    const target = messages.find((m: any) => m.wallet === wallet);

    if (!target) {
      return res.status(404).json({ error: "User thread not found." });
    }

    target.thread.push({
      from: "admin",
      text: reply,
      timestamp: Date.now(),
      attachmentUrl: attachmentUrl || null,
    });

    writeMessages(messages);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
