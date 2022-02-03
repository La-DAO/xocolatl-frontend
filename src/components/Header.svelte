<script lang="ts">
	import { toShortAddress } from '../utils';
	import { defaultEvmStores, signerAddress} from 'svelte-ethers-store';
	import { XOCAddress } from '../abis';

	async function handleDisconnect() {
		defaultEvmStores.disconnect();
	}

	async function handleConnect() {
		defaultEvmStores.setProvider();
	}

	$: shortSignerAddress = toShortAddress($signerAddress);

	function addXOCToMetamask() {
		// @ts-ignore:next-line
		window.ethereum.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20', // Initially only supports ERC20, but eventually more!
				options: {
					address: XOCAddress, // The address that the token is at.
					symbol: 'XOC', // A ticker symbol or shorthand, up to 5 chars.
					decimals: 18, // The number of decimals in the token
					/* image: '', // TODO: A string url of the token logo */
				},
			},
		});
	}
	
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
	.right-content {
		display: flex;
		align-items: center;
		column-gap: 1rem;
	}

	.add-token-button {
		width: 2.5rem;
		cursor: pointer;
	}
	
</style>

<header class="header">

	<h2>Xocolatl</h2>

	<div class="right-content">
	{#if $signerAddress}
		<img class="add-token-button" src="/static/token.png" on:click={addXOCToMetamask} alt="Add XOC to metamask button"/>
		{shortSignerAddress + ' '}
		<button type="button" on:click={handleDisconnect}> Disconnect </button>
	{:else}
		<button type="button" on:click={handleConnect}> Connect with metamask</button>
	{/if}
	</div>
</header>


