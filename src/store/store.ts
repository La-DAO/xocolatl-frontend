import { writable, derived } from 'svelte/store';
import { connected, chainId } from 'svelte-ethers-store';

import type { Writable } from 'svelte/store';

export const isRighNetwork = derived(
	[connected, chainId],
	([$connected, $chainId]) => {
		if ($connected && ($chainId===4 || $chainId === '0x4')) {
			return true;
		} else return false;
	}
);

export const selectedTab = writable('deposit');

interface PendingTx {
	hash: string;
	status: string;
}

function createPendingTxs() {
	const pendingTxs: Writable<Array<PendingTx>> = writable([]);

	const closeModal = (txHash: string) => pendingTxs.update(txs => {
		txs = txs.filter(tx => tx.hash !== txHash);
		return txs;
	});

	return {
		...pendingTxs,
		monitor: (txHash: string) => pendingTxs.update(txs => [...txs, {hash: txHash, status: 'pending'}]),
		updateStatus: (txHash: string, newStatus: string) => pendingTxs.update((txs: PendingTx[]) => {
			const i = txs.findIndex((tx: PendingTx) => tx.hash === txHash);
			if(i !== -1) {
				txs[i].status = newStatus;
				// close modal after delay for animation if completed or dailed
				if (newStatus === 'failed' || newStatus === 'completed') {
					setTimeout(()=>closeModal(txHash), 1000);
				} 
			} else {
				throw new Error('TXHash not found');
			}
			return txs;
		}),
		closeModal: (txHash: string) => closeModal(txHash)	
	};
}

export const pendingTxs = createPendingTxs();



