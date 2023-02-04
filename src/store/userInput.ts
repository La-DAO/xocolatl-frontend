// TODO: get rid of number inputs since floats cause so many issues, use strings for input instead
import { writable, derived } from 'svelte/store';

import { ethers } from 'ethers';

import { userCollateralAllowance } from './contractData';
import { chainId } from 'svelte-ethers-store';
import { getCollateralOptions } from 'src/chains';

// user inputs
export const selectedCollateral = writable("WETH");

export const listOfCollaterals = derived(
	chainId,
	($chainId) => {
		if($chainId) {
			return getCollateralOptions($chainId);
		} else {
			return ['WETH'];
		}
	}
);

export const WETHDepositInputAmount = writable(0);

export const WETHDepositInputAmountBigNum = derived(
	WETHDepositInputAmount,
	$WETHDepositInputAmount => {
		WETHDepositInputError.set('');
		if (!Number.isFinite($WETHDepositInputAmount)){
			WETHDepositInputError.set('Cantidad invalida');
		} else if ($WETHDepositInputAmount) {
			try {
				return ethers.utils.parseEther($WETHDepositInputAmount.toString());
			} catch(e) {
				WETHDepositInputError.set('Cantidad invalida');
			}
		} else if ($WETHDepositInputAmount === 0){
			return ethers.utils.parseEther('0');
		} else {
			WETHDepositInputError.set('Cantidad invalida');
		}
	}
);
export const WETHDepositInputError = writable('');

export const WETHDepositNeedsAllowance = derived(
	[WETHDepositInputAmountBigNum, userCollateralAllowance],
	([$WETHDepositInputAmountBigNum, $userCollateralAllowance]) => {
		if ($WETHDepositInputAmountBigNum && $userCollateralAllowance) {
			if ($userCollateralAllowance.lt($WETHDepositInputAmountBigNum)) {
				return true;
			}
		} 
		return false;
	}
);

export const WETHWithdrawInputAmount = writable(0);
export const WETHWithdrawInputAmountBigNum = derived(
	WETHWithdrawInputAmount,
	$WETHWithdrawInputAmount => {
		WETHWithdrawInputError.set('');
		if (!Number.isFinite($WETHWithdrawInputAmount)){
			WETHWithdrawInputError.set('Cantidad invalida');
		} else if ($WETHWithdrawInputAmount) {
			try {
				return ethers.utils.parseEther($WETHWithdrawInputAmount.toString());
			} catch(e) {
				WETHWithdrawInputError.set('Cantidad invalida');
			}
		} else if ($WETHWithdrawInputAmount === 0){
			return ethers.utils.parseEther('0');
		} else {
			WETHWithdrawInputError.set('Cantidad invalida');
		}
	}
);
export const WETHWithdrawInputError = writable('');




export const XOCMintInputAmount = writable(0);
export const XOCMintInputAmountBigNum = derived(
	XOCMintInputAmount,
	$XOCMintInputAmount => {
		XOCMintInputError.set('');
		if (!Number.isFinite($XOCMintInputAmount)){
			XOCMintInputError.set('Cantidad invalida');
		} else if ($XOCMintInputAmount) {
			try {
				return ethers.utils.parseEther($XOCMintInputAmount.toString());
			} catch(e) {
				XOCMintInputError.set('Cantidad invalida');
			}
		} else if ($XOCMintInputAmount === 0){
			return ethers.utils.parseEther('0');
		} else {
			XOCMintInputError.set('Cantidad invalida');
		}
	}
);

export const XOCMintInputError = writable('');



export const XOCRedeemInputAmount = writable(0);
export const XOCRedeemInputAmountBigNum = derived(
	XOCRedeemInputAmount,
	$XOCRedeemInputAmount => {
		XOCRedeemInputError.set('');
		if (!Number.isFinite($XOCRedeemInputAmount)){
			XOCRedeemInputError.set('Cantidad invalida');
		} else if ($XOCRedeemInputAmount) {
			try {
				return ethers.utils.parseEther($XOCRedeemInputAmount.toString());
			} catch(e) {
				XOCRedeemInputError.set('Cantidad invalida');
			}
		} else if ($XOCRedeemInputAmount === 0){
			return ethers.utils.parseEther('0');
		} else {
			XOCRedeemInputError.set('Cantidad invalida');
		}
	}
);
export const XOCRedeemInputError = writable('');


