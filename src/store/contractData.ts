import { writable, derived } from 'svelte/store';

import { ethers } from 'ethers';
// display data from contracts
export const userWETHAllowance = writable(ethers.utils.parseEther('0'));
export const userWETHBalance = writable('-');
export const userWETHDepositBalance = writable('-');
export const userWETHMaxWithdrawal = writable('-');

export const userXOCAllowance = writable(ethers.utils.parseEther('0'));
export const userXOCBalance = writable('-');
export const userXOCDebt = writable('-');
export const userXOCMintingPower = writable('-');

export const WETHToXOC = writable('-');
export const userHealthRatio = writable('-');

export const userMaxDebt = derived([userXOCMintingPower, userXOCDebt],
	([$userXOCMintingPower, $userXOCDebt]) => {
		if ($userXOCDebt !== '-' && $userXOCMintingPower !== '-') {
			const res = ethers.utils.parseEther($userXOCDebt).add(ethers.utils.parseEther($userXOCMintingPower)).toString();
			return ethers.utils.formatEther(res);
		} else return '-';
	}
);

// TODO: change parseFloat and be more preciose
export const userMaxDebtUtilization = derived([userXOCDebt, userMaxDebt],
	([$userXOCDebt, $userMaxDebt]) => {
		if ($userXOCDebt !== '-' && $userMaxDebt !== '-') {
			const res = parseFloat($userXOCDebt)/parseFloat($userMaxDebt);
			return res*100;
		} else return '-';
	}
);

export const liquidationThreshold = writable('-');

export const collateralRatioParam = writable('-');

// TODO: change parseFloat and be more preciose
export const userWETHLiquidationPrice = derived(
	[liquidationThreshold, userXOCDebt, userWETHDepositBalance, collateralRatioParam], 
	([$liquidationThreshold, $userXOCDebt, $userWETHDepositBalance, $collateralRatioParam]) => {
		
		if ($liquidationThreshold !== '-' && $userXOCDebt !== '-' && $userWETHDepositBalance !== '-' && $collateralRatioParam !== '-'){
			return ((parseFloat($liquidationThreshold)/100)*parseFloat($userXOCDebt)*parseFloat($collateralRatioParam)) / (parseFloat($userWETHDepositBalance));
		}
	});

