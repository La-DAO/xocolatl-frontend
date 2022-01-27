<script lang="ts">
	import { toShortAddress } from './utils';
	import { defaultEvmStores, signerAddress} from 'svelte-ethers-store';

	async function handleDisconnect() {
		defaultEvmStores.disconnect();
	}
	
	async function handleConnect() {
		defaultEvmStores.setProvider();
	}

	$: shortSignerAddress = toShortAddress($signerAddress);
</script>

<style> 
	header {
		width: 92%;
		margin: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		column-gap: 1rem;
	}
	button {
		color: 'blue';
	}

</style>

<header class="header">

	<h2>Xocolatl</h2>
	<div>
	{#if $signerAddress}
		{shortSignerAddress}
		<button type="button" on:click={handleDisconnect}> Disconnect </button>
	{:else}
		<button type="button" on:click={handleConnect}> Connect with metamask</button>
	{/if}
	</div>
</header>



