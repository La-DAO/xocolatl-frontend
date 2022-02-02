<script lang="ts">
	import ChainWarning from './ChainWarning.svelte';
	import Header from './Header.svelte';
	import Dashboard from './Dashboard.svelte';
	import TxMonitor from './TxMonitor.svelte';
</script>

<style>
	/* TODO: bundle fonts and stop fetching from google */
	@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&family=Roboto&display=swap');

	/* global colors */
	:global(:root){
		 --main-color: #4F2608; /* chocolate */
	}

	main {
		text-align: center;
		padding: 0;
		max-width: 240px;
		margin: 0 auto;
		font-family: "Roboto", sans-serif;	
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

		<main>
			<ChainWarning />
			<Header /> 
			<Dashboard />
			<TxMonitor />
		</main>
