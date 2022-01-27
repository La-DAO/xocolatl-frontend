
import { ethers, BigNumber } from "ethers";

import { WrapperBuilder } from "redstone-evm-connector";

import { get } from 'svelte/store';
import { connected, chainId, provider, signer, signerAddress} from 'svelte-ethers-store';
import { mockWETHABI, mockWETHAddress, houseOfReserveABI, houseOfReserveAddress, houseOfCoinAddress, houseOfCoinABI, assetsAccountantAddress, assetsAccountantABI, reserveTokenID, backedTokenID, XOCAddress, XOCABI } from './abis';
import { userWETHBalance, userWETHDepositBalance, userWETHMaxWithdrawal, userXOCBalance, userXOCMintingPower, userXOCDebt } from "./store";

function checkContractCallPrereqs() {
	if(!get(connected)) {
    throw 'Wallet is not connected!';
	} 

	if(get(chainId) !== 42) {
		console.log("chainId ", get(chainId) === 42);
    throw 'Wallet is connected to the wrong network!';
	} 
};

export async function getWETHAllowance() {
	checkContractCallPrereqs();

 	const mockWETHContract = new ethers.Contract(mockWETHAddress, mockWETHABI, get(provider));

	let allowance: BigNumber;
	try {
		allowance = await mockWETHContract.allowance(get(signerAddress), houseOfReserveAddress);
	} catch (e) {
		throw e;
	}
	
	return allowance;
};

export async function approveWETH() {
	checkContractCallPrereqs();

	const approveAmount = ethers.utils.parseUnits("10000000000");

 	const mockWETHContract = new ethers.Contract(mockWETHAddress, mockWETHABI, get(signer));
	
	try {
		await mockWETHContract.approve(houseOfReserveAddress, approveAmount);
	} catch(e) {
		throw e;
	}
};

export async function getUserWETHBalance(): Promise<void> {
	checkContractCallPrereqs();

	let balance: BigNumber;

 	const mockWETHContract = new ethers.Contract(mockWETHAddress, mockWETHABI, get(provider));

	try {
		balance = await mockWETHContract.balanceOf(get(signerAddress));
	} catch(e) {
		throw e;
	}

	 userWETHBalance.set(ethers.utils.formatEther(balance));
}

export async function getUserWETHDepositBalance(): Promise<void> {
	checkContractCallPrereqs();

	let fetchedBalance: BigNumber;

 	const assetsAccountantContract = new ethers.Contract(assetsAccountantAddress, assetsAccountantABI, get(provider));

	try {
		fetchedBalance = await assetsAccountantContract.balanceOf(get(signerAddress), reserveTokenID);
	} catch(e) {
		throw e;
	};
	userWETHDepositBalance.set(ethers.utils.formatEther(fetchedBalance));
};


export async function depositWETH(amount: BigNumber) {
	checkContractCallPrereqs();

 	const houseOfReserveContract = new ethers.Contract(houseOfReserveAddress, houseOfReserveABI, get(signer));
	try {
		await houseOfReserveContract.deposit(amount);
	} catch (e) {
		throw e;
	}
};

export async function mintXOC(amount: BigNumber) {
	checkContractCallPrereqs();

	const houseOfCoinContract = new ethers.Contract(houseOfCoinAddress, houseOfCoinABI, get(signer));

	const wrappedContract = WrapperBuilder.wrapLite(houseOfCoinContract).usingPriceFeed("redstone-stocks");

	try {
		await wrappedContract.mintCoin(mockWETHAddress, houseOfReserveAddress, amount);
	} catch (e) {
		throw e;
	}
};

export async function getMaxWETHWithdrawal() {
	const houseOfReserveContract = new ethers.Contract(houseOfReserveAddress, houseOfReserveABI, get(signer));

	const wrappedContract = WrapperBuilder.wrapLite(houseOfReserveContract).usingPriceFeed("redstone-stocks");

	let fetchedAmount: BigNumber;
	try {
		fetchedAmount = await wrappedContract.checkMaxWithdrawal(get(signerAddress));
	} catch (e) {
		throw e;
	}
	userWETHMaxWithdrawal.set(ethers.utils.formatEther(fetchedAmount));
}

export async function getXOCBalance() {
	const XOCContract = new ethers.Contract(XOCAddress, XOCABI, get(provider));

	let fetchedBalance: BigNumber;
	try {
		fetchedBalance = await XOCContract.balanceOf(get(signerAddress));
	} catch (e) {
		throw e;
	}
	userXOCBalance.set(ethers.utils.formatEther(fetchedBalance));
}

export async function getXOCMintingPower() {
	const houseOfCoinContract = new ethers.Contract(houseOfCoinAddress, houseOfCoinABI, get(signer));
	const wrappedContract = WrapperBuilder.wrapLite(houseOfCoinContract).usingPriceFeed("redstone-stocks");
	let fetchedAmount: BigNumber;
	try {
		fetchedAmount = await wrappedContract.checkRemainingMintingPower(get(signerAddress), mockWETHAddress);
	} catch (e) {
		throw e;
	}
	
	userXOCMintingPower.set(ethers.utils.formatEther(fetchedAmount));
}


export async function getXOCAllowance() {
 	const XOCContract = new ethers.Contract(XOCAddress, XOCABI, get(signer));

	let allowance: BigNumber;
	try {
		allowance = await XOCContract.allowance(get(signerAddress), houseOfCoinAddress);
	} catch (e) {
		throw e;
	}
	
	return allowance;
};

// approve XOC transfers to houseOfCoin for payback
export async function approveXOC() {
	checkContractCallPrereqs();

	const approveAmount = ethers.utils.parseUnits("10000000000000");

 	const XOCContract = new ethers.Contract(XOCAddress, XOCABI, get(signer));
	
	try {
		await XOCContract.approve(houseOfCoinAddress, approveAmount);
	} catch(e) {
		throw e;
	}
};

export async function burnXOC(amount: BigNumber) {
	checkContractCallPrereqs();
	const houseOfCoinContract = new ethers.Contract(houseOfCoinAddress, houseOfCoinABI, get(signer));
	try {
		await houseOfCoinContract.paybackCoin(backedTokenID, amount);
	} catch (e) {
		throw e;
	}
};

export async function withdrawWETH(amount: BigNumber) {
	checkContractCallPrereqs();
	const houseOfReserveContract = new ethers.Contract(houseOfReserveAddress, houseOfReserveABI, get(signer));
	const wrappedContract = WrapperBuilder.wrapLite(houseOfReserveContract).usingPriceFeed("redstone-stocks");
	try {
		await wrappedContract.withdraw(amount);
	} catch (e) {
		throw e;
	}
};

export function fetchAllDisplayData() {
	getUserWETHBalance();
	getUserWETHDepositBalance();
	getMaxWETHWithdrawal();
	getXOCBalance();
	getXOCMintingPower();
};
