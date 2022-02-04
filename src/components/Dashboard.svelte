<script lang="ts">
import { selectedTab } from '../store/store';

import {
	userWETHBalance,
	userXOCMintingPower,
	userXOCBalance,
	userWETHMaxWithdrawal
} from '../store/contractData';

import { 
	WETHDepositInputAmount,
	WETHDepositInputAmountBigNum,
	WETHDepositInputError,
	XOCMintInputAmount, 
	XOCMintInputAmountBigNum,
	XOCMintInputError, 
	XOCBurnInputAmount, 
	XOCBurnInputAmountBigNum,
	XOCBurnInputError, 
	WETHWithdrawInputAmount, 
	WETHWithdrawInputAmountBigNum,
	WETHWithdrawInputError 
} from '../store/userInput';	

import PillNavigation from './PillNavigation.svelte';
import CollateralInfo from './CollateralInfo.svelte';
import MainInfo from './MainInfo.svelte';
import AmountInput from './AmountInput.svelte';
</script>

<style>
	section {
		display: flex;
		flex-direction: column;
		font-family: "Quicksand", sans-serif;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		background-color: var(--main-color);
		color: white;
		row-gap: 2rem;
	}

	.main-section {
		display: flex;
		justify-content: center;
		align-items: baseline;
		margin: auto;
		flex-wrap: wrap-reverse;
	}

	.input-section {
		flex-basis: 40%;
		/* max-width: 30%; */
	}


	.info-section {
		flex-basis: 60%;
		/* background-color: blue; */
	}



</style>

<section>
	<div class="wrapper">
		<PillNavigation/>
		<div class="main-section">
			<div class="input-section">
			{#if $selectedTab==='deposit'}
				<AmountInput 
					headerText={'Cantidad a depositar'} 
					bind:inputAmount={$WETHDepositInputAmount} 
					bind:inputError={$WETHDepositInputError} 
					inputAmountBigNum={$WETHDepositInputAmountBigNum}
					inputLimit={$userWETHBalance}
					inputTypeText="Colateral: WETH"
				/>
			{:else if $selectedTab==='mint'}
				<AmountInput 
					headerText={'Cantidad a mintear'} 
					bind:inputAmount={$XOCMintInputAmount} 
					bind:inputError={$XOCMintInputError} 
					inputAmountBigNum={$XOCMintInputAmountBigNum}
					inputLimit={$userXOCMintingPower}
					inputTypeText="Token: XOC"
				/>
			{:else if $selectedTab==='burn'}
				<AmountInput 
					headerText={'Cantidad a amortizar'} 
					bind:inputAmount={$XOCBurnInputAmount} 
					bind:inputError={$XOCBurnInputError} 
					inputAmountBigNum={$XOCBurnInputAmountBigNum}
					inputLimit={$userXOCBalance}
					inputTypeText="Token: XOC"
				/>
			{:else if $selectedTab==='withdraw'}
				<AmountInput 
					headerText={'Cantidad a retirar'} 
					bind:inputAmount={$WETHWithdrawInputAmount} 
					bind:inputError={$WETHWithdrawInputError} 
					inputAmountBigNum={$WETHWithdrawInputAmountBigNum}
					inputLimit={$userWETHMaxWithdrawal}
					inputTypeText="Colateral: WETH"
				/>
			{/if}
			</div>
			<div class="info-section">
				<CollateralInfo/>
			</div>
		</div>
	</div>

	<MainInfo/>
</section>

