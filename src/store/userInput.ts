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
  ([$CollateralDepositInputAmount, $collateralDecimals]) => {
    CollateralDepositInputError.set("");
    try {
      // NOTE: not all collaterals have 18 decimals
      return ethers.BigNumber.from(
        ethers.utils.parseUnits(
          $CollateralDepositInputAmount,
          $collateralDecimals,
        ),
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
  ([$WETHWithdrawInputAmount, $collateralDecimals]) => {
    WETHWithdrawInputError.set("");
    try {
      return ethers.BigNumber.from(
        // NOTE: not all collaterals have 18 decimals
        ethers.utils.parseUnits($WETHWithdrawInputAmount, $collateralDecimals),
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
