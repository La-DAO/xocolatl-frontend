<script lang="ts">
	import { Router } from "svelte-navigator";

	import { selectedTab } from "./store";

	import PillNavigation from "./PillNavigation.svelte";
	import Deposit from "./Deposit.svelte";
	import Borrow from "./Borrow.svelte";


	let selectedTabValue;

	selectedTab.subscribe(value => {
			selectedTabValue = value;
	});
</script>

<style>
	section {
		background-color: var(--main-color);
	}
	/* section { */
	/* 	/1* display: flex; *1/ */
	/* 	margin: 4rem auto auto auto; */
	/* 	border: 0.1rem solid black; */
	/* 	width: 75%; */
	/* 	height: 70vh; */
	/* } */


</style>

<section>
		<PillNavigation/>
	{#if selectedTabValue==='deposit'}
		<Deposit />
	{:else if selectedTabValue==='borrow'}
		<Borrow/>
	{/if}
</section>

