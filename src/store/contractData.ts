import { writable, derived } from 'svelte/store';
import { ethers } from 'ethers';
import type { Writable, Readable } from 'svelte/store';
import type { BigNumber } from 'ethers';

export const userNativeTokenBalance: Writable<BigNumber | null> = writable(null);

// display data from contracts
export const userCollateralAllowance: Writable<BigNumber | null> = writable(null);
export const userCollateralBalance: Writable<BigNumber | null> = writable(null);
export const userCollateralDepositBalance: Writable<BigNumber | null> = writable(null);
export const userCollateralMaxWithdrawal: Writable<BigNumber | null> = writable(null);

export const userXOCAllowance: Writable<BigNumber | null> = writable(null);
export const userXOCBalance: Writable<BigNumber | null> = writable(null);
export const userXOCDebt: Writable<BigNumber | null> = writable(null);
export const userXOCMintingPower: Writable<BigNumber | null> = writable(null);

// 8 decimals
export const CollateralToXOC: Writable<BigNumber | null> = writable(null);

export const userHealthRatio: Writable<BigNumber | null> = writable(null);
export const liquidationFactor: Writable<BigNumber | null> = writable(null);
export const maxLTVFactor: Writable<BigNumber | null> = writable(null);
export const globalBase: Writable<BigNumber | null> = writable(null);


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


// returns price in 18 decimals
export const userCollateralMXNPrice: Readable<BigNumber | null> = derived(
	[CollateralToXOC, userCollateralDepositBalance],
	([$CollateralToXOC, $userCollateralDepositBalance]) => {
		if($CollateralToXOC && $userCollateralDepositBalance) {
			return $CollateralToXOC.mul($userCollateralDepositBalance).div(1e8);
		} else return null;
	}
);

export const userCollateralLiquidationPrice = derived(
	[userXOCDebt, userCollateralDepositBalance, liquidationFactor], 
	([$userXOCDebt, $userCollateralDepositBalance, $liquidationFactor]) => {
		if ($userXOCDebt && $userCollateralDepositBalance && $liquidationFactor){
			const floatXOCDebt = parseFloat(ethers.utils.formatEther($userXOCDebt));
			const wethDepositBalanceFloat = parseFloat(ethers.utils.formatEther($userCollateralDepositBalance));
			const liqFactorFloat = parseFloat(ethers.utils.formatEther($liquidationFactor));
			const result = (floatXOCDebt)/(wethDepositBalanceFloat*liqFactorFloat);
			return result;
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
	userNativeTokenBalance.set(null);
	userCollateralAllowance.set(null);
	userCollateralBalance.set(null);
	userCollateralDepositBalance.set(null);
	userCollateralMaxWithdrawal.set(null);
	userXOCAllowance.set(null);
	userXOCBalance.set(null);
	userXOCDebt.set(null);
	userXOCMintingPower.set(null);
	CollateralToXOC.set(null);
	userHealthRatio.set(null);
	liquidationThreshold.set(null);
	maxLTVFactor.set(null);
}
