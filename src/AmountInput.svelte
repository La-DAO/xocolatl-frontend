<script lang="ts">
	// writeable object from store to bind to input
	export let inputAmount: number;
	export let inputError: string;
	export let headerText: string;
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

	/* remove arrows form input */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
	}
	input[type=number]{
			-moz-appearance: textfield;
	}
</style>

	<div class="deposit-amount-section">
		<h1 class="deposit-header"> {headerText} </h1>
		<input bind:value={inputAmount} type="number" min=0 max=12/>
		<div class="buttons">
			<button type="button">25%</button>
			<button type="button">50%</button>
			<button type="button">75%</button>
			<button type="button">100%</button>
		</div>
	{inputError}
	</div>

