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

const commify = ethers.utils.commify;
</script>

<style>
	section {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 80%;
		margin: 1rem auto 1rem auto;
		color: var(--main-color);
		column-gap: 5rem;
		flex-wrap: wrap;
	}

	.outer-box {
		border: 2px solid var(--main-color);
		width: 32rem;
	}

	.box-header {
		padding: 0.5rem;
		display: flex;
		font-weight: 900;
		align-items: center;
		font-size: 2rem;
		height: 4rem;
		border-bottom: 1px solid var(--main-color);
	}

	.box-row {

		padding: 0.5rem;
		display: flex;
		justify-content: space-between;
		height: 3rem;
		border-bottom: 1px solid var(--main-color);
	}

	.highlight {
		font-weight: 700;
	}

</style>

<section>
	<div class="outer-box">
		<div class="box-header">
			<b>DEPOSITOS</b>
		</div>
		<div class="box-row">
			<p class:highlight={$selectedTab === 'deposit'}>Balance actual del wallet </p> 
			<p>{$userWETHBalance ? ethers.utils.formatEther($userWETHBalance.sub($userWETHBalance.mod(1e10))) : '-'} ETH</p>
		</div>

		<div class="box-row">
			<p class:highlight={$selectedTab === 'withdraw' || $selectedTab === 'deposit'}>Balance de colateral depositado </p>
			<p>{$userWETHDepositBalance ? ethers.utils.formatEther($userWETHDepositBalance.sub($userWETHDepositBalance.mod(1e10))) : '-'} ETH</p>
		</div>

		<div class="box-row">
			<p class:highlight={$selectedTab === 'withdraw'}>Disponible para retirar </p>
			<p>{$userWETHMaxWithdrawal ? ethers.utils.formatEther($userWETHMaxWithdrawal.sub($userWETHMaxWithdrawal.mod(1e10))) : '-'} ETH</p>
		</div>
  </div>

	<div class="outer-box">

		<div class="box-header">
			<b>PRESTAMOS</b>
		</div>
		
		<div class="box-row">
			<p class:highlight={$selectedTab === 'burn' || $selectedTab === 'mint'}>Deuda restante </p>
			<p>{$userXOCDebt ? commify(ethers.utils.formatEther($userXOCDebt.sub($userXOCDebt.mod(1e14)))) : '-'} XOC</p>
		</div>
		
		<div class="box-row">
			<p class:highlight={$selectedTab === 'mint'}>Disponible para pedir prestado </p>
			<p>{$userXOCMintingPower ? commify(ethers.utils.formatEther($userXOCMintingPower.sub($userXOCMintingPower.mod(1e14)))) : '-'} XOC</p>
		</div>
		<div class="box-row">
			<p class:highlight={$selectedTab === 'burn'}>El saldo de su cartera </p>
			<p>{$userXOCBalance ? commify(ethers.utils.formatEther($userXOCBalance.sub($userXOCBalance.mod(1e14)))) : '-'} XOC</p>
		</div>
	</div>
</section>

<ContractButton/>
