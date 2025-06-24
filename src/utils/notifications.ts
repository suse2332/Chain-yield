// utils/notifications.ts

export const notifyAdmin = async (message: string) => {
  const botToken = '8015502327:AAEDo5K3h2oSaqPZS9M8hZcg_UKGlnQcwQc';
  const chatId = '2074063801'; // Your Telegram ID
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();
    if (!result.ok) {
      console.error('Telegram error:', result);
    }
  } catch (err) {
    console.error('Failed to send Telegram message:', err);
  }
};
