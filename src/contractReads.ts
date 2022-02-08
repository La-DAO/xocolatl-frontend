import { get } from 'svelte/store';
import { signerAddress} from 'svelte-ethers-store';

import { checkContractCallPrereqs } from './utils';
import { reserveTokenID, backedTokenID } from './constants';
import { 
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
	collateralRatioParam
} from './store/contractData';
import {
	mockWETHAddress,
	houseOfReserveAddress,
	houseOfCoinAddress,
} from './abis';

import { 
	mockWETHContract,
	XOCContract,
	assetsAccountantContract,
	houseOfCoinContract,
	wrappedHouseOfCoinContract,
	houseOfReserveContract,
	wrappedHouseOfReserveContract
} from './store/contracts';

async function getWETHtoXOCRate() {
	checkContractCallPrereqs();

	// returned price has 8 decimals
	const price = await get(wrappedHouseOfCoinContract).redstoneGetLastPrice();
	WETHToXOC.set(price);
}

export async function getWETHAllowance() {
	checkContractCallPrereqs();
	const allowance = await get(mockWETHContract).allowance(get(signerAddress), houseOfReserveAddress);
	userWETHAllowance.set(allowance);
}


export async function getUserWETHBalance(): Promise<void> {
	checkContractCallPrereqs();
	const balance = await get(mockWETHContract).balanceOf(get(signerAddress));
	userWETHBalance.set(balance);
}


async function getUserWETHDepositBalance(): Promise<void> {
	checkContractCallPrereqs();
	const fetchedBalance = await get(assetsAccountantContract).balanceOf(get(signerAddress), reserveTokenID);
	userWETHDepositBalance.set(fetchedBalance);
}

async function getMaxWETHWithdrawal() {
	checkContractCallPrereqs();
	const fetchedAmount = await get(wrappedHouseOfReserveContract).checkMaxWithdrawal(get(signerAddress));
	userWETHMaxWithdrawal.set(fetchedAmount);
}


async function getXOCBalance() {
	checkContractCallPrereqs();
	const fetchedBalance = await get(XOCContract).balanceOf(get(signerAddress));
	userXOCBalance.set(fetchedBalance);
}

async function getXOCMintingPower() {
	const fetchedAmount = await get(wrappedHouseOfCoinContract).checkRemainingMintingPower(get(signerAddress), mockWETHAddress);
	userXOCMintingPower.set(fetchedAmount);
}

export async function getXOCAllowance() {
	const allowance = await get(XOCContract).allowance(get(signerAddress), houseOfCoinAddress);
	userXOCAllowance.set(allowance);
}

export async function getXOCDebt() {
	const fetchedBalance = await get(assetsAccountantContract).balanceOf(get(signerAddress), backedTokenID);
	userXOCDebt.set(fetchedBalance);
}

export async function getHealthRatio() {
	// contract revers if no WETH deposits or no debt
	const deposit = get(userWETHDepositBalance);
	const debt = get(userXOCDebt);
	if (deposit && deposit.gt(0) && debt && debt.gt(0)) {
		const fetchedAmount = await get(wrappedHouseOfCoinContract).computeUserHealthRatio(get(signerAddress), mockWETHAddress);
		userHealthRatio.set(fetchedAmount);
	}

}

export async function getLiquidationParams() {
	const fetchedValues = await get(houseOfCoinContract).liqParam();
	liquidationThreshold.set(fetchedValues.liquidationThreshold);
}

export async function getCollateralRatioParam() {
	const fetchedValues = await get(houseOfReserveContract).collateralRatio();
	collateralRatioParam.set(parseFloat(fetchedValues.numerator)/parseFloat(fetchedValues.denominator));
}

// TODO: fetch with array of promises and retry failed
export async function fetchAllDisplayData() {
	checkContractCallPrereqs();

	getWETHAllowance();
	getUserWETHDepositBalance();
	getMaxWETHWithdrawal();
	getXOCAllowance();
	getXOCBalance();
	getXOCMintingPower();


	getWETHtoXOCRate();
	getLiquidationParams();
	getCollateralRatioParam();

	await getUserWETHBalance();
	await getXOCDebt();
	getHealthRatio();
}
