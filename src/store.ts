import { writable, derived } from 'svelte/store';
import { utils } from "ethers";

export const selectedTab = writable("deposit");

// user inputs
export const WETHDepositInputAmount = writable(0);
export const WETHDepositInputAmountBigNum = derived(
	WETHDepositInputAmount,
	$WETHDepositInputAmount => {
		WETHDepositInputError.set("");
		if (!Number.isFinite($WETHDepositInputAmount)){
			WETHDepositInputError.set("Cantidad invalida");
		} else if ($WETHDepositInputAmount) {
			try {
				return utils.parseEther($WETHDepositInputAmount.toString());
			} catch(e) {
				WETHDepositInputError.set("Cantidad invalida");
			}
		} else if ($WETHDepositInputAmount === 0){
			return utils.parseEther("0");
		} else {
			WETHDepositInputError.set("Cantidad invalida");
		};
	}
);
export const WETHDepositInputError = writable("");

export const WETHWithdrawInputAmount = writable(0);
export const WETHWithdrawInputAmountBigNum = derived(
	WETHWithdrawInputAmount,
	$WETHWithdrawInputAmount => {
		WETHWithdrawInputError.set("");
		if (!Number.isFinite($WETHWithdrawInputAmount)){
			WETHWithdrawInputError.set("Cantidad invalida");
		} else if ($WETHWithdrawInputAmount) {
			try {
				return utils.parseEther($WETHWithdrawInputAmount.toString());
			} catch(e) {
				WETHWithdrawInputError.set("Cantidad invalida");
			}
		} else if ($WETHWithdrawInputAmount === 0){
			return utils.parseEther("0");
		} else {
			WETHWithdrawInputError.set("Cantidad invalida");
		};
	}
);
export const WETHWithdrawInputError = writable("");



export const XOCMintInputAmount = writable(0);
export const XOCMintInputAmountBigNum = derived(
	XOCMintInputAmount,
	$XOCMintInputAmount => {
		XOCMintInputError.set("");
		if (!Number.isFinite($XOCMintInputAmount)){
			XOCMintInputError.set("Cantidad invalida");
		} else if ($XOCMintInputAmount) {
			try {
				return utils.parseEther($XOCMintInputAmount.toString());
			} catch(e) {
				XOCMintInputError.set("Cantidad invalida");
			}
		} else if ($XOCMintInputAmount === 0){
			return utils.parseEther("0");
		} else {
			XOCMintInputError.set("Cantidad invalida");
		};
	}
);
export const XOCMintInputError = writable("");

export const XOCBurnInputAmount = writable(0);
export const XOCBurnInputAmountBigNum = derived(
	XOCBurnInputAmount,
	$XOCBurnInputAmount => {
		XOCBurnInputError.set("");
		if (!Number.isFinite($XOCBurnInputAmount)){
			XOCBurnInputError.set("Cantidad invalida");
		} else if ($XOCBurnInputAmount) {
			try {
				return utils.parseEther($XOCBurnInputAmount.toString());
			} catch(e) {
				XOCBurnInputError.set("Cantidad invalida");
			}
		} else if ($XOCBurnInputAmount === 0){
			return utils.parseEther("0");
		} else {
			XOCBurnInputError.set("Cantidad invalida");
		};
	}
);
export const XOCBurnInputError = writable("");


// display data from contracts
export const userWETHBalance = writable("-");
export const userWETHDepositBalance = writable("-");
export const userWETHMaxWithdrawal = writable("-");
export const userXOCBalance = writable("-");
export const userXOCDebt = writable("-");
export const userXOCMintingPower = writable("-");

