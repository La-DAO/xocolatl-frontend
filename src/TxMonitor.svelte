<script lang="ts">
	import { toShortAddress } from './utils';
	import { blockExplorerURL } from './constants';
	import { pendingTxs } from './store';
	
	function handleClose(txHash: string) {
		pendingTxs.closeModal(txHash);
	}

</script>

<style>

.overlay-wrapper {
	z-index: 100;
	position: absolute;
	top: 12vh;
	right: 4vh;
}

.overlay-box {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 1rem auto auto auto;
	width: 20rem;
	height: 17rem;
	border: 2px solid black;
	border-radius: 5px;
	background-color: white;
}

.loader {
	margin: 0.5rem auto auto auto;
	position: relative;
  border: 0.5rem solid #f3f3f3; /* Light grey */
  border-top: 0.5rem solid #3498db; /* Blue */
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.close-button {
	align-self: end;
	font-size: 1.5rem;
	margin: 1rem 1.5rem 0 0;
  cursor: pointer;
}

</style>

<div class="overlay-wrapper">
	{#each $pendingTxs as tx}
			<div class="overlay-box">
				<div class="close-button" on:click={()=>handleClose(tx.hash)}>&#10006;</div>
				<p>Transaccion enviada, esperando confirmaciones</p>
				<p>{toShortAddress(tx.hash)}</p>
				<a href={blockExplorerURL + 'tx/' + tx.hash} target="_blank" rel="noopener noreferrer">Ver en el explorador</a>
				<div class="loader"></div>
					{tx.status}
			</div>
		{/each}
</div>
