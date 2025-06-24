// utils/getVipTier.ts
import { vipTiers } from "@/constants/vipTiers";

export function getVipTierByDeposit(deposit: number) {
  return vipTiers.find(
    (tier) =>
      deposit >= tier.minDeposit &&
      (tier.maxDeposit === null || deposit <= tier.maxDeposit)
  );
}
