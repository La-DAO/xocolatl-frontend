<script lang="ts">
import { _ } from 'svelte-i18n';
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
	XOCRedeemInputAmount, 
	XOCRedeemInputAmountBigNum,
	XOCRedeemInputError, 
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
		color: var(--light-color);
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
		flex-grow: 1;
	}


	.info-section {
		flex-basis: 60%;
		flex-grow: 1;
	}



</style>

<section>
	<div class="wrapper">
		<PillNavigation/>
		<div class="main-section">
			<div class="input-section">
			{#if $selectedTab==='deposit'}
				<AmountInput 
					headerText={$_('input.deposit')} 
					bind:inputAmount={$WETHDepositInputAmount} 
					bind:inputError={$WETHDepositInputError} 
					inputAmountBigNum={$WETHDepositInputAmountBigNum}
					inputLimit={$userWETHBalance}
					inputTypeText={$_('input.collateral') + ': WETH'}
				/>
			{:else if $selectedTab==='mint'}
				<AmountInput 
					headerText={$_('input.mint')} 
					bind:inputAmount={$XOCMintInputAmount} 
					bind:inputError={$XOCMintInputError} 
					inputAmountBigNum={$XOCMintInputAmountBigNum}
					inputLimit={$userXOCMintingPower}
					inputTypeText={$_('input.token') + ': XOC'}
				/>
			{:else if $selectedTab==='redeem'}
				<AmountInput 
					headerText={$_('input.redeem')} 
					bind:inputAmount={$XOCRedeemInputAmount} 
					bind:inputError={$XOCRedeemInputError} 
					inputAmountBigNum={$XOCRedeemInputAmountBigNum}
					inputLimit={$userXOCBalance}
					inputTypeText={$_('input.token') + ': XOC'}
				/>
			{:else if $selectedTab==='withdraw'}
				<AmountInput 
					headerText={$_('input.withdraw')} 
					bind:inputAmount={$WETHWithdrawInputAmount} 
					bind:inputError={$WETHWithdrawInputError} 
					inputAmountBigNum={$WETHWithdrawInputAmountBigNum}
					inputLimit={$userWETHMaxWithdrawal}
					inputTypeText={$_('input.collateral') + ': WETH'}
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

