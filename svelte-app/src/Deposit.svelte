<script lang="ts">
	
</script>

<style>

	.deposit-amount-section {
		margin: 0 0 0 1rem;
		font-weight: 700;

	}

	.deposit-header {
		font-size: 2rem;
	}

	.deposit-amount-section > input {
  	all: unset;
    appearance: none;
		font-size: 3.5rem;
		font-weight: 700;
	}

	.collateral-select-section {
		margin: 0 2rem 0 0;
	}
	
	.collateral-asset {
		border-radius: 30px;
		color: black;
	}
</style>

	<div class="deposit-amount-section">
		<h1 class="deposit-header"> Cantidad de ETH a depositar </h1>
		<input type="number" value="0.0" min="0"/>
		<div class="buttons">
			<button type="button">25%</button>
			<button type="button">50%</button>
			<button type="button">75%</button>
			<button type="button">100%</button>
		</div>
		<button type="button">Despositar</button>
	</div>
	
