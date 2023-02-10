import { Contract, utils } from 'ethers';
import { get } from 'svelte/store';
import { signerAddress, chainId, signer } from 'svelte-ethers-store';

import { checkContractCallPrereqs } from './utils';

import {
	CollateralContract,
	XOCContract,
	assetsAccountantContract,
	houseOfCoinContract,
	wrappedHouseOfCoinContract,
	houseOfReserveContract,
	wrappedHouseOfReserveContract
} from './store/contracts';

import { selectedCollateral } from './store/userInput';

import {
	userNativeTokenBalance,
	userCollateralAllowance,
	userCollateralBalance,
	userCollateralDepositBalance,
	userCollateralMaxWithdrawal,
	userXOCAllowance,
	userXOCBalance,
	userXOCMintingPower,
	userXOCDebt,
	CollateralToXOC,
	userHealthRatio,
	liquidationThreshold,
	liquidationFactor,
	maxLTVFactor,
	globalBase,
} from './store/contractData';

import { chains, getSelectedAssetObject } from './chains';


// async function fetchBitso(): Promise<any> {
// 	const uri = 'https://api.bitso.com/v3/ticker/?book=eth_mxn';
// 	const response = await window.fetch(uri, );
// 	const rObject = await response.json();
// 	const lastPrice: number = rObject.payload.last;
// 	return utils.parseUnits(lastPrice.toString(), 8);
// }

export async function getCollateralToXOCRate() {
	checkContractCallPrereqs();
	let price;
	try {
		// returned price has 8 decimals
		price = await get(houseOfReserveContract)!.getLatestPrice();
	} catch (e) {
		console.log(e);
	}
	CollateralToXOC.set(price);
}

export async function getUserNativeTokenBalance(): Promise<void> {
	const nativeTokenBalance = await get(signer)!.getBalance();
	userNativeTokenBalance.set(nativeTokenBalance);
}

export async function getCollateralAllowance() {
	checkContractCallPrereqs();
	const allowance = await get(CollateralContract)!.allowance(
		get(signerAddress),
		getSelectedAssetObject(get(chainId), get(selectedCollateral)).houseOfReserveAddress
	);
	userCollateralAllowance.set(allowance);
}

export async function getUserCollateralBalance(): Promise<void> {
	checkContractCallPrereqs();
	const contract: Contract | undefined = get(CollateralContract);
	const balance = await contract!.balanceOf(get(signerAddress));
	console.log("getUserCollateralBalance", contract!.address, balance.toString());
	userCollateralBalance.set(balance);
}

export async function getUserCollateralDepositBalance(): Promise<void> {
	checkContractCallPrereqs();
	const fetchedBalance = await get(assetsAccountantContract)!.balanceOf(
		get(signerAddress),
		getSelectedAssetObject(get(chainId), get(selectedCollateral)).reserveTokenID
	);
	userCollateralDepositBalance.set(fetchedBalance);
}

export async function getMaxCollateralWithdrawal() {
	checkContractCallPrereqs();
	let fetchedAmount;
	try {
		fetchedAmount = await get(houseOfReserveContract)!.checkMaxWithdrawal(get(signerAddress));
	} catch (error) {
		fetchedAmount = await get(wrappedHouseOfReserveContract)!.checkMaxWithdrawal(get(signerAddress));
	}
	userCollateralMaxWithdrawal.set(fetchedAmount);
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
		fetchedAmount = await get(houseOfCoinContract)!.checkRemainingMintingPower(
			get(signerAddress),
			getSelectedAssetObject(get(chainId), get(selectedCollateral)).houseOfReserveAddress
		);
	} catch (error) {
		fetchedAmount = await get(wrappedHouseOfCoinContract)!.checkRemainingMintingPower(
			get(signerAddress),
			getSelectedAssetObject(get(chainId), get(selectedCollateral)).houseOfReserveAddress
		);
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
	const fetchedBalance = await get(assetsAccountantContract)!.balanceOf(
		get(signerAddress),
		getSelectedAssetObject(get(chainId), get(selectedCollateral)).backedTokenID
	);
	userXOCDebt.set(fetchedBalance);
}

export async function getHealthRatio() {
	checkContractCallPrereqs();
	// contract reverts if no WETH deposits or no debt
	const deposit = get(userCollateralDepositBalance);
	const debt = get(userXOCDebt);
	if (deposit && deposit.gt(0) && debt && debt.gt(0)) {
		let fetchedAmount;
		try {
			fetchedAmount = await get(houseOfCoinContract)!.computeUserHealthRatio(
				get(signerAddress),
				getSelectedAssetObject(get(chainId), get(selectedCollateral)).houseOfReserveAddress
			);
		} catch (error) {
			fetchedAmount = await get(wrappedHouseOfCoinContract)!.computeUserHealthRatio(
				get(signerAddress),
				getSelectedAssetObject(get(chainId), get(selectedCollateral)).houseOfReserveAddress
			);
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
	getCollateralToXOCRate();
	getUserNativeTokenBalance();
	getCollateralAllowance();
	getUserCollateralDepositBalance();
	getMaxCollateralWithdrawal();
	getXOCAllowance();
	getXOCBalance();
	getXOCMintingPower();

	getMaxLTVFactor();
	getLiquidationParams();
	getLiquidationFactor();

	await getUserCollateralBalance();
	await getXOCDebt();
	getHealthRatio();
}
