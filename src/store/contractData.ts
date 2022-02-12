import { writable, derived } from 'svelte/store';
import { ethers } from 'ethers';
import type { Writable, Readable } from 'svelte/store';
import type { BigNumber } from 'ethers';
// display data from contracts
export const userWETHAllowance: Writable<BigNumber | null> = writable(null);
export const userWETHBalance: Writable<BigNumber | null> = writable(null);
export const userWETHDepositBalance: Writable<BigNumber | null> = writable(null);
export const userWETHMaxWithdrawal: Writable<BigNumber | null> = writable(null);

export const userXOCAllowance: Writable<BigNumber | null> = writable(null);
export const userXOCBalance: Writable<BigNumber | null> = writable(null);
export const userXOCDebt: Writable<BigNumber | null> = writable(null);
export const userXOCMintingPower: Writable<BigNumber | null> = writable(null);

// 8 decimals
export const WETHToXOC: Writable<BigNumber | null> = writable(null);
export const userHealthRatio: Writable<BigNumber | null> = writable(null);

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
			return parseFloat(ethers.utils.formatEther($userXOCDebt))/parseFloat(ethers.utils.formatEther($userMaxDebt));
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
	});

// returns price in 18 decimals
export const userWETHCollateralMXNPrice: Readable<BigNumber | null> = derived(
	[WETHToXOC, userWETHDepositBalance],
	([$WETHToXOC, $userWETHDepositBalance]) => {
		if($WETHToXOC && $userWETHDepositBalance) {
			return $WETHToXOC.mul($userWETHDepositBalance).div(1e8);
		} else return null;
	}
);


export const userWETHLiquidationPrice = derived(
	[liquidationThreshold, userXOCDebt, userWETHDepositBalance, collateralRatioParam], 
	([$liquidationThreshold, $userXOCDebt, $userWETHDepositBalance, $collateralRatioParam]) => {
		if ($liquidationThreshold && $userXOCDebt && $userWETHDepositBalance && $collateralRatioParam){
			const floatLiqThreshold = parseFloat(ethers.utils.formatEther($liquidationThreshold));
			const floatXOCDebt = parseFloat(ethers.utils.formatEther($userXOCDebt));
			const wethDepositBalanceFloat = parseFloat(ethers.utils.formatEther($userWETHDepositBalance));
			const result = (floatLiqThreshold*floatXOCDebt*$collateralRatioParam)/wethDepositBalanceFloat;
			return result;
			// return ((parseFloat($liquidationThreshold)/100)*parseFloat($userXOCDebt)*parseFloat($collateralRatioParam)) / (parseFloat($userWETHDepositBalance));
		} else return null;
});

export const healthRatioAsPercentage = derived(
	userHealthRatio, 
	($userHealthRatio) => {
		if($userHealthRatio) {
			const value = parseFloat(ethers.utils.formatEther($userHealthRatio));
			if (value < 1) {
				return 0;
			}
			if (value >= 1 && value <= 2) {
				return 50 * value - 50;
			}
			const constant = 50 * Math.log10(2);
			return 100 - constant / Math.log10(value);
		} else return 0;
});

// method for reseting data when provider changes
export function resetAll() {
	userWETHAllowance.set(null);
	userWETHBalance.set(null);
	userWETHDepositBalance.set(null);
	userWETHMaxWithdrawal.set(null);
	userXOCAllowance.set(null);
	userXOCBalance.set(null);
	userXOCDebt.set(null);
	userXOCMintingPower.set(null);
	WETHToXOC.set(null);
	userHealthRatio.set(null);
	liquidationThreshold.set(null);
	collateralRatioParam.set(null);
}
