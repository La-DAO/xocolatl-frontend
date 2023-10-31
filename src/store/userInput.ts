import { writable, derived } from "svelte/store";

import { ethers } from "ethers";
import { chainId } from "svelte-ethers-store";
import { getCollateralOptions } from "src/chains";

// defaults and derived from defaults
export const selectedCollateral = writable("WETH");
export const collateralDecimals = writable("18");

export const listOfCollaterals = derived(chainId, ($chainId) => {
  if ($chainId) {
    return getCollateralOptions($chainId);
  } else {
    return ["WETH"];
  }
});

// user inputs
export const CollateralDepositInputAmount = writable("0");

export const CollateralDepositInputAmountBigNum = derived(
  [CollateralDepositInputAmount, collateralDecimals],
  ([$CollateralDepositInputAmount]) => {
    CollateralDepositInputError.set("");
    try {
      return ethers.BigNumber.from(
        ethers.utils.parseEther($CollateralDepositInputAmount),
      );
    } catch (error) {
      CollateralDepositInputError.set("Invalid amount!");
    }
  },
);
export const CollateralDepositInputError = writable("");

export const WETHWithdrawInputAmount = writable("0");

export const WETHWithdrawInputAmountBigNum = derived(
  [WETHWithdrawInputAmount, collateralDecimals],
  ([$WETHWithdrawInputAmount]) => {
    WETHWithdrawInputError.set("");
    try {
      return ethers.BigNumber.from(
        ethers.utils.parseEther($WETHWithdrawInputAmount),
      );
    } catch (error) {
      WETHWithdrawInputError.set("Invalid amount!");
    }
  },
);
export const WETHWithdrawInputError = writable("");

export const XOCMintInputAmount = writable("0");

export const XOCMintInputAmountBigNum = derived(
  XOCMintInputAmount,
  ($XOCMintInputAmount) => {
    XOCMintInputError.set("");
    try {
      return ethers.BigNumber.from(
        ethers.utils.parseEther($XOCMintInputAmount),
      );
    } catch (error) {
      XOCMintInputError.set("Invalid amount!");
    }
  },
);

export const XOCMintInputError = writable("");

export const XOCRedeemInputAmount = writable("0");

export const XOCRedeemInputAmountBigNum = derived(
  XOCRedeemInputAmount,
  ($XOCRedeemInputAmount) => {
    XOCRedeemInputError.set("");
    try {
      return ethers.BigNumber.from(
        ethers.utils.parseEther($XOCRedeemInputAmount),
      );
    } catch (error) {
      XOCRedeemInputError.set("Invalid amount!");
    }
  },
);
export const XOCRedeemInputError = writable("");
