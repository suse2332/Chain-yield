// src/components/CountdownTimer.tsx
import React, { useEffect, useState } from "react";

const getNextInterval = () => {
  const now = new Date();
  const next = new Date();
  const intervalHours = 4;
  const currentHours = now.getUTCHours();
  const nextHours = Math.ceil(currentHours / intervalHours) * intervalHours;
  next.setUTCHours(nextHours, 0, 0, 0);
  if (next <= now) next.setUTCHours(next.getUTCHours() + intervalHours);
  return next;
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const nextInterval = getNextInterval();
      const diff = Math.max(0, Math.floor((nextInterval.getTime() - now.getTime()) / 1000));
      const hrs = Math.floor(diff / 3600).toString().padStart(2, "0");
      const mins = Math.floor((diff % 3600) / 60).toString().padStart(2, "0");
      const secs = (diff % 60).toString().padStart(2, "0");
      setTimeLeft(`${hrs}:${mins}:${secs}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-sm mt-4 text-gray-400">
      Next Interest Update In: <span className="text-yellow-400 font-semibold">{timeLeft}</span>
    </div>
  );
};

export default CountdownTimer;
