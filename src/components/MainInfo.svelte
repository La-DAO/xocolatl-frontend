<script lang="ts">
import ContractButton from './ContractButton.svelte';
import { fetchAllDisplayData } from '../contractReads';

import { isRighNetwork } from '../store/store';
import { 
	userWETHBalance, 
	userWETHDepositBalance, 
	userWETHMaxWithdrawal, 
	userXOCDebt, 
	userXOCBalance, 
	userXOCMintingPower
} from '../store/contractData';

$: if ($isRighNetwork) {
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
