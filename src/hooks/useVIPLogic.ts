import { vipTiers } from "@/constants/vipTiers";

export function getVipTier(deposit: number) {
  return vipTiers.find(tier => deposit >= tier.min && deposit <= tier.max);
}
