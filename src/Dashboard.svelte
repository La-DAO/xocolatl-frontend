<script lang="ts">
	import { selectedTab } from './store';

	import PillNavigation from './PillNavigation.svelte';
	import CollateralInfo from './CollateralInfo.svelte';
	import MainInfo from './MainInfo.svelte';
	import AmountInput from './AmountInput.svelte';


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
	} from './store';	

</script>

<style>
	section {
		display: flex;
		flex-direction: column;
		margin: 1rem 0 0 0;

		font-family: "Quicksand", sans-serif;
	}

	.wrapper {
		background-color: var(--main-color);
		color: white;
	}


	.main-section {
		display: flex;
		justify-content: center;
		align-items: baseline;
		margin: 1.5rem 0 0 0;
		min-width: 50rem;
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
			{#if $selectedTab==='deposit'}
				<AmountInput headerText={'Cantidad de WETH a depositar'} bind:inputAmount={$WETHDepositInputAmount} bind:inputError={$WETHDepositInputError} inputAmountBigNum={$WETHDepositInputAmountBigNum}/>
			{:else if $selectedTab==='mint'}
				<AmountInput headerText={'Cantidad de XOC a mintear'} bind:inputAmount={$XOCMintInputAmount} bind:inputError={$XOCMintInputError} inputAmountBigNum={$XOCMintInputAmountBigNum}/>
			{:else if $selectedTab==='burn'}
				<AmountInput headerText={'Cantidad de XOC a amortizar'} bind:inputAmount={$XOCBurnInputAmount} bind:inputError={$XOCBurnInputError} inputAmountBigNum={$XOCBurnInputAmountBigNum}/>
			{:else if $selectedTab==='withdraw'}
				<AmountInput headerText={'Cantidad de WETH a retirar'} bind:inputAmount={$WETHWithdrawInputAmount} bind:inputError={$WETHWithdrawInputError} inputAmountBigNum={$WETHWithdrawInputAmountBigNum}/>
			{/if}
			<div class="info-section"><CollateralInfo/></div>
		</div>
	</div>

	<MainInfo/>
</section>

