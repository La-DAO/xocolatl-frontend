import { ethers } from "ethers";
import { WrapperBuilder } from "redstone-evm-connector";
import { derived } from "svelte/store";
import { provider, signer, chainId } from "svelte-ethers-store";
import { ERC20ABI } from "../abis";
import { getSelectedAssetObject, index } from "../chains";
import { selectedCollateral } from "./userInput";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const CollateralContract = derived(
  [provider, signer, chainId, selectedCollateral],
  ([_, $signer, $chainId, $selectedCollateral]) => {
    if ($chainId && $selectedCollateral) {
      const contract = new ethers.Contract(
        getSelectedAssetObject($chainId, $selectedCollateral).address,
        ERC20ABI,
        $signer,
      );
      return contract;
    }
  },
);

export const XOCContract = derived(
  [provider, signer, chainId],
  ([_, $signer, $chainId]) => {
    if ($chainId) {
      return new ethers.Contract(
        index[$chainId].XOCAddress,
        index[$chainId].XOCABI,
        $signer,
      );
    }
  },
);

export const houseOfCoinContract = derived(
  [provider, signer, chainId],
  ([_, $signer, $chainId]) => {
    if ($chainId) {
      const contract = new ethers.Contract(
        index[$chainId].houseOfCoinAddress,
        index[$chainId].houseOfCoinABI,
        $signer,
      );
      return contract;
    }
  },
);

export const wrappedHouseOfCoinContract = derived(
  houseOfCoinContract,
  ($houseOfCoinContract) => {
    if ($houseOfCoinContract) {
      return WrapperBuilder.wrapLite($houseOfCoinContract).usingPriceFeed(
        "redstone-stocks",
      );
    }
  },
);

export const assetsAccountantContract = derived(
  [provider, signer, chainId],
  ([_, $signer, $chainId]) => {
    if ($chainId) {
      return new ethers.Contract(
        index[$chainId].assetsAccountantAddress,
        index[$chainId].assetsAccountantABI,
        $signer,
      );
    }
  },
);

export const houseOfReserveContract = derived(
  [provider, signer, chainId, selectedCollateral],
  ([_, $signer, $chainId, $selectedCollateral]) => {
    if ($chainId && $selectedCollateral) {
      const contract = new ethers.Contract(
        getSelectedAssetObject(
          $chainId,
          $selectedCollateral,
        ).houseOfReserveAddress,
        index[$chainId].houseOfReserveABI,
        $signer,
      );
      return contract;
    }
  },
);
/* eslint-enable @typescript-eslint/no-unused-vars */

export const wrappedHouseOfReserveContract = derived(
  houseOfReserveContract,
  ($houseOfReserveContract) => {
    if ($houseOfReserveContract) {
      return WrapperBuilder.wrapLite($houseOfReserveContract).usingPriceFeed(
        "redstone-stocks",
      );
    }
  },
);
