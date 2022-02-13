<script lang="ts">
import { toShortAddress } from '../utils';
import { blockExplorerURL } from '../constants';
import { pendingTxs } from '../store/store';

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
	width: 24rem;
	height: 26rem;
	border: 2px solid black;
	border-radius: 5px;
	background-color: white;
	opacity: 0.9;
	padding: 1rem;
}

.loader {
	margin: 0 0.5rem 0 0.7rem;
	position: relative;
  border: 0.2rem solid #f3f3f3; /* Light grey */
  border-top: 0.2rem solid var(--main-color); /* Blue */
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  animation: spin 2s linear infinite;
}

.status-icon {
  width: 1.5rem;
  height: 1.5rem;
	font-size: 1.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.heading {
	display: flex;

}

h2 {
	font-family: Quicksand;
	margin: 0;
	padding: 0;
}
a {
	text-decoration: none;
}

.hash {
	font-weight: 600;
	color: #0057FF;
	font-family: Quicksand;
	font-weight: 900;
}

.button-line {
	display: flex;
}

.button {
	cursor: pointer;
	color: #371903;
  border: 0.1rem solid black; /* Light grey */
	text-align: center;
	padding: 0.5rem;
	margin: auto;
	border-radius: 5px;
	width: 10rem;
}

img {
	height: 14rem;
	margin-bottom: 1rem;
}


</style>

<div class="overlay-wrapper">
	{#each $pendingTxs as tx}
			<div class="overlay-box">
				<div class="heading">
					{#if tx.status === 'pending'}
					<div class="loader"></div>
					<h2>Transacción Enviada </h2>
					{:else if tx.status === 'completed'}
					<div class="status-icon">✓</div>
					<h2>Transacción Confirmada</h2>
					{:else if tx.status === 'failed'}
					<div class="status-icon">⨯</div>
					<h2>Transacción Fallida</h2>
					{/if}
				</div>

				{#if tx.status === 'pending'}
				<p>Esperando confirmación de la transacción, disfruta la fruta</p>
				{:else if tx.status === 'completed'}
				<p>La transacción ha sido procesada exitosamente, y ahora puedes verlo reflejado en tu balance.</p>
				{:else if tx.status === 'failed'}
				<p>¡Ay caramba! La transaccion ha fallado por alguna razon, intenta mandarla de nuevo</p>
				{/if}

				<a class="hash" href={blockExplorerURL + 'tx/' + tx.hash} target="_blank" rel="noopener noreferrer">{toShortAddress(tx.hash)}</a>


				{#if tx.status === 'pending'}
				<img src="/static/waiting.svg" alt="text waiting"/>
				{:else if tx.status === 'completed'}
				<img src="/static/success.svg" alt="text waiting"/>
				{:else if tx.status === 'failed'}
				<img src="/static/failure.svg" alt="text waiting"/>
				{/if}
				<div class="button-line">
					<a href={blockExplorerURL + 'tx/' + tx.hash} target="_blank" rel="noopener noreferrer">
						<div class='button'>Ver en el explorador</div>
					</a>
					<div class='button' on:click={()=>handleClose(tx.hash)}>Cerrar este mensaje</div>
				</div>
			</div>
		{/each}
</div>


