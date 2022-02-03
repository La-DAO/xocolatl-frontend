import { ethers } from 'ethers';
import { WrapperBuilder } from 'redstone-evm-connector';

import { get } from 'svelte/store';
import { provider, signer, signerAddress} from 'svelte-ethers-store';
import { checkContractCallPrereqs } from './utils';
import { reserveTokenID } from './constants';
import { 
	userWETHAllowance,
	userWETHBalance,
	userWETHDepositBalance,
	userWETHMaxWithdrawal,
	userXOCAllowance,
	userXOCBalance,
	userXOCMintingPower,
	/*userXOCDebt,*/
} from './store';
import {
	mockWETHABI,
	mockWETHAddress,
	houseOfReserveABI,
	houseOfReserveAddress,
	houseOfCoinAddress,
	houseOfCoinABI,
	assetsAccountantAddress,
	assetsAccountantABI,
	XOCAddress,
	XOCABI
} from './abis';

//TODO: store
export async function getWETHAllowance() {
	checkContractCallPrereqs();
	const mockWETHContract = new ethers.Contract(mockWETHAddress, mockWETHABI, get(provider));
	const allowance = await mockWETHContract.allowance(get(signerAddress), houseOfReserveAddress);
	userWETHAllowance.set(allowance);
}


export async function getUserWETHBalance(): Promise<void> {
	checkContractCallPrereqs();
	const mockWETHContract = new ethers.Contract(mockWETHAddress, mockWETHABI, get(provider));
	const balance = await mockWETHContract.balanceOf(get(signerAddress));
	userWETHBalance.set(ethers.utils.formatEther(balance));
}


async function getUserWETHDepositBalance(): Promise<void> {
	checkContractCallPrereqs();
	const assetsAccountantContract = new ethers.Contract(assetsAccountantAddress, assetsAccountantABI, get(provider));
	const fetchedBalance = await assetsAccountantContract.balanceOf(get(signerAddress), reserveTokenID);
	userWETHDepositBalance.set(ethers.utils.formatEther(fetchedBalance));
}

async function getMaxWETHWithdrawal() {
	checkContractCallPrereqs();
	const houseOfReserveContract = new ethers.Contract(houseOfReserveAddress, houseOfReserveABI, get(signer));
	const wrappedContract = WrapperBuilder.wrapLite(houseOfReserveContract).usingPriceFeed('redstone-stocks');
	const fetchedAmount = await wrappedContract.checkMaxWithdrawal(get(signerAddress));
	userWETHMaxWithdrawal.set(ethers.utils.formatEther(fetchedAmount));
}


async function getXOCBalance() {
	checkContractCallPrereqs();
	const XOCContract = new ethers.Contract(XOCAddress, XOCABI, get(provider));
	const fetchedBalance = await XOCContract.balanceOf(get(signerAddress));
	userXOCBalance.set(ethers.utils.formatEther(fetchedBalance));
}

async function getXOCMintingPower() {
	const houseOfCoinContract = new ethers.Contract(houseOfCoinAddress, houseOfCoinABI, get(signer));
	const wrappedContract = WrapperBuilder.wrapLite(houseOfCoinContract).usingPriceFeed('redstone-stocks');
	const fetchedAmount = await wrappedContract.checkRemainingMintingPower(get(signerAddress), mockWETHAddress);
	userXOCMintingPower.set(ethers.utils.formatEther(fetchedAmount));
}

//TODO: store
export async function getXOCAllowance() {
	const XOCContract = new ethers.Contract(XOCAddress, XOCABI, get(provider));
	const allowance = await XOCContract.allowance(get(signerAddress), houseOfCoinAddress);
	userXOCAllowance.set(allowance);
}

export function fetchAllDisplayData() {
	checkContractCallPrereqs();

	getWETHAllowance();
	getUserWETHBalance();
	getUserWETHDepositBalance();
	getMaxWETHWithdrawal();
	getXOCAllowance();
	getXOCBalance();
	getXOCMintingPower();
}
