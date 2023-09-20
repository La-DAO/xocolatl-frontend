<script lang="ts">
  import { _ } from "svelte-i18n";
  import { connected } from "svelte-ethers-store";
  import { isRighNetwork, selectedTab } from "../store/account";
  import {
    CollateralDepositInputAmountBigNum,
    XOCRedeemInputAmountBigNum,
  } from "../store/userInput";
  import {
    userCollateralAllowance,
    userXOCAllowance,
  } from "../store/contractData";
  import {
    approveERC20,
    depositERC20,
    mintXOC,
    approveXOC,
    redeemXOC,
    withdrawWETH,
  } from "../store/contract/writes";

  let disabled = true; // disable buttons until data loads
  $: if ($isRighNetwork || !connected) {
    disabled = false;
  }
</script>

{#if $selectedTab === "deposit"}
  {#if $userCollateralAllowance && $CollateralDepositInputAmountBigNum && $userCollateralAllowance.lt($CollateralDepositInputAmountBigNum)}
    <button
      on:click={approveERC20}
      type="button"
      class:is-disabled={disabled}
      {disabled}>{$_("actions.approve")}</button
    >
  {:else}
    <button
      on:click={depositERC20}
      type="button"
      class:is-disabled={disabled}
      {disabled}>{$_("actions.deposit")}</button
    >
  {/if}
{:else if $selectedTab === "mint"}
  <button
    on:click={mintXOC}
    type="button"
    {disabled}
    class:is-disabled={disabled}>{$_("actions.mint")}</button
  >
{:else if $selectedTab === "redeem"}
  {#if $userXOCAllowance && $XOCRedeemInputAmountBigNum && $userXOCAllowance.lt($XOCRedeemInputAmountBigNum)}
    <button
      on:click={approveXOC}
      type="button"
      class:is-disabled={disabled}
      {disabled}>{$_("actions.approve")}</button
    >
  {:else}
    <button
      on:click={redeemXOC}
      type="button"
      class:is-disabled={disabled}
      {disabled}>{$_("actions.redeem")}</button
    >
  {/if}
{:else if $selectedTab === "withdraw"}
  <button
    on:click={withdrawWETH}
    type="button"
    class:is-disabled={disabled}
    {disabled}>{$_("actions.withdraw")}</button
  >
{/if}

<style>
  button {
    color: var(--light-color);
    background-color: var(--main-color);
    cursor: pointer;
    height: 2rem;
    width: 10rem;
    margin: auto;
    border: none;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .is-disabled {
    cursor: not-allowed;
  }
</style>
