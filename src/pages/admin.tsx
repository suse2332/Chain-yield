import { useEffect } from "react";
import { useRouter } from "next/router";
import { useWalletContext } from "@/context/WalletContext";
import { useAdminContext } from "@/context/AdminContext";
import AdminHeader from "@/components/AdminPanel/AdminHeader";
import AdminStats from "@/components/AdminPanel/AdminStats";
import WithdrawalRequestsTable from "@/components/AdminPanel/WithdrawalRequestsTable";
import EmergencyWithdraw from "@/components/AdminPanel/EmergencyWithdraw";
import Notifications from "@/components/AdminPanel/Notifications";

export default function AdminPage() {
  const { walletAddress } = useWalletContext();
  const { isAdmin, setIsAdmin } = useAdminContext();
  const router = useRouter();

  // Replace with your real admin wallet address
  const ADMIN_WALLET = "0xe13394a883e2F507AF2c828184d64c4ce2abFa71".toLowerCase();

  useEffect(() => {
    if (!walletAddress) {
      router.push("/"); // redirect if not connected
    } else if (walletAddress.toLowerCase() !== ADMIN_WALLET) {
      router.push("/"); // redirect if not admin
    } else {
      setIsAdmin(true); // set admin flag
    }
  }, [walletAddress]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <AdminHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AdminStats />
        <EmergencyWithdraw />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Pending Withdrawals</h2>
        <WithdrawalRequestsTable />
      </div>
      <Notifications />
    </div>
  );
}
