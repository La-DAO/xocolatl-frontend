<script lang="ts">
	import ContractButton from './ContractButton.svelte';
	import { connected, chainId } from 'svelte-ethers-store';
	import {fetchAllDisplayData} from './contractReads';

	import {userWETHBalance, userWETHDepositBalance, userWETHMaxWithdrawal, userXOCDebt, userXOCBalance, userXOCMintingPower} from './store';

	$: if ($connected && $chainId===42) {
		fetchAllDisplayData();
	}
</script>

<style>
	section {
		display: flex;
		flex-direction: column;
		width: 80rem;
		margin: auto;
	}
	b, p {
		text-align: left;
		border-bottom: 1px solid var(--main-color);
	}
</style>

<section>
	<b>Depositos</b>

	<p>Balance actual del wallet {$userWETHBalance}</p> 

	<p>Balance de colateral depositado {$userWETHDepositBalance}</p>

	<p>Disponible para retirar {$userWETHMaxWithdrawal}</p>

	<b>Prestamos</b>

	<p>Deuda restante de XOC {$userXOCDebt}</p>

	<p>Disponible para pedir prestado {$userXOCMintingPower}</p>

	<p>El saldo de su cartera {$userXOCBalance}</p>

	<ContractButton/>
</section>
