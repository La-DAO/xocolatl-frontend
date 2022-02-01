import { writable, derived } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { utils } from "ethers";

export const selectedTab = writable("deposit");

interface PendingTx {
	hash: string;
	status: string;
};

const testTx = {hash: "testhash", status: "pending"}

const testTxFailed = {hash: "onethatfailed", status: "pending"}

function createPendingTxs() {
	const pendingTxs: Writable<Array<PendingTx>> = writable([testTx, testTxFailed]);

	const closeModal = (txHash: string) => pendingTxs.update(txs => {
			txs = txs.filter(tx => tx.hash !== txHash);
			return txs;
	})

	return {
		...pendingTxs,
		updateStatus: (txHash: string, newStatus: string) => pendingTxs.update(txs => {
			const i = txs.findIndex((tx: PendingTx) => tx.hash === txHash);
			if(i !== -1) {
				txs[i].status = newStatus;
				// close modal after delay for animation if completed or dailed
				if (newStatus === "failed" || newStatus === "completed") {
					setTimeout(()=>closeModal(txHash), 1000);
					return txs
				} 
			} else {
				throw new Error("TXHash not found");
			}
		}),
		closeModal: (txHash: string) => closeModal(txHash)	
	};
}

export const pendingTxs = createPendingTxs();

// user inputs
export const WETHDepositInputAmount = writable(0);
export const WETHDepositInputAmountBigNum = derived(
	WETHDepositInputAmount,
	$WETHDepositInputAmount => {
		WETHDepositInputError.set("");
		if (!Number.isFinite($WETHDepositInputAmount)){
			WETHDepositInputError.set("Cantidad invalida");
		} else if ($WETHDepositInputAmount) {
			try {
				return utils.parseEther($WETHDepositInputAmount.toString());
			} catch(e) {
				WETHDepositInputError.set("Cantidad invalida");
			}
		} else if ($WETHDepositInputAmount === 0){
			return utils.parseEther("0");
		} else {
			WETHDepositInputError.set("Cantidad invalida");
		};
	}
);
export const WETHDepositInputError = writable("");

export const WETHWithdrawInputAmount = writable(0);
export const WETHWithdrawInputAmountBigNum = derived(
	WETHWithdrawInputAmount,
	$WETHWithdrawInputAmount => {
		WETHWithdrawInputError.set("");
		if (!Number.isFinite($WETHWithdrawInputAmount)){
			WETHWithdrawInputError.set("Cantidad invalida");
		} else if ($WETHWithdrawInputAmount) {
			try {
				return utils.parseEther($WETHWithdrawInputAmount.toString());
			} catch(e) {
				WETHWithdrawInputError.set("Cantidad invalida");
			}
		} else if ($WETHWithdrawInputAmount === 0){
			return utils.parseEther("0");
		} else {
			WETHWithdrawInputError.set("Cantidad invalida");
		};
	}
);
export const WETHWithdrawInputError = writable("");



export const XOCMintInputAmount = writable(0);
export const XOCMintInputAmountBigNum = derived(
	XOCMintInputAmount,
	$XOCMintInputAmount => {
		XOCMintInputError.set("");
		if (!Number.isFinite($XOCMintInputAmount)){
			XOCMintInputError.set("Cantidad invalida");
		} else if ($XOCMintInputAmount) {
			try {
				return utils.parseEther($XOCMintInputAmount.toString());
			} catch(e) {
				XOCMintInputError.set("Cantidad invalida");
			}
		} else if ($XOCMintInputAmount === 0){
			return utils.parseEther("0");
		} else {
			XOCMintInputError.set("Cantidad invalida");
		};
	}
);
export const XOCMintInputError = writable("");

export const XOCBurnInputAmount = writable(0);
export const XOCBurnInputAmountBigNum = derived(
	XOCBurnInputAmount,
	$XOCBurnInputAmount => {
		XOCBurnInputError.set("");
		if (!Number.isFinite($XOCBurnInputAmount)){
			XOCBurnInputError.set("Cantidad invalida");
		} else if ($XOCBurnInputAmount) {
			try {
				return utils.parseEther($XOCBurnInputAmount.toString());
			} catch(e) {
				XOCBurnInputError.set("Cantidad invalida");
			}
		} else if ($XOCBurnInputAmount === 0){
			return utils.parseEther("0");
		} else {
			XOCBurnInputError.set("Cantidad invalida");
		};
	}
);
export const XOCBurnInputError = writable("");

// display data from contracts
export const userWETHBalance = writable("-");
export const userWETHDepositBalance = writable("-");
export const userWETHMaxWithdrawal = writable("-");
export const userXOCBalance = writable("-");
export const userXOCDebt = writable("-");
export const userXOCMintingPower = writable("-");

