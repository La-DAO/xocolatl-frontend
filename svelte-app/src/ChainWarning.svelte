<script lang="ts">
	import { connected, chainId, provider} from 'svelte-ethers-store';

	 async function changeNetwork() {
		console.log($provider);
		await window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x2A'}]});
	}
</script>
<style>
	.chain-warning {
		flex-direction: column;
		background-color: grey;
	}

	.disabled {
		display: none;
	}
</style>
<div class="chain-warning" class:disabled={!$connected || $chainId===42}>
	<p>Conectado a la red incorrecta</p>
	<button on:click={()=>changeNetwork()}>Cambiar a kovan</button>
</div>
