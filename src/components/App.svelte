<script lang="ts">
import { provider } from 'svelte-ethers-store';

import ChainWarning from './ChainWarning.svelte';
import Header from './Header.svelte';
import Dashboard from './Dashboard.svelte';
import TxMonitor from './TxMonitor.svelte';
import Polling from './Polling.svelte';

import { handleProviderChange } from '../utils';

$: $provider && handleProviderChange();
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
