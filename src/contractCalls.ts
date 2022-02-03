import { ethers } from 'ethers';
import { WrapperBuilder } from 'redstone-evm-connector';

import { get } from 'svelte/store';
import { signer } from 'svelte-ethers-store';
import { mockWETHABI, mockWETHAddress, houseOfReserveABI, houseOfReserveAddress, houseOfCoinAddress, houseOfCoinABI, XOCAddress, XOCABI } from './abis';
import { backedTokenID, maxBigNum } from './constants';

import { 
	pendingTxs,
	WETHDepositInputAmountBigNum,
	WETHWithdrawInputAmountBigNum,
	XOCMintInputAmountBigNum,
	XOCBurnInputAmountBigNum
} from './store';
import { fetchAllDisplayData } from './contractReads';
import { checkContractCallPrereqs } from './utils';

import type { ContractTransaction  } from 'ethers';
import type { TransactionReceipt } from '@ethersproject/providers';


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
	const mockWETHContract = new ethers.Contract(mockWETHAddress, mockWETHABI, get(signer));
	const tx = await mockWETHContract.approve(houseOfReserveAddress, maxBigNum);
	handleTxReceipt(tx);
}


export async function depositWETH() {
	checkContractCallPrereqs();
	const houseOfReserveContract = new ethers.Contract(houseOfReserveAddress, houseOfReserveABI, get(signer));
	const amount = get(WETHDepositInputAmountBigNum);
	if(amount) {
		const tx = await houseOfReserveContract.deposit(amount);
		handleTxReceipt(tx);
	} else {
		throw new Error('Invalid WETH deposit amount input');
	}
}

export async function mintXOC() {
	checkContractCallPrereqs();
	const houseOfCoinContract = new ethers.Contract(houseOfCoinAddress, houseOfCoinABI, get(signer));
	const amount = get(XOCMintInputAmountBigNum);
	const wrappedContract = WrapperBuilder.wrapLite(houseOfCoinContract).usingPriceFeed('redstone-stocks');
	if (amount) {
		const tx = await wrappedContract.mintCoin(mockWETHAddress, houseOfReserveAddress, amount);
		handleTxReceipt(tx);
	} else {
		throw new Error('Invalid XOC mint amount input');
	}

}

// approve XOC transfers to houseOfCoin for payback
export async function approveXOC() {
	checkContractCallPrereqs();
	const XOCContract = new ethers.Contract(XOCAddress, XOCABI, get(signer));
	const tx = await XOCContract.approve(houseOfCoinAddress, maxBigNum);
	handleTxReceipt(tx);
}

export async function burnXOC() {
	checkContractCallPrereqs();
	const houseOfCoinContract = new ethers.Contract(houseOfCoinAddress, houseOfCoinABI, get(signer));
	const amount = get(XOCBurnInputAmountBigNum);
	if (amount) {
		const tx = await houseOfCoinContract.paybackCoin(backedTokenID, amount);
		handleTxReceipt(tx);
	} else {
		throw new Error('Invalid XOC burn amount input');
	}
}

export async function withdrawWETH() {
	checkContractCallPrereqs();
	const houseOfReserveContract = new ethers.Contract(houseOfReserveAddress, houseOfReserveABI, get(signer));
	const amount = get(WETHWithdrawInputAmountBigNum);
	const wrappedContract = WrapperBuilder.wrapLite(houseOfReserveContract).usingPriceFeed('redstone-stocks');
	if (amount) {
		const tx = await wrappedContract.withdraw(amount);
		handleTxReceipt(tx);
	} else {
		throw new Error('Invalid WETH withdraw amount input');
	}
}

