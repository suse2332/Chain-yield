import { useWallet } from "./useWallet";

const ADMIN_WALLET = "0xe13394a883e2F507AF2c828184d64c4ce2abFa71";

export function useAdminAuth() {
  const { address } = useWallet();
  return address?.toLowerCase() === ADMIN_WALLET.toLowerCase();
}
