import { get } from "svelte/store";
import { maxApproveAmount } from "../../constants";

import { chainId, signer } from "svelte-ethers-store";
import { pendingTxs } from "../account";

import {
  selectedCollateral,
  CollateralDepositInputAmountBigNum,
  WETHWithdrawInputAmountBigNum,
  XOCMintInputAmountBigNum,
  XOCRedeemInputAmountBigNum,
} from "../userInput";

import { fetchAllDisplayData } from "./reads";
import { checkContractCallPrereqs } from "../../utils";

import type { ContractTransaction } from "ethers";
import type { TransactionReceipt } from "@ethersproject/providers";

import {
  CollateralContract,
  XOCContract,
  houseOfCoinContract,
  houseOfReserveContract,
} from "../contracts";

import { chains, getSelectedAssetObject } from "../../chains";

// waits for user transaction and updates store for tx progress UI display
async function handleTxReceipt(tx: ContractTransaction) {
  // add to tx list of pending txs
  pendingTxs.monitor(tx.hash);

  let receipt: TransactionReceipt;
  try {
    receipt = await tx.wait();
    if (receipt.status) {
      pendingTxs.updateStatus(tx.hash, "completed");
    } else {
      pendingTxs.updateStatus(tx.hash, "failed");
    }
  } catch (e) {
    pendingTxs.updateStatus(tx.hash, "failed");
    throw e;
  }

  // fetch new display data
  fetchAllDisplayData();
}

export async function approveERC20() {
  checkContractCallPrereqs();
  const tx = await get(CollateralContract)!.approve(
    getSelectedAssetObject(get(chainId), get(selectedCollateral))
      .houseOfReserveAddress,
    maxApproveAmount,
  );
  handleTxReceipt(tx);
}

export async function depositERC20() {
  checkContractCallPrereqs();
  const amount = get(CollateralDepositInputAmountBigNum);
  if (amount) {
    const tx = await get(houseOfReserveContract)!.deposit(amount);
    handleTxReceipt(tx);
  } else {
    throw new Error("Invalid deposit amount input");
  }
}

export async function mintXOC() {
  checkContractCallPrereqs();
  const amount = get(XOCMintInputAmountBigNum);
  if (amount) {
    const tx = await get(houseOfCoinContract)!.mintCoin(
      getSelectedAssetObject(get(chainId), get(selectedCollateral)).address,
      getSelectedAssetObject(get(chainId), get(selectedCollateral))
        .houseOfReserveAddress,
      amount,
    );
    handleTxReceipt(tx);
  } else {
    throw new Error("Invalid XOC mint amount input");
  }
}

// approve XOC transfers to houseOfCoin for payback
export async function approveXOC() {
  checkContractCallPrereqs();
  const tx = await get(XOCContract)!.approve(
    chains[get(chainId)].houseOfCoinAddress,
    maxApproveAmount,
  );
  handleTxReceipt(tx);
}

export async function redeemXOC() {
  checkContractCallPrereqs();
  const amount = get(XOCRedeemInputAmountBigNum);
  if (amount) {
    const tx = await get(houseOfCoinContract)!.paybackCoin(
      getSelectedAssetObject(get(chainId), get(selectedCollateral))
        .backedTokenID,
      amount,
    );
    handleTxReceipt(tx);
  } else {
    throw new Error("Invalid XOC redeem amount input");
  }
}

export async function withdrawWETH() {
  checkContractCallPrereqs();
  const amount = get(WETHWithdrawInputAmountBigNum);
  if (amount) {
    const tx = await get(houseOfReserveContract)!.withdraw(amount);
    handleTxReceipt(tx);
  } else {
    throw new Error("Invalid WETH withdraw amount input");
  }
}

export async function depositNativeToken() {
  checkContractCallPrereqs();
  const amount = get(CollateralDepositInputAmountBigNum);
  if (amount) {
    const tx = await get(signer)!.sendTransaction({
      to: getSelectedAssetObject(get(chainId), get(selectedCollateral))
        .houseOfReserveAddress,
      value: amount,
    });
    handleTxReceipt(tx);
  } else {
    throw new Error("Invalid ETH deposit amount input");
  }
}
