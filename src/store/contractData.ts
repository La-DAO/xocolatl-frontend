import { writable, derived } from 'svelte/store';
import { ethers } from 'ethers';
import type { Writable, Readable } from 'svelte/store';
import type { BigNumber } from 'ethers';
// display data from contracts
export const userWETHAllowance = writable(null);
export const userWETHBalance = writable(null);
export const userWETHDepositBalance = writable(null);
export const userWETHMaxWithdrawal = writable(null);

export const userXOCAllowance = writable(null);
export const userXOCBalance = writable(null);
export const userXOCDebt: Writable<BigNumber | null> = writable(null);
export const userXOCMintingPower = writable(null);

// 8 decimals
export const WETHToXOC = writable(null);
export const userHealthRatio = writable(null);

export const userMaxDebt = derived([userXOCMintingPower, userXOCDebt],
	([$userXOCMintingPower, $userXOCDebt]) => {
		if ($userXOCDebt && $userXOCMintingPower) {
			return $userXOCDebt.add($userXOCMintingPower);
		} else return null;
	}
);

// TODO: change parseFloat and be more preciose
export const userMaxDebtUtilization: Readable<number | null> = derived([userXOCDebt, userMaxDebt],
	([$userXOCDebt, $userMaxDebt]) => {
		if ($userXOCDebt && $userMaxDebt) {
			return parseFloat(ethers.utils.formatEther($userXOCDebt))/parseFloat(ethers.utils.formatEther($userMaxDebt))
		} else return null;
	}
);

export const liquidationThreshold: Writable<BigNumber | null> = writable(null);

export const collateralRatioParam: Writable <number | null> = writable(null);

export const collateralFactor: Readable<number | null> = derived(collateralRatioParam, 
	$collateralRatioParam => {
		if ($collateralRatioParam) {
			return 1/$collateralRatioParam;
		} else return null;
})


export const userWETHLiquidationPrice = derived(
	[liquidationThreshold, userXOCDebt, userWETHDepositBalance, collateralRatioParam], 
	([$liquidationThreshold, $userXOCDebt, $userWETHDepositBalance, $collateralRatioParam]) => {
		
		if ($liquidationThreshold && $userXOCDebt && $userWETHDepositBalance && $collateralRatioParam){
			const floatLiqThreshold = parseFloat(ethers.utils.formatEther($liquidationThreshold));
			const floatXOCDebt = parseFloat(ethers.utils.formatEther($userXOCDebt));
			const wethDepositBalanceFloat = parseFloat(ethers.utils.formatEther($userWETHDepositBalance))

			const result = (floatLiqThreshold*floatXOCDebt*$collateralRatioParam)/wethDepositBalanceFloat;

			return result;
			// return ((parseFloat($liquidationThreshold)/100)*parseFloat($userXOCDebt)*parseFloat($collateralRatioParam)) / (parseFloat($userWETHDepositBalance));
		} else return null;
	});
