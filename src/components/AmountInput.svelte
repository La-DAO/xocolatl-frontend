<script lang="ts">
	import { ethers } from 'ethers';
	import type {BigNumber} from 'ethers';
	// writeable object from store to bind to input
	export let inputAmount: number;
	export let inputError: string;
	export let inputAmountBigNum: BigNumber | undefined;
	export let inputLimit: BigNumber | null; 
	export let headerText: string;


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
		margin: 0 0 0 1rem;
		font-weight: 700;
		flex-basis: 40%;
		border-right: 1px solid white;
	}

	.deposit-header {
		font-size: 2rem;
	}

	.deposit-amount-section > input {
  	all: unset;
    appearance: none;
		font-size: 3.5rem;
		font-weight: 700;
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
		<input bind:value={inputAmount} type="number" min=0 max={inputLimit ? parseFloat(ethers.utils.formatEther(inputLimit)) : 0}/>
		<div class="buttons">
			<button type="button" on:click={()=>handlePercentButton(0.25)}>25%</button>
			<button type="button" on:click={()=>handlePercentButton(0.5)}>50%</button>
			<button type="button" on:click={()=>handlePercentButton(0.75)}>75%</button>
			<button type="button" on:click={()=>handlePercentButton(1)}>100%</button>
		</div>
	{inputError}
	</div>

