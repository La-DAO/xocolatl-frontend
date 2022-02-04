<script lang="ts">
import { ethers } from 'ethers';

import ContractButton from './ContractButton.svelte';

import { fetchAllDisplayData } from '../contractReads';
import { isRighNetwork, selectedTab } from '../store/store';
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
		margin: 2rem auto auto auto;
		color: var(--main-color);
	}
	b {
		font-size: 1.2rem;
	}
	b, p {
		text-align: left;
		border-bottom: 1px solid var(--main-color);
	}

	.highlight {
		font-weight: 700;
	}
</style>

<section>
	<b>Depositos</b>

	<p class:highlight={$selectedTab === 'deposit'}>Balance actual del wallet {$userWETHBalance ? ethers.utils.formatEther($userWETHBalance) : '-'}</p> 

	<p class:highlight={$selectedTab === 'withdraw' || $selectedTab === 'deposit'}>Balance de colateral depositado {$userWETHDepositBalance ? ethers.utils.formatEther($userWETHDepositBalance) : '-'}</p>

	<p class:highlight={$selectedTab === 'withdraw'}>Disponible para retirar {$userWETHMaxWithdrawal ? ethers.utils.formatEther($userWETHMaxWithdrawal) : '-'}</p>

	<b>Prestamos</b>

	<p class:highlight={$selectedTab === 'burn' || $selectedTab === 'mint'}>Deuda restante {$userXOCDebt ? ethers.utils.formatEther($userXOCDebt) : '-'}</p>

	<p class:highlight={$selectedTab === 'mint'}>Disponible para pedir prestado {$userXOCMintingPower ? ethers.utils.formatEther($userXOCMintingPower) : '-'}</p>

	<p class:highlight={$selectedTab === 'burn'}>El saldo de su cartera {$userXOCBalance ? ethers.utils.formatEther($userXOCBalance) : '-'}</p>

	<ContractButton/>
</section>
