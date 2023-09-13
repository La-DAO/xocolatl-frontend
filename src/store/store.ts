import { writable, derived } from "svelte/store";
import { connected, chainId, provider } from "svelte-ethers-store";

import type { Writable } from "svelte/store";

import { chains } from "../chains";

export const accountModalHidden = writable(true);

export const isRighNetwork = derived(
  [connected, chainId],
  ([$connected, $chainId]) => {
    if ($connected && $chainId in chains) {
      return true;
    } else return false;
  },
);

export const blockExplorerURL = derived([chainId], ([$chainId]) => {
  if ($chainId && $chainId in chains) {
    return chains[$chainId].blockExplorerURL;
  } else return chains[4].blockExplorerURL;
});

export const selectedPage = writable("home");

export const selectedTab = writable("deposit");

export const providerType = derived([provider], ([$provider]) => {
  if ($provider && "provider" in $provider) {
    // @ts-ignore:next-line
    if ("isMetaMask" in $provider.provider) {
      localStorage.setItem("providerType", "metamask");
      return "metamask";
      // @ts-ignore:next-line
    } else if ("wc" in $provider.provider) {
      localStorage.setItem("providerType", "walletconnect");

      return "walletconnect";
    }
  }
  return "unknown";
});

interface PendingTx {
  hash: string;
  status: string;
}

function createPendingTxs() {
  const pendingTxs: Writable<Array<PendingTx>> = writable([]);

  const closeModal = (txHash: string) =>
    pendingTxs.update((txs) => {
      txs = txs.filter((tx) => tx.hash !== txHash);
      return txs;
    });

  return {
    ...pendingTxs,
    monitor: (txHash: string) =>
      pendingTxs.update((txs) => [...txs, { hash: txHash, status: "pending" }]),
    updateStatus: (txHash: string, newStatus: string) =>
      pendingTxs.update((txs: PendingTx[]) => {
        const i = txs.findIndex((tx: PendingTx) => tx.hash === txHash);
        if (i !== -1) {
          txs[i].status = newStatus;
          // close modal after delay for animation if completed or dailed
          if (newStatus === "failed" || newStatus === "completed") {
            setTimeout(() => closeModal(txHash), 10000);
          }
        } else {
          throw new Error("TXHash not found");
        }
        return txs;
      }),
    closeModal: (txHash: string) => closeModal(txHash),
  };
}

export const pendingTxs = createPendingTxs();
