// TODO: get rid of number inputs since floats cause so many issues, use strings for input instead
import { writable, derived } from 'svelte/store';

import { ethers } from 'ethers';

import { userCollateralAllowance } from './contractData';
import { chainId } from 'svelte-ethers-store';
import { getCollateralOptions, getSelectedAssetObject } from 'src/chains';

// user inputs
export const selectedCollateral = writable("WETH");

export const listOfCollaterals = derived(
	chainId,
	($chainId) => {
		if ($chainId) {
			return getCollateralOptions($chainId);
		} else {
			return ['WETH'];
		}
	}
);

export const CollateralDepositInputAmount = writable(0);

export const CollateralDepositInputAmountBigNum = derived(
	[CollateralDepositInputAmount, chainId, selectedCollateral],
	([$CollateralDepositInputAmount, $chainId, $selectedCollateral]) => {
		CollateralDepositInputError.set('');
		if (!Number.isFinite($CollateralDepositInputAmount)) {
			CollateralDepositInputError.set('Cantidad invalida');
		} else if ($CollateralDepositInputAmount) {
			if ($chainId && $selectedCollateral) {
				const asset = getSelectedAssetObject($chainId, $selectedCollateral);
				try {
					return ethers.utils.parseUnits($CollateralDepositInputAmount.toString(), asset.decimals);
				} catch (e) {
					CollateralDepositInputError.set('Cantidad invalida');
				}

			}
		} else if ($CollateralDepositInputAmount === 0) {
			return ethers.BigNumber.from('0');
		} else {
			CollateralDepositInputError.set('Cantidad invalida');
		}
	}
);
export const CollateralDepositInputError = writable('');

export const CollateralDepositNeedsAllowance = derived(
	[CollateralDepositInputAmountBigNum, userCollateralAllowance],
	([$CollateralDepositInputAmountBigNum, $userCollateralAllowance]) => {
		if ($CollateralDepositInputAmountBigNum && $userCollateralAllowance) {
			if ($userCollateralAllowance.lt($CollateralDepositInputAmountBigNum)) {
				return true;
			}
		}
		return false;
	}
);

export const WETHWithdrawInputAmount = writable(0);
export const WETHWithdrawInputAmountBigNum = derived(
	[WETHWithdrawInputAmount, chainId, selectedCollateral],
	([$WETHWithdrawInputAmount, $chainId, $selectedCollateral]) => {
		WETHWithdrawInputError.set('');
		if (!Number.isFinite($WETHWithdrawInputAmount)) {
			WETHWithdrawInputError.set('Cantidad invalida');
		} else if ($WETHWithdrawInputAmount) {
			if($chainId && $selectedCollateral) {
				const asset = getSelectedAssetObject($chainId, $selectedCollateral);
				try {
					return ethers.utils.parseUnits($WETHWithdrawInputAmount.toString(), asset.decimals);
				} catch (e) {
					WETHWithdrawInputError.set('Cantidad invalida');
				}
			}
		} else if ($WETHWithdrawInputAmount === 0) {
			return ethers.BigNumber.from('0');
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
		if (!Number.isFinite($XOCMintInputAmount)) {
			XOCMintInputError.set('Cantidad invalida');
		} else if ($XOCMintInputAmount) {
			try {
				return ethers.utils.parseEther($XOCMintInputAmount.toString());
			} catch (e) {
				XOCMintInputError.set('Cantidad invalida');
			}
		} else if ($XOCMintInputAmount === 0) {
			return ethers.BigNumber.from('0');
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
		if (!Number.isFinite($XOCRedeemInputAmount)) {
			XOCRedeemInputError.set('Cantidad invalida');
		} else if ($XOCRedeemInputAmount) {
			try {
				return ethers.utils.parseEther($XOCRedeemInputAmount.toString());
			} catch (e) {
				XOCRedeemInputError.set('Cantidad invalida');
			}
		} else if ($XOCRedeemInputAmount === 0) {
			return ethers.BigNumber.from('0');
		} else {
			XOCRedeemInputError.set('Cantidad invalida');
		}
	}
);
export const XOCRedeemInputError = writable('');


