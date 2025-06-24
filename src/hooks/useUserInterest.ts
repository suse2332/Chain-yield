import { useEffect, useState } from "react";

// Payout interval every 4 hours (14400 seconds)
const INTERVAL = 4 * 60 * 60;

export function useCountdownToNextPayout() {
  const [timeLeft, setTimeLeft] = useState(INTERVAL);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const nextPayout = Math.ceil(now / INTERVAL) * INTERVAL;
    const initial = nextPayout - now;

    setTimeLeft(initial);

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : INTERVAL));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return {
    hours,
    minutes,
    seconds,
    formatted: `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(
      seconds
    ).padStart(2, "0")}s`,
  };
}

