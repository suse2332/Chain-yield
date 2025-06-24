// src/utils/constants.ts

export const VIP_TIERS = [
  {
    index: 0,
    name: 'Basic',
    minDeposit: 100,
    maxDeposit: 999,
    dailyInterest: 0,
    description: 'Entry-level deposit (no VIP benefits yet)',
  },
  {
    index: 1,
    name: 'Iron',
    minDeposit: 1000,
    maxDeposit: 9999,
    dailyInterest: 0.007, // 0.7%
    description: 'Solid start, daily compounding begins',
  },
  {
    index: 2,
    name: 'Bronze',
    minDeposit: 10000,
    maxDeposit: 99999,
    dailyInterest: 0.009, // 0.9%
    description: 'Stronger yield and visible progress',
  },
  {
    index: 3,
    name: 'Silver',
    minDeposit: 100000,
    maxDeposit: 299999,
    dailyInterest: 0.011, // 1.1%
    description: 'Trusted tier with great daily returns',
  },
  {
    index: 4,
    name: 'Gold',
    minDeposit: 300000,
    maxDeposit: 499999,
    dailyInterest: 0.013, // 1.3%
    description: 'Premium access with rising growth',
  },
  {
    index: 5,
    name: 'Platinum',
    minDeposit: 500000,
    maxDeposit: 999999,
    dailyInterest: 0.015, // 1.5%
    description: 'Exclusive bracket, excellent earning rate',
  },
  {
    index: 6,
    name: 'Diamond',
    minDeposit: 1000000,
    maxDeposit: 2999999,
    dailyInterest: 0.017, // 1.7%
    description: 'Elite investor tier, top-tier stability',
  },
  {
    index: 7,
    name: 'Black Diamond',
    minDeposit: 3000000,
    maxDeposit: 4999999,
    dailyInterest: 0.0198, // 1.98%
    description: 'VIP inner circle, prestige meets growth',
  },
  {
    index: 8,
    name: 'Crown',
    minDeposit: 5000000,
    maxDeposit: Number.MAX_SAFE_INTEGER,
    dailyInterest: 0.027, // 2.7%
    description: 'Ultra-exclusive tier — legendary status',
  },
];

// Replace with your actual deployed contract address
export const CONTRACT_ADDRESS = '0x5d048243fCC69ee034719bF3e10dd45eD6640a03';

// USDC Token address on Ethereum Mainnet (or Base mainnet if different)
export const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

// Other constants you might need
export const INTEREST_PAYOUTS_PER_DAY = 6; // every 4 hours

export const ADMIN_WALLET_ADDRESS = '0xe13394a883e2F507AF2c828184d64c4ce2abFa71';

