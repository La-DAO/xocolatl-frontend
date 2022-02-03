<script lang="ts">
import { isRighNetwork, selectedTab } from '../store/store';
import { WETHDepositInputAmountBigNum, XOCBurnInputAmountBigNum } from '../store/userInput';
import { userWETHAllowance, userXOCAllowance } from '../store/contractData';
import { approveWETH, depositWETH, mintXOC, approveXOC, burnXOC, withdrawWETH } from '../contractCalls';
	
let disabled=true; // disable buttons until data loads
$: if ($isRighNetwork) {
	disabled=false;
}
</script>

{#if $selectedTab === 'deposit'}
	{#if $userWETHAllowance && $WETHDepositInputAmountBigNum && $userWETHAllowance.lt($WETHDepositInputAmountBigNum)}
		<button on:click={approveWETH} type="button" {disabled}>Aprovar</button>
	{:else}
		<button on:click={depositWETH} type="button" {disabled}>Despositar</button>
	{/if}
{:else if $selectedTab === 'mint'}
	<button on:click={mintXOC} type="button" {disabled}>Mintea</button>
{:else if $selectedTab === 'burn'}
	{#if $userXOCAllowance && $XOCBurnInputAmountBigNum}
		{#if $userXOCAllowance && $userXOCAllowance.lt($XOCBurnInputAmountBigNum)}
			<button on:click={approveXOC} type="button" {disabled}>Aprovar</button>
		{:else}
			<button on:click={burnXOC} type="button" {disabled}>Amortizar</button>
		{/if}
	{/if}
{:else if $selectedTab === 'withdraw'}
	<button on:click={withdrawWETH} type="button" {disabled}>Retirar</button>
{/if}

