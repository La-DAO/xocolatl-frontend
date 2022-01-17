<script lang="ts">
	import { Router } from "svelte-navigator";

	import { selectedTab } from "./store";

	import PillNavigation from "./PillNavigation.svelte";
	import CollateralInfo from "./CollateralInfo.svelte";
	import Deposit from "./Deposit.svelte";
	import Borrow from "./Borrow.svelte";
	import MainInfo from "./MainInfo.svelte";


	let selectedTabValue;

	selectedTab.subscribe(value => {
			selectedTabValue = value;
	});
</script>

<style>
	section {
		display: flex;
		flex-direction: column;
		margin: 1rem 0 0 0;

		font-family: "Quicksand", sans-serif;
	}

	.wrapper {
		background-color: var(--main-color);
		color: white;
	}


	.main-section {
		display: flex;
		justify-content: center;
		align-items: baseline;
		margin: 1.5rem 0 0 0;
		min-width: 50rem;
	}

	.input-section {
		flex-basis: 40%;
		border-right: 1px solid white;
		/* background-color: green; */
	}

	.info-section {
		flex-basis: 60%;
		/* background-color: blue; */
	}


</style>

<section>
	<div class="wrapper">
		<PillNavigation/>
		<div class="main-section">
			{#if selectedTabValue==='deposit'}
			<div class=input-section><Deposit/></div>
			{:else if selectedTabValue==='borrow'}
			<div class=input-section><Borrow/></div>
			{/if}
			<div class="info-section"><CollateralInfo/></div>
		</div>

	</div>

	<MainInfo/>
</section>

