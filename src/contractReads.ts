import { utils } from 'ethers';
import { get } from 'svelte/store';
import { signerAddress, chainId, signer } from 'svelte-ethers-store';

import { checkContractCallPrereqs } from './utils';

import {
	WETHContract,
	XOCContract,
	assetsAccountantContract,
	houseOfCoinContract,
	wrappedHouseOfCoinContract,
	houseOfReserveContract,
	wrappedHouseOfReserveContract
} from './store/contracts';

import {
	userNativeTokenBalance,
	userWETHAllowance,
	userWETHBalance,
	userWETHDepositBalance,
	userWETHMaxWithdrawal,
	userXOCAllowance,
	userXOCBalance,
	userXOCMintingPower,
	userXOCDebt,
	WETHToXOC,
	userHealthRatio,
	liquidationThreshold,
	liquidationFactor,
	maxLTVFactor,
	globalBase
} from './store/contractData';

import { chains } from './chains';


// async function fetchBitso(): Promise<any> {
// 	const uri = 'https://api.bitso.com/v3/ticker/?book=eth_mxn';
// 	const response = await window.fetch(uri, );
// 	const rObject = await response.json();
// 	const lastPrice: number = rObject.payload.last;
// 	return utils.parseUnits(lastPrice.toString(), 8);
// }

export async function getWETHtoXOCRate() {
	checkContractCallPrereqs();
	let price;
	try {
		// returned price has 8 decimals
		price = await get(houseOfReserveContract)!.getLatestPrice();
	} catch (e) {
		console.log(e);
	}
	WETHToXOC.set(price);
}

export async function getUserNativeTokenBalance(): Promise<void> {
	const nativeTokenBalance = await get(signer)!.getBalance();
	userNativeTokenBalance.set(nativeTokenBalance);
}

export async function getWETHAllowance() {
	checkContractCallPrereqs();
	const allowance = await get(WETHContract)!.allowance(get(signerAddress), chains[get(chainId)].houseOfReserveAddress);
	userWETHAllowance.set(allowance);
}

export async function getUserWETHBalance(): Promise<void> {
	checkContractCallPrereqs();
	const balance = await get(WETHContract)!.balanceOf(get(signerAddress));
	userWETHBalance.set(balance);
}

async function getUserWETHDepositBalance(): Promise<void> {
	checkContractCallPrereqs();
	const fetchedBalance = await get(assetsAccountantContract)!.balanceOf(get(signerAddress), chains[get(chainId)].reserveTokenID);
	userWETHDepositBalance.set(fetchedBalance);
}

export async function getMaxWETHWithdrawal() {
	checkContractCallPrereqs();
	let fetchedAmount;
	try {
		fetchedAmount = await get(houseOfReserveContract)!.checkMaxWithdrawal(get(signerAddress));
	} catch (error) {
		fetchedAmount = await get(wrappedHouseOfReserveContract)!.checkMaxWithdrawal(get(signerAddress));
	}
	 
	userWETHMaxWithdrawal.set(fetchedAmount);
}


async function getXOCBalance() {
	checkContractCallPrereqs();
	const fetchedBalance = await get(XOCContract)!.balanceOf(get(signerAddress));
	userXOCBalance.set(fetchedBalance);
}

export async function getXOCMintingPower() {
	checkContractCallPrereqs();
	let fetchedAmount;
	try {
		fetchedAmount = await get(houseOfCoinContract)!.checkRemainingMintingPower(get(signerAddress), chains[get(chainId)].houseOfReserveAddress);
	} catch (error) {
		fetchedAmount = await get(wrappedHouseOfCoinContract)!.checkRemainingMintingPower(get(signerAddress), chains[get(chainId)].houseOfReserveAddress);
	}
	userXOCMintingPower.set(fetchedAmount);
}

export async function getXOCAllowance() {
	checkContractCallPrereqs();
	const allowance = await get(XOCContract)!.allowance(get(signerAddress), chains[get(chainId)].houseOfCoinAddress);
	userXOCAllowance.set(allowance);
}

export async function getXOCDebt() {
	checkContractCallPrereqs();
	const fetchedBalance = await get(assetsAccountantContract)!.balanceOf(get(signerAddress), chains[get(chainId)].backedTokenID);
	userXOCDebt.set(fetchedBalance);
}

export async function getHealthRatio() {
	checkContractCallPrereqs();
	// contract reverts if no WETH deposits or no debt
	const deposit = get(userWETHDepositBalance);
	const debt = get(userXOCDebt);
	if (deposit && deposit.gt(0) && debt && debt.gt(0)) {
		let fetchedAmount;
		try {
			fetchedAmount = await get(houseOfCoinContract)!.computeUserHealthRatio(get(signerAddress), chains[get(chainId)].houseOfReserveAddress);
		} catch (error) {
			fetchedAmount = await get(wrappedHouseOfCoinContract)!.computeUserHealthRatio(get(signerAddress), chains[get(chainId)].houseOfReserveAddress);
		}
		userHealthRatio.set(fetchedAmount);
	}
}

export async function getLiquidationParams() {
	checkContractCallPrereqs();
	const fetchedValues = await get(houseOfCoinContract)!.getLiqParams();
	liquidationThreshold.set(fetchedValues.liquidationThreshold);
	globalBase.set(utils.parseUnits("1", 18));
}

export async function getLiquidationFactor() {
	checkContractCallPrereqs();
	const fetchedValue = await get(houseOfReserveContract)!.liquidationFactor();
	liquidationFactor.set(fetchedValue);
}

export async function getMaxLTVFactor() {
	checkContractCallPrereqs();
	const fetchedValue = await get(houseOfReserveContract)!.maxLTVFactor();
	maxLTVFactor.set(fetchedValue);
}

// TODO: fetch with array of promises and retry failed
export async function fetchAllDisplayData() {
	checkContractCallPrereqs();
	getWETHtoXOCRate();
	getUserNativeTokenBalance();
	getWETHAllowance();
	getUserWETHDepositBalance();
	getMaxWETHWithdrawal();
	getXOCAllowance();
	getXOCBalance();
	getXOCMintingPower();

	getMaxLTVFactor();
	getLiquidationParams();
	getLiquidationFactor();

	await getUserWETHBalance();
	await getXOCDebt();
	getHealthRatio();
}
