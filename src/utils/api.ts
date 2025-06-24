// src/utils/api.ts
import axios from 'axios';

// Create axios instance with your backend base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request a withdrawal (user -> backend)
export const requestWithdrawal = async (walletAddress: string, amount: number) => {
  try {
    const response = await api.post('/withdrawals', {
      walletAddress,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error('Withdrawal request failed:', error);
    throw error;
  }
};

// Notify admin (backend triggers Telegram message)
export const notifyAdmin = async (message: string) => {
  try {
    const response = await api.post('/admin/notify', {
      message,
    });
    return response.data;
  } catch (error) {
    console.error('Admin notification failed:', error);
    throw error;
  }
};

// Fetch user data like deposits, tier, accrued interest
export const fetchUserData = async (walletAddress: string) => {
  try {
    const response = await api.get(`/users/${walletAddress}`);
    return response.data;
  } catch (error) {
    console.error('Fetch user data failed:', error);
    throw error;
  }
};
