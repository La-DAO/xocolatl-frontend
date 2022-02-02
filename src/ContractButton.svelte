<script lang="ts">

	import { isRighNetwork, selectedTab, WETHDepositInputAmountBigNum, XOCBurnInputAmountBigNum } from './store';
	import { approveWETH, depositWETH, mintXOC, approveXOC, burnXOC, withdrawWETH } from './contractCalls';
	import { getWETHAllowance, getXOCAllowance} from './contractReads';

	import type { BigNumber } from 'ethers';
	
	let allowanceWETHPromise: Promise<BigNumber> | undefined;
	let allowanceXOCPromise: Promise<BigNumber> | undefined;

	$: if ($isRighNetwork) {
		allowanceWETHPromise = getWETHAllowance();
		allowanceXOCPromise = getXOCAllowance();
	}
</script>
{#if $selectedTab === 'deposit'}
	{#if allowanceWETHPromise && $WETHDepositInputAmountBigNum}
		{#await allowanceWETHPromise}
		...
		{:then allowanceWETH}
				{#if allowanceWETH.lt($WETHDepositInputAmountBigNum)}
					<button on:click={approveWETH} type="button">Aprovar</button>
			{:else}
				<button on:click={depositWETH} type="button">Despositar</button>
			{/if}
		{:catch error}
		There was an error! {error}
		{/await}
	{/if}

{:else if $selectedTab === 'mint'}
	<button on:click={mintXOC} type="button">Mintea</button>
{:else if $selectedTab === 'burn'}
	{#if allowanceXOCPromise && $XOCBurnInputAmountBigNum}
		{#await allowanceXOCPromise}
		...
		{:then allowanceXOC}
			{#if allowanceXOC.lt($XOCBurnInputAmountBigNum)}
				<button on:click={approveXOC} type="button">Aprovar</button>
			{:else}
				<button on:click={burnXOC} type="button">Amortizar</button>
			{/if}
		{:catch error}
		There was an error! {error}
		{/await}
	{/if}
{:else if $selectedTab === 'withdraw'}
	<button on:click={withdrawWETH} type="button">Retirar</button>
{/if}

