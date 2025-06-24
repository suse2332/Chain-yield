import { useEffect, useState } from "react";

const getNextInterval = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  const remainder = 60 - (minutes % 4) * 15;
  now.setMinutes(minutes + remainder);
  return now;
};

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const target = getNextInterval();
      const diff = target.getTime() - now.getTime();

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${minutes}m ${seconds}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-sm text-gray-400 mt-2">
      Next yield in <span className="font-bold text-white">{timeLeft}</span>
    </div>
  );
}