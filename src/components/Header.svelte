<script lang="ts">

	import { defaultEvmStores, signerAddress, chainId} from 'svelte-ethers-store';
	import { toShortAddress } from '../utils';

	import { resetAll } from '../store/contractData';
	import { chains } from '../chains';

	async function handleDisconnect() {
		defaultEvmStores.disconnect();
		resetAll();
	}

	async function handleConnect() {
		defaultEvmStores.setProvider();
	}

	$: shortSignerAddress = toShortAddress($signerAddress);

	$: currentChain = chains[$chainId] ? chains[$chainId].name : 'unsupported chain';

	function addXOCToMetamask() {
		// @ts-ignore:next-line
		window.ethereum.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20', // Initially only supports ERC20, but eventually more!
				options: {
					address: chains[$chainId].XOCAddress, // The address that the token is at.
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
		margin: 0;
		width: 100%;
		background-color: var(--main-color);
		color: white;
	}

	.container {
		display: flex;
		width: 90%;
		justify-content: space-between;
		align-items: center;
		margin: auto;
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
	<div class="container">
		<h2>Xocolatl</h2>
		<div class="right-content">
		{#if $signerAddress}
			
			{currentChain}
			<img class="add-token-button" src="/static/token.png" on:click={addXOCToMetamask} alt="Add XOC to metamask button"/>

			{shortSignerAddress + ' '}
			<button type="button" on:click={handleDisconnect}> Disconnect </button>
		{:else}
			<button type="button" on:click={handleConnect}> Connect with metamask</button>
		{/if}
		</div>
	</div>
</header>



