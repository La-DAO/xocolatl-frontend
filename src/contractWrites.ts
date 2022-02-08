import { get } from 'svelte/store';
import { mockWETHAddress, houseOfReserveAddress, houseOfCoinAddress } from './abis';
import { backedTokenID, maxApproveAmount } from './constants';

import { pendingTxs } from './store/store';
import { 
	WETHDepositInputAmountBigNum,
	WETHWithdrawInputAmountBigNum,
	XOCMintInputAmountBigNum,
	XOCBurnInputAmountBigNum
} from './store/userInput';
import { fetchAllDisplayData } from './contractReads';
import { checkContractCallPrereqs } from './utils';

import type { ContractTransaction  } from 'ethers';
import type { TransactionReceipt } from '@ethersproject/providers';

import { 
	mockWETHContract,
	XOCContract,
	houseOfCoinContract,
	houseOfReserveContract,
	wrappedHouseOfCoinContract,
	wrappedHouseOfReserveContract
} from './store/contracts';


// waits for user transaction and updates store for tx progress UI display
async function handleTxReceipt(tx: ContractTransaction) {
	// add to tx list of pending txs
	pendingTxs.monitor(tx.hash);

	let receipt: TransactionReceipt;
	try {
		receipt = await tx.wait();
		if (receipt.status) {
			pendingTxs.updateStatus(tx.hash, 'completed');
		} else {
			pendingTxs.updateStatus(tx.hash, 'failed');
		}
	} catch (e) {
		pendingTxs.updateStatus(tx.hash, 'failed');
		throw e;
	}

	// fetch new display data
	fetchAllDisplayData();
}

export async function approveWETH() {
	checkContractCallPrereqs();
	const tx = await get(mockWETHContract).approve(houseOfReserveAddress, maxApproveAmount);
	handleTxReceipt(tx);
}


export async function depositWETH() {
	checkContractCallPrereqs();
	const amount = get(WETHDepositInputAmountBigNum);
	if(amount) {
		const tx = await get(houseOfReserveContract).deposit(amount);
		handleTxReceipt(tx);
	} else {
		throw new Error('Invalid WETH deposit amount input');
	}
}

export async function mintXOC() {
	checkContractCallPrereqs();
	const amount = get(XOCMintInputAmountBigNum);
	if (amount) {
		const tx = await get(wrappedHouseOfCoinContract).mintCoin(mockWETHAddress, houseOfReserveAddress, amount);
		handleTxReceipt(tx);
	} else {
		throw new Error('Invalid XOC mint amount input');
	}

}

// approve XOC transfers to houseOfCoin for payback
export async function approveXOC() {
	checkContractCallPrereqs();
	const tx = await get(XOCContract).approve(houseOfCoinAddress, maxApproveAmount);
	handleTxReceipt(tx);
}

export async function burnXOC() {
	checkContractCallPrereqs();
	const amount = get(XOCBurnInputAmountBigNum);
	if (amount) {
		const tx = await get(houseOfCoinContract).paybackCoin(backedTokenID, amount);
		handleTxReceipt(tx);
	} else {
		throw new Error('Invalid XOC burn amount input');
	}
}

export async function withdrawWETH() {
	checkContractCallPrereqs();
	const amount = get(WETHWithdrawInputAmountBigNum);
	if (amount) {
		const tx = await get(wrappedHouseOfReserveContract).withdraw(amount);
		handleTxReceipt(tx);
	} else {
		throw new Error('Invalid WETH withdraw amount input');
	}
}

