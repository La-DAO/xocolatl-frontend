<script lang="ts">
	import { selectedTab, WETHDepositInputAmountBigNum, XOCMintInputAmountBigNum, XOCBurnInputAmountBigNum, WETHWithdrawInputAmountBigNum} from "./store";
	import { getWETHAllowance, approveWETH, depositWETH, mintXOC, getXOCAllowance, approveXOC, burnXOC, withdrawWETH } from "./contractCalls";

	import { connected, chainId } from 'svelte-ethers-store';

	import { BigNumber } from "ethers";
	
	let allowanceWETHPromise: Promise<BigNumber>;
	let allowanceXOCPromise: Promise<BigNumber>;

	$: if ($connected && $chainId===42) {
		allowanceWETHPromise = getWETHAllowance();
		allowanceXOCPromise = getXOCAllowance();
	}

	async function handleWETHApproval() {
		try {
			await approveWETH();
		} catch (e) {
			throw e;
		}
	}
	
	async function handleDeposit() {
		try {
			await depositWETH($WETHDepositInputAmountBigNum);
		} catch (e) {
			throw e;
		}
	}

	async function handleMint() {
		try {
			await mintXOC($XOCMintInputAmountBigNum);
		} catch(e) {
			throw e;
		}
	}


	async function handleXOCApproval() {
		try {
			await approveXOC();
		} catch (e) {
			throw e;
		}
	}

	async function handleXOCBurn() {
		try {
			await burnXOC($XOCBurnInputAmountBigNum);
		} catch (e) {
			throw e;
		}
	}

	async function handleWithdraw() {
		try {
			await withdrawWETH($WETHWithdrawInputAmountBigNum);
		} catch (e) {
			throw e;
		}
	}
</script>
{#if $selectedTab === "deposit"}
	{#if allowanceWETHPromise && $WETHDepositInputAmountBigNum}
		{#await allowanceWETHPromise}
		...
		{:then allowanceWETH}
				{#if allowanceWETH.lt($WETHDepositInputAmountBigNum)}
					<button on:click={handleWETHApproval} type="button">Aprovar</button>
			{:else}
				<button on:click={handleDeposit} type="button">Despositar</button>
			{/if}
		{:catch error}
		There was an error! {error}
		{/await}
	{/if}

{:else if $selectedTab === "mint"}
	<button on:click={handleMint} type="button">Mintea</button>

{:else if $selectedTab === "burn"}
	{#if allowanceXOCPromise && $XOCBurnInputAmountBigNum}
		{#await allowanceXOCPromise}
		...
		{:then allowanceXOC}
			{#if allowanceXOC.lt($XOCBurnInputAmountBigNum)}
				<button on:click={handleXOCApproval} type="button">Aprovar</button>
			{:else}
				<button on:click={handleXOCBurn} type="button">Amortizar</button>
			{/if}
		{:catch error}
		There was an error! {error}
		{/await}
	{/if}
{:else if $selectedTab === "withdraw"}
	<button on:click={handleWithdraw} type="button">Retirar</button>
{/if}

