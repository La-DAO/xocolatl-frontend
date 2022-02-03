<script lang="ts">
import { ethers } from 'ethers';

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

	<p>Balance actual del wallet {$userWETHBalance ? ethers.utils.formatEther($userWETHBalance) : '-'}</p> 

	<p>Balance de colateral depositado {$userWETHDepositBalance ? ethers.utils.formatEther($userWETHDepositBalance) : '-'}</p>

	<p>Disponible para retirar {$userWETHMaxWithdrawal ? ethers.utils.formatEther($userWETHMaxWithdrawal) : '-'}</p>

	<b>Prestamos</b>

	<p>Deuda restante de XOC {$userXOCDebt ? ethers.utils.formatEther($userXOCDebt) : '-'}</p>

	<p>Disponible para pedir prestado {$userXOCMintingPower ? ethers.utils.formatEther($userXOCMintingPower) : '-'}</p>

	<p>El saldo de su cartera {$userXOCBalance ? ethers.utils.formatEther($userXOCBalance) : '-'}</p>

	<ContractButton/>
</section>
