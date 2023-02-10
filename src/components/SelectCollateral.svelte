<script lang="ts">
  import {
    getXOCDebt,
    getUserCollateralBalance,
    getUserCollateralDepositBalance,
    getMaxCollateralWithdrawal,
    getCollateralToXOCRate,
    getCollateralAllowance,
    getHealthRatio,
    getLiquidationFactor,
    getXOCMintingPower
  } from "src/contractReads";
  import { listOfCollaterals, selectedCollateral } from "src/store/userInput";

  async function handleCollateralChange(event: any) {
    const option: string = event.target.value;
    selectedCollateral.set(option);
    getUserCollateralDepositBalance();
    getXOCDebt();
    getUserCollateralBalance();
    getCollateralAllowance();
    getMaxCollateralWithdrawal();
    getCollateralToXOCRate();
    getHealthRatio();
    getXOCMintingPower();
    // await getLiquidationParams();
    // await getLiquidationFactor();
  }
</script>

<select
  class="box"
  bind:value={$selectedCollateral}
  on:change={handleCollateralChange}
>
  {#each $listOfCollaterals as option}
    <option class="options" value={option}>{option}</option>
  {/each}
</select>

<style>
  .box {
    background-color: var(--main-color);
    color: grey;
    font-size: 1.2rem;
    text-align: center;
    margin-left: 0.5rem;
    cursor: pointer;
    width: 7rem;
    border-radius: 1rem;
    margin-top: 10px;
    margin-bottom: 0rem;
  }

  .options {
    color: grey;
  }
</style>
