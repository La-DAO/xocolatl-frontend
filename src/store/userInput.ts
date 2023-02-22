// TODO: get rid of number inputs since floats cause so many issues, use strings for input instead
import { writable, derived } from 'svelte/store';

import { ethers } from 'ethers';
import { chainId } from 'svelte-ethers-store';
import { getCollateralOptions } from 'src/chains';

// defaults and derived from defaults
export const selectedCollateral = writable("WETH");
export const collateralDecimals = writable("18");

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

// user inputs
export const CollateralDepositInputAmount = writable(0);

export const CollateralDepositInputAmountBigNum = derived(
	[CollateralDepositInputAmount, collateralDecimals],
	([$CollateralDepositInputAmount, $collateralDecimals]) => {
		CollateralDepositInputError.set('');
		if (!Number.isFinite($CollateralDepositInputAmount)) {
			CollateralDepositInputError.set('Invalid amount!');
		} else if ($CollateralDepositInputAmount) {
			try {
				return ethers.utils.parseUnits($CollateralDepositInputAmount.toString(), $collateralDecimals);
			} catch (e) {
				CollateralDepositInputError.set('Invalid amount!');
			}
		} else if ($CollateralDepositInputAmount === 0) {
			return ethers.BigNumber.from('0');
		} else {
			CollateralDepositInputError.set('Invalid amount!');
		}
	}
);
export const CollateralDepositInputError = writable('');

export const WETHWithdrawInputAmount = writable(0);

export const WETHWithdrawInputAmountBigNum = derived(
	[WETHWithdrawInputAmount, collateralDecimals],
	([$WETHWithdrawInputAmount, $collateralDecimals]) => {
		WETHWithdrawInputError.set('');
		if (!Number.isFinite($WETHWithdrawInputAmount)) {
			WETHWithdrawInputError.set('Invalid amount!');
		} else if ($WETHWithdrawInputAmount) {
			try {
				return ethers.utils.parseUnits($WETHWithdrawInputAmount.toString(), $collateralDecimals);
			} catch (e) {
				WETHWithdrawInputError.set('Invalid amount!');
			}
		} else if ($WETHWithdrawInputAmount === 0) {
			return ethers.BigNumber.from('0');
		} else {
			WETHWithdrawInputError.set('Invalid amount!');
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
			XOCMintInputError.set('Invalid amount!');
		} else if ($XOCMintInputAmount) {
			try {
				return ethers.utils.parseEther($XOCMintInputAmount.toString());
			} catch (e) {
				XOCMintInputError.set('Invalid amount!');
			}
		} else if ($XOCMintInputAmount === 0) {
			return ethers.BigNumber.from('0');
		} else {
			XOCMintInputError.set('Invalid amount!');
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
			XOCRedeemInputError.set('Invalid amount!');
		} else if ($XOCRedeemInputAmount) {
			try {
				return ethers.utils.parseEther($XOCRedeemInputAmount.toString());
			} catch (e) {
				XOCRedeemInputError.set('Invalid amount!');
			}
		} else if ($XOCRedeemInputAmount === 0) {
			return ethers.BigNumber.from('0');
		} else {
			XOCRedeemInputError.set('Invalid amount!');
		}
	}
);
export const XOCRedeemInputError = writable('');


