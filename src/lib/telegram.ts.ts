// /lib/telegram.ts
import axios from "axios";

// Hardcoded credentials — safe only for local testing
const TELEGRAM_BOT_TOKEN = "8015502327:AAEDo5K3h2oSaqPZS9M8hZcg_UKGlnQcwQc";
const TELEGRAM_CHAT_ID = "2074063801";

export async function sendTelegramAlert(message: string) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });
  } catch (err) {
    console.error("❌ Telegram alert failed:", err);
  }
}
