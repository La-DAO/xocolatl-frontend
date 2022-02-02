<script lang="ts">
	import { toShortAddress } from './utils';
	import { defaultEvmStores, signerAddress} from 'svelte-ethers-store';
	import { XOCAddress } from './abis';

	async function handleDisconnect() {
		defaultEvmStores.disconnect();
	}

	async function handleConnect() {
		defaultEvmStores.setProvider();
	}

	$: shortSignerAddress = toShortAddress($signerAddress);

	async function addXOCToMetamask() {
		try {
			// wasAdded is a boolean. Like any RPC method, an error may be thrown.
			// @ts-ignore:next-line
			const wasAdded = await window.ethereum.request({
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

			if (wasAdded) {
				console.log('Thanks for your interest!');
			} else {
				console.log('Your loss!');
			}
		} catch (error) {
			console.log(error);
		}
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
	}
	.add-token-button {
		/* display: block; */
		width: 2.5rem;
		margin: 0 1rem 0 0;
		cursor: pointer;
	}
	
</style>

<header class="header">

	<h2>Xocolatl</h2>

	<div class="right-content">
	{#if $signerAddress}
		<img class="add-token-button" src="/static/token.png" on:click={addXOCToMetamask} alt="Add XOC to metamask button"/>
		{shortSignerAddress}
		<button type="button" on:click={handleDisconnect}> Disconnect </button>
	{:else}
		<button type="button" on:click={handleConnect}> Connect with metamask</button>
	{/if}
	</div>
</header>



