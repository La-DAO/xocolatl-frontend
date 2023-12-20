<script lang="ts">
  import { ethers } from "ethers";
  import type { BigNumber } from "ethers";

  import Button3D from "./Button3D.svelte";
  import SelectCollateral from "./SelectCollateral.svelte";

  // Props
  export let inputAmount: string;
  export let inputError: string;
  export let inputAmountBigNum: BigNumber | undefined;
  export let inputLimit: BigNumber | null;
  export let inputTypeText: string;
  export let headerText: string;
  export let actionText: string;
  export let actionHandler: () => void;

  // Array of percent options
  let percentOptions = [
    { value: 0.25, label: "25%" },
    { value: 0.5, label: "50%" },
    { value: 0.75, label: "75%" },
    { value: 1, label: "100%" },
  ];

  // Function to handle percent button click
  function handlePercentButton(ratio: number) {
    if (inputLimit) {
      let numerator, denominator;
      switch (ratio) {
        case 0.25:
          numerator = 25;
          denominator = 100;
          break;
        case 0.5:
          numerator = 50;
          denominator = 100;
          break;
        case 0.75:
          numerator = 75;
          denominator = 100;
          break;
        case 1:
          numerator = 1;
          denominator = 1;
          break;
        default:
          throw new Error("Invalid ratio");
      }

      const result = inputLimit.mul(numerator).div(denominator);
      inputAmount = ethers.utils.formatEther(result);
    }
  }

  /* Subscription to derived value.
  This ensures that updates are reflected and errors are displayed in a timely manner. */
  inputAmountBigNum;
</script>

<div class="deposit-amount-section">
  <h1 class="deposit-header">{headerText}</h1>
  <label for="amount"></label>
  <input id="amount" bind:value={inputAmount} type="text" lang="en" />

  <div class="collateral-type">
    {inputTypeText}: <SelectCollateral />
  </div>

  <!-- Percent buttons -->
  <div class="buttons">
    {#each percentOptions as { value, label }, _}
      <button
        class="percent-button"
        type="button"
        on:click={() => handlePercentButton(value)}>{label}</button
      >
    {/each}
  </div>

  <Button3D {actionHandler}>{actionText}</Button3D>

  <!-- Display input errors -->
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
    border-bottom: 1px solid var(--light-color);
    font-size: 2.6rem;
    font-weight: 700;
    width: 100%;
  }

  .collateral-type {
    color: grey;
    margin: 1rem auto;
    text-align: center;
    font-size: 1rem;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 0.5rem 0 1rem 0;
  }
  .percent-button {
    background-color: var(--main-color);
    color: var(--light-color);
    font-size: 1rem;
    cursor: pointer;
    width: 5rem;
    border: 2px solid var(--light-color);
    border-radius: 1rem;
  }

  /* Remove arrows from input */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="text"] {
    -moz-appearance: textfield;
  }
</style>
