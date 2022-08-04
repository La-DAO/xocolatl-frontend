import { get } from 'svelte/store';
import { signerAddress, chainId } from 'svelte-ethers-store';

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

import { chains } from './chains';

export async function getWETHtoXOCRate() {
	checkContractCallPrereqs();

	let price;
	try {
	// returned price has 8 decimals
		price = await get(wrappedHouseOfCoinContract)!.getLatestPrice();
	} catch (e) {
		console.log(e);
	}
	WETHToXOC.set(price);
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
	const fetchedAmount = await get(wrappedHouseOfReserveContract)!.checkMaxWithdrawal(get(signerAddress));
	userWETHMaxWithdrawal.set(fetchedAmount);
}


async function getXOCBalance() {
	checkContractCallPrereqs();
	const fetchedBalance = await get(XOCContract)!.balanceOf(get(signerAddress));
	userXOCBalance.set(fetchedBalance);
}

export async function getXOCMintingPower() {
	checkContractCallPrereqs();
	const fetchedAmount = await get(wrappedHouseOfCoinContract)!.checkRemainingMintingPower(get(signerAddress), chains[get(chainId)].WETHAddress);
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
	// contract revers if no WETH deposits or no debt
	const deposit = get(userWETHDepositBalance);
	const debt = get(userXOCDebt);
	if (deposit && deposit.gt(0) && debt && debt.gt(0)) {
		const fetchedAmount = await get(wrappedHouseOfCoinContract)!.computeUserHealthRatio(get(signerAddress), chains[get(chainId)].WETHAddress);
		userHealthRatio.set(fetchedAmount);
	}
}

export async function getLiquidationParams() {
	checkContractCallPrereqs();
	const fetchedValues = await get(houseOfCoinContract)!.getLiqParams();
	liquidationThreshold.set(fetchedValues.liquidationThreshold);
}

export async function getCollateralRatioParam() {
	checkContractCallPrereqs();
	const fetchedValues = await get(houseOfReserveContract)!.collateralRatio();
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
