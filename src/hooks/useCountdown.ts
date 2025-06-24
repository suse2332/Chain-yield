import { useEffect, useState } from "react";

export function useCountdown() {
  const [nextTick, setNextTick] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const next = Math.ceil(now / (4 * 3600 * 1000)) * (4 * 3600 * 1000);
      setNextTick(next - now);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return nextTick;
}
