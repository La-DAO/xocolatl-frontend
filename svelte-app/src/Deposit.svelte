<script lang="ts">
	
</script>

<style>
	section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 1rem 0 0 0;
		background-color: var(--main-color);
		color: white;
		font-family: "Quicksand", sans-serif;
	}

	.deposit-amount-section {
		margin: 0 0 0 1rem;
		font-weight: 700;

	}

	.deposit-header {
		font-size: 2rem;
	}

	.deposit-amount-input > input {
  	all: unset;
 		/* -webkit-appearance: none; */
    /* -moz-appearance: none; */
    appearance: none;
		/* border: none; */
		/* color: white; */
    /* background-image: none; */
    /* background-color: transparent; */
		/* box-shadow: none; */
		/* font-family: "Quicksand", sans-serif; */
		font-size: 3.5rem;
		font-weight: 700;
	}

	.collateral-select-section {
		margin: 0 2rem 0 0;
		/* margin-right: 1rem; */
	}
	
	.collateral-asset {
		border-radius: 30px;
		color: black;
	}
</style>

<section>
	<div class="deposit-amount-section">
		<h1 class="deposit-header"> Cantidad a depositar </h1>
		<input type="number" value="0.0" min="0"/>
		<div class="buttons">
			<button type="button">25%</button>
			<button type="button">50%</button>
			<button type="button">75%</button>
			<button type="button">100%</button>
		</div>
	</div>
	<div class="collateral-select-section">
		<div class="collateral-asset">
			ETH
		</div>
	</div>
</section>
