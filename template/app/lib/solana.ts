// solana.ts — @solana/kit RPC helpers for on-chain data
// These are server-side utilities (call from API routes, not client components).
// Built on @solana/kit — no legacy @solana/web3.js dependency.

import { createSolanaRpc } from '@solana/kit';

// ✅ CUSTOMIZE: Point to your preferred RPC endpoint
// Options:
//   mainnet: 'https://api.mainnet-beta.solana.com'
//   devnet:  'https://api.devnet.solana.com'
//   custom:  process.env.RPC_URL (recommended for production)
const RPC_URL = process.env.RPC_URL ?? 'https://api.mainnet-beta.solana.com';

const rpc = createSolanaRpc(RPC_URL);

/**
 * Get current epoch information
 * Returns epoch number, slot index, slot height, and progress percentage.
 */
export async function getEpochInfo() {
  const info = await rpc.getEpochInfo().send();
  return {
    epoch: info.epoch,
    slotIndex: info.slotIndex,
    slotsInEpoch: info.slotsInEpoch,
    absoluteSlot: info.absoluteSlot,
    progressPct: Number(((info.slotIndex * 100n) / info.slotsInEpoch).toString()),
  };
}

/**
 * Get circulating supply of any SPL token
 * @param mint - The token mint address (base58)
 * Returns uiAmount (human-readable) and raw amount.
 */
export async function getTokenSupply(mint: string) {
  const { value } = await rpc
    .getTokenSupply(mint as Parameters<typeof rpc.getTokenSupply>[0])
    .send();
  return {
    uiAmount: value.uiAmount,
    amount: value.amount,
    decimals: value.decimals,
  };
}

/**
 * Get SOL balance of an address in lamports
 * @param address - Base58 wallet or program address
 */
export async function getLamportBalance(address: string): Promise<bigint> {
  const { value } = await rpc
    .getBalance(address as Parameters<typeof rpc.getBalance>[0])
    .send();
  return value;
}

/**
 * Get current slot height
 */
export async function getCurrentSlot(): Promise<bigint> {
  return rpc.getSlot().send();
}

/**
 * Get inflation rate (foundation, validator, total)
 */
export async function getInflationRate() {
  return rpc.getInflationRate().send();
}
