<script lang="ts">
	import { connected, chainId} from 'svelte-ethers-store';

	async function changeNetwork() {
		// @ts-ignore:next-line
		await window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x2A'}]});
	}

</script>
<style>
	.chain-warning {
		flex-direction: column;
		background-color: grey;
		display: none;
	}

	.enabled {
		display: block;
	}
</style>
<!-- chain id is sometimes hex and sometimes int -->
<div class="chain-warning" class:enabled={$connected && $chainId!=='0x2a' && $chainId!==42}>
	<p>Conectado a la red incorrecta</p>
	<button on:click={()=>changeNetwork()}>Cambiar a kovan</button>
</div>
