<script lang="ts">
  import { ethers } from "ethers";
  import type { BigNumber } from "ethers";

  import Button3D from "./Button3D.svelte";
  import SelectCollateral from "./SelectCollateral.svelte";

  // writeable object from store to bind to input
  export let inputAmount: number;
  export let inputError: string;
  export let inputAmountBigNum: BigNumber | undefined;
  export let inputLimit: BigNumber | null;
	export let inputTypeText: string;
  export let headerText: string;
  export let actionText: string;
  export let actionHandler: () => void;

  function handlePercentButton(ratio: number) {
    if (inputLimit) {
      if (ratio === 1) {
        // need to get rid of all floats for inputs and replace to strings, in the meantime use 0.99 as max
        // as of now, there will always be some dust in wallet balances
        inputAmount = +(
          parseFloat(ethers.utils.formatEther(inputLimit)) * ratio
        ).toFixed(18);
      } else {
        inputAmount = +(
          parseFloat(ethers.utils.formatEther(inputLimit)) * ratio
        ).toFixed(18);
      }
    }
  }

  /* need to subscribe to derived value somewhere in code, otherwise it wont 
	update and errors wont be displayed on time so we do it here */
  inputAmountBigNum;
</script>

<div class="deposit-amount-section">
  <h1 class="deposit-header">{headerText}</h1>
  <label for="amount" />
  <input id="amount" bind:value={inputAmount} type="number" min="0" lang="en" />
  <div class="collateral-type">{inputTypeText}: <SelectCollateral /></div>
  <div class="buttons">
    <button
      class="percent-button"
      type="button"
      on:click={() => handlePercentButton(0.25)}>25%</button
    >
    <button
      class="percent-button"
      type="button"
      on:click={() => handlePercentButton(0.5)}>50%</button
    >
    <button
      class="percent-button"
      type="button"
      on:click={() => handlePercentButton(0.75)}>75%</button
    >
    <button
      class="percent-button"
      type="button"
      on:click={() => handlePercentButton(1)}>100%</button
    >
  </div>
  <Button3D {actionHandler}>{actionText}</Button3D>
  <div>{inputError}</div>
</div>

<style>
  .deposit-amount-section {
    white-space: nowrap;
    font-weight: 700;
    height: 100%;
    text-align: center;
  }

  .deposit-header {
    font-size: 1.8rem;
  }

  input {
    all: unset;
		color: grey;
    appearance: none;
		border-bottom: 0.5px solid var(--light-color);
    font-size: 2.6rem;
    font-weight: 700;
    width: 80%;
  }

  .collateral-type {
    color: grey;
    width: 10rem;
    margin: 0 auto 0.5rem auto;
    text-align: center;
    font-size: 1rem;
  }
  .percent-button {
    background-color: var(--main-color);
    color: var(--light-color);
    font-size: 1rem;
    margin: 0.5rem;
    cursor: pointer;
    width: 5rem;
    border: 2px solid var(--light-color);
    border-radius: 1rem;
    margin-bottom: 1rem;
  }

  /* remove arrows form input */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
</style>
