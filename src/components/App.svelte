<script lang="ts">
import { ethers } from 'ethers';
import { provider, chainId, connected, defaultEvmStores } from 'svelte-ethers-store';
import '@fontsource/quicksand';
import '@fontsource/quicksand/700.css';
import '@fontsource/roboto';

import '../i18n'; // locales
import { isLoading, _ } from 'svelte-i18n';

import Header from './Header.svelte';
import Dashboard from './Dashboard.svelte';
import TxMonitor from './TxMonitor.svelte';
import Polling from './Polling.svelte';
import ChainModal from './ChainModal.svelte';
import Footer from './Footer.svelte';


import { isRighNetwork } from '../store/store';

import { handleProviderChange, checkIfAlreadyConnected } from '../utils';

$: $provider && handleProviderChange();

function handleNetworkChange(oldChain: number | string, newChain: number | string): number | string {
	if(oldChain && newChain) {
		window.location.reload();
	}
	return newChain; 
}


checkIfAlreadyConnected();

let oldChain: number | string;
$: oldChain = handleNetworkChange(oldChain, $chainId);
</script>


<style>
	/* global colors */
	:global(:root){
		--main-color: #4F2608; /* chocolate */
		--light-color: #E0DDD7;
	}
	:global(html, body) {
		background-color: var(--light-color);

	}

	main {
		width: 100%;
		padding: 0;
		margin: 0;
		font-family: "Roboto", sans-serif;	
		background-color: #E0DDD7;
		min-height: 100vh;
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
	<Footer />
</main>
{/if}
