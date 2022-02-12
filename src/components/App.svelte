<script lang="ts">
import { ethers } from 'ethers';
import { provider, chainId, defaultEvmStores } from 'svelte-ethers-store';

import ChainWarning from './ChainWarning.svelte';
import Header from './Header.svelte';
import Dashboard from './Dashboard.svelte';
import TxMonitor from './TxMonitor.svelte';
import Polling from './Polling.svelte';

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
	@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700;900&family=Roboto&display=swap');

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

<main>
	<ChainWarning />
	<Header />  
	<Dashboard />
	<TxMonitor />
	<Polling />
</main>
