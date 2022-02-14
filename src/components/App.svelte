<script lang="ts">
import { ethers } from 'ethers';
import { provider, chainId, connected, defaultEvmStores } from 'svelte-ethers-store';
import '@fontsource/quicksand';
import '@fontsource/quicksand/700.css';
import '@fontsource/roboto';

import '../i18n'; // locales
import { isLoading } from 'svelte-i18n'

import Header from './Header.svelte';
import Dashboard from './Dashboard.svelte';
import TxMonitor from './TxMonitor.svelte';
import Polling from './Polling.svelte';
import ChainModal from './ChainModal.svelte';

import { isRighNetwork } from '../store/store';

import { handleProviderChange } from '../utils';


$: $provider && handleProviderChange();

function handleNetworkChange(oldChain: number | string, newChain: number | string): number | string {
	if(oldChain) {
		window.location.reload();
	}
	return newChain; 
}

// connects automatically to account if returning user
async function checkIfAlreadyConnected() {
	//@ts-ignore:next-line
	if(window.ethereum) {
		//@ts-ignore:next-line
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const accounts = await provider.listAccounts();
		if (accounts[0]) {
			defaultEvmStores.setProvider();
		} 		
	}
}
checkIfAlreadyConnected();

let oldChain: number | string;
$: oldChain = handleNetworkChange(oldChain, $chainId);
</script>


<style>
	/* TODO: bundle fonts and stop fetching from google */

	/* global colors */
	:global(:root){
		--main-color: #4F2608; /* chocolate */
	}

	main {
		width: 100%;
		padding: 0;
		margin: 0;
		font-family: "Roboto", sans-serif;	
	}

</style>

{#if $isLoading}
Por favor espere...
{:else}
<main>
	<ChainModal hidden={$connected && $isRighNetwork}/>
	<Header />  
	<Dashboard />
	<TxMonitor />
	<Polling />
</main>
{/if}
