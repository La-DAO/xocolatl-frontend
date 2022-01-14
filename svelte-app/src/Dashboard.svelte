<script lang="ts">
	export let provider;

	import { Router } from "svelte-navigator";
	import Deposit from "./Deposit.svelte";
	import Borrow from "./Borrow.svelte";
	
	let currentSection = 'deposit';
	function handleSectionClick(section: string) {
		console.log(section);
		currentSection = section;
	}
</script>

<style>
	section {
		/* display: flex; */
		margin: 4rem auto auto auto;
		border: 0.1rem solid black;
		width: 75%;
		height: 70vh;
	}

	nav {
		display: flex;
		width: 30%;
		margin: 2rem auto auto auto;
		justify-content: center;
		/* background-color: black; */
	}

	.nav-button {
		width: 100%;
		height: 100%;
		background-color: white;
		border-color: black;
		padding: 0.8rem;
		border-style: solid;
		font-family: "Quicksand", sans-serif;
		font-weight: bold;
	}


	.selected {
		background-color: var(--main-color);
		color: white;
	}
	
	.left-nav-button {
		border-right: none;
		border-radius: 10px 0px 0px 10px;
	}
	
	.right-nav-button {
		border-left: none;
		border-radius: 0px 10px 10px 0px;
	}

</style>

<section>
	<nav> 
		<div class="nav-button left-nav-button" class:selected={currentSection==='deposit'} on:click={()=>handleSectionClick('deposit')}> Depositar </div>
		<div class="nav-button right-nav-button" class:selected={currentSection==='borrow'} on:click={()=>handleSectionClick('borrow')}> Retirar </div>
	</nav>

	{#if currentSection==='deposit'}
		<Deposit provider={provider}/>
	{:else if currentSection==='borrow'}
		<Borrow/>
	{/if}
</section>

