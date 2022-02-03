<script lang="ts">

	import { connected } from 'svelte-ethers-store';
	import { isRighNetwork } from '../store/store';

	async function changeNetwork() {
		// @ts-ignore:next-line
		await window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x4'}]});
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
<div class="chain-warning" class:enabled={ $connected && !$isRighNetwork}>
	<p>Conectado a la red incorrecta</p>
	<button on:click={()=>changeNetwork()}>Cambiar a rinkeby</button>
</div>
