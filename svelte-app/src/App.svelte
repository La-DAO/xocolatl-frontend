<script lang="ts">
	import { Router, Route } from "svelte-navigator";

	import Header from "./Header.svelte";
	import Navigation from "./Navigation.svelte";
	import Dashboard from "./Dashboard.svelte";


	export let name: string;
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
		padding: 1em;
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

<Router>
<Route path="/">
		<main>
			<Header/>
			<Navigation/>
			<Dashboard /> 
		</main>
</Route>
</Router>
