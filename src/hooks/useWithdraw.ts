export async function requestWithdrawal(message: string) {
  await fetch("/api/notify-admin", {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: { "Content-Type": "application/json" },
  });
}
