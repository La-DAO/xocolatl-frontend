<script lang="ts">
import { selectedTab } from '../store/store';

function handleSectionClick(selected: string) {
	selectedTab.set(selected);
}

let selectedTabValue: string;

selectedTab.subscribe(value => {
	selectedTabValue = value;
});
</script>

<style>
	nav {
		display: flex;
		width: 30%;
		margin: 2rem auto auto auto;
		justify-content: center;
		text-align: center;
	}

	.nav-button {
		width: 100%;
		height: 100%;
		color: black;
		background-color: white;
		border-color: white;
		margin: 0.5rem 0 0 0;
		padding: 0.8rem;
		border-style: solid;
		font-family: "Quicksand", sans-serif;
		font-weight: bold;
	}

	.left-nav-button {
		border-right: none;
		border-radius: 10px 0px 0px 10px;
	}
	
	.right-nav-button {
		border-left: none;
		border-radius: 0px 10px 10px 0px;
	}

	.selected {
		background-color: var(--main-color);
		color: white;
	}
</style>
<nav> 
	<div class="nav-button left-nav-button" class:selected={selectedTabValue==='deposit'} on:click={()=>handleSectionClick('deposit')}> Depositar </div>
	<div class="nav-button" class:selected={selectedTabValue==='mint'} on:click={()=>handleSectionClick('mint')}> Mintear </div>
	<div class="nav-button" class:selected={selectedTabValue==='burn'} on:click={()=>handleSectionClick('burn')}> Amortizar </div>
	<div class="nav-button right-nav-button" class:selected={selectedTabValue==='withdraw'} on:click={()=>handleSectionClick('withdraw')}> Retirar </div>
</nav>
