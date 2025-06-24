import { useEffect, useState } from 'react';
import axios from 'axios';

export interface WithdrawalRequest {
  id: string;
  wallet: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

export function useWithdrawals(walletAddress: string | null) {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/api/withdrawals?wallet=${walletAddress}`);
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch withdrawal requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [walletAddress]);

  return {
    requests,
    loading,
    error,
  };
}
