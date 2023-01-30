<script lang="ts">
import { ethers } from 'ethers';
import { _ } from 'svelte-i18n';
import { fetchAllDisplayData } from '../contractReads';
import { isRighNetwork, selectedTab } from '../store/store';
import { 
	userCollateralBalance, 
	userCollateralDepositBalance, 
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
		width: 100%;
		margin: 1rem auto 1rem auto;
		color: var(--main-color);
		column-gap: 4rem;
		flex-wrap: wrap;
	}

	.outer-box {
		border: 2px solid var(--main-color);
		border-radius: var(--box-radius);
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

  @media (max-width: 1100px) {
		.outer-box {
			margin-bottom: 1rem;
		}
  }
	
</style>

<section>
	<div class="outer-box">
		<div class="box-header">
			<b>{$_('balances.deposits')}</b>
		</div>
		<div class:highlight={$selectedTab === 'deposit'} class="box-row">
			<p>{$_('balances.walletBalance')}</p> 
			<p>{$userCollateralBalance ? ethers.utils.formatEther($userCollateralBalance.sub($userCollateralBalance.mod(1e10))) : '-'} ETH</p>
		</div>

		<div class:highlight={$selectedTab === 'withdraw' || $selectedTab === 'deposit'} class="box-row">
			<p>{$_('balances.depositBalance')}</p>
			<p>{$userCollateralDepositBalance ? ethers.utils.formatEther($userCollateralDepositBalance.sub($userCollateralDepositBalance.mod(1e10))) : '-'} ETH</p>
		</div>

		<div class:highlight={$selectedTab === 'withdraw'} class="box-row">
			<p>{$_('balances.availableForWithdrawal')}</p>
			<p>{$userWETHMaxWithdrawal ? ethers.utils.formatEther($userWETHMaxWithdrawal.sub($userWETHMaxWithdrawal.mod(1e10))) : '-'} ETH</p>
		</div>
  </div>

	<div class="outer-box">

		<div class="box-header">
			<b>{$_('balances.loans')}</b>
		</div>
		
		<div class:highlight={$selectedTab === 'redeem' || $selectedTab === 'mint'} class="box-row">
			<p>{$_('balances.remainingLoan')}</p>
			<p>{$userXOCDebt ? commify(ethers.utils.formatEther($userXOCDebt.sub($userXOCDebt.mod(1e14)))) : '-'} XOC</p>
		</div>
		
		<div class:highlight={$selectedTab === 'mint'} class="box-row">
			<p>{$_('balances.availableToLoan')}</p>
			<p>{$userXOCMintingPower ? commify(ethers.utils.formatEther($userXOCMintingPower.sub($userXOCMintingPower.mod(1e14)))) : '-'} XOC</p>
		</div>
		<div class:highlight={$selectedTab === 'redeem'} class="box-row">
			<p>{$_('balances.xocBalance')}</p>
			<p>{$userXOCBalance ? commify(ethers.utils.formatEther($userXOCBalance.sub($userXOCBalance.mod(1e14)))) : '-'} XOC</p>
		</div>
	</div>
</section>
