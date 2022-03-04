<script lang="ts">
	import { ethers } from 'ethers';
	import type {BigNumber} from 'ethers';
	// writeable object from store to bind to input
	export let inputAmount: number;
	export let inputError: string;
	export let inputAmountBigNum: BigNumber | undefined;
	export let inputLimit: BigNumber | null; 
	export let headerText: string;
	export let inputTypeText: string;


	function handlePercentButton(ratio: number) {
		if(inputLimit) {
			inputAmount = +((parseFloat(ethers.utils.formatEther(inputLimit))*ratio).toFixed(18));
		} 
	}

	/* need to subscribe to derived value somewhere in code, otherwise it wont 
	update and errors wont be displayed on time so we do it here */
	inputAmountBigNum;
</script>

<style>
	.deposit-amount-section {
		white-space: nowrap;
		font-weight: 700;
		height: 100%;
		text-align: center;
	}

	.deposit-header {
		font-size: 2rem;
	}

	.deposit-amount-section > input {
  	all: unset;
    appearance: none;
		font-size: 3.2rem;
		font-weight: 700;
		width: 100%;
	}

	.collateral-type {
		color: var(--light-color);
		width: 10rem;
		margin: 2rem auto 2rem auto;
		text-align: center;
		font-size: 1.2rem;
	}
	.percent-button {
		background-color: var(--light-color);
		font-size: 1rem;
		margin: 0.5rem;
		cursor: pointer;
		width: 5rem;
		border: none;
		border-radius: 1rem;
	}

	/* remove arrows form input */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
	}
	input[type=number]{
			-moz-appearance: textfield;
	}
</style>

	<div class="deposit-amount-section">
		<h1 class="deposit-header"> {headerText} </h1>
		<input bind:value={inputAmount} type="number" min=0 lang="en"/>
		<div class="buttons">
			<button class="percent-button" type="button" on:click={()=>handlePercentButton(0.25)}>25%</button>
			<button class="percent-button" type="button" on:click={()=>handlePercentButton(0.5)}>50%</button>
			<button class="percent-button" type="button" on:click={()=>handlePercentButton(0.75)}>75%</button>
			<button class="percent-button" type="button" on:click={()=>handlePercentButton(1)}>100%</button>
		</div>
		{inputError}
		<div class='collateral-type'>{inputTypeText}</div>
	</div>

