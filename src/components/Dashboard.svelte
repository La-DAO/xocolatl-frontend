<script lang="ts">
import { _ } from 'svelte-i18n';
import { chainId } from 'svelte-ethers-store';

import { selectedTab } from '../store/store';
import { chains } from '../chains';


import {
	userCollateralBalance,
	userXOCMintingPower,
	userXOCBalance,
	userXOCDebt,
	userCollateralMaxWithdrawal,
	userNativeTokenBalance
} from '../store/contractData';

import { 
	CollateralDepositInputAmount,
	CollateralDepositInputAmountBigNum,
	CollateralDepositInputError,
	CollateralDepositNeedsAllowance,
	XOCMintInputAmount, 
	XOCMintInputAmountBigNum,
	XOCMintInputError, 
	XOCRedeemInputAmount, 
	XOCRedeemInputAmountBigNum,
	XOCRedeemInputError, 
	WETHWithdrawInputAmount, 
	WETHWithdrawInputAmountBigNum,
	WETHWithdrawInputError 
} from '../store/userInput';	


import { approveERC20, depositERC20, mintXOC, redeemXOC, withdrawWETH, depositNativeToken } from '../contractWrites';

import PillNavigation from './PillNavigation.svelte';
import CollateralInfo from './CollateralInfo.svelte';
import MainInfo from './MainInfo.svelte';
import AmountInput from './AmountInput.svelte';
import AmountReservesInput from './AmountReservesInput.svelte';

$: isNative = ($chainId && $chainId in chains) ? chains[$chainId].supportsNative : false;

$: swapURL = ($chainId && $chainId in chains) ? chains[$chainId].swapURL : '';
</script>

<style>
	section {
		display: flex;
		flex-direction: column;
		font-family: "Quicksand", sans-serif;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		background-color: var(--main-color);
		color: var(--light-color);
		row-gap: 2rem;
	}

	.main-section {
		display: flex;
		justify-content: center;
		align-items: baseline;
		margin: auto;
		flex-wrap: wrap-reverse;
	}

	.input-section {
		flex-basis: 50%;
		flex-grow: 1;
	}


	.info-section {
		flex-basis: 50%;
		flex-grow: 1;
	}
</style>

<section>
	<div class="wrapper">
		<PillNavigation {swapURL}/>
		<div class="main-section">
			<div class="input-section">
			{#if $selectedTab==='deposit'}
				{#if isNative}
					<AmountReservesInput 
						headerText={$_('input.deposit')} 
						bind:inputAmount={$CollateralDepositInputAmount} 
						bind:inputError={$CollateralDepositInputError} 
						inputAmountBigNum={$CollateralDepositInputAmountBigNum}
						inputLimit={$userNativeTokenBalance}
						actionText={$_('actions.deposit')}
						actionHandler={depositNativeToken}
					/>
				{:else}
					{#if $CollateralDepositNeedsAllowance}
						<AmountReservesInput 
							headerText={$_('input.deposit')} 
							bind:inputAmount={$CollateralDepositInputAmount} 
							bind:inputError={$CollateralDepositInputError} 
							inputAmountBigNum={$CollateralDepositInputAmountBigNum}
							inputLimit={$userCollateralBalance}
							actionText={$_('actions.approve')}
							actionHandler={approveERC20}
						/>
					{:else} 
						<AmountReservesInput 
							headerText={$_('input.deposit')} 
							bind:inputAmount={$CollateralDepositInputAmount} 
							bind:inputError={$CollateralDepositInputError} 
							inputAmountBigNum={$CollateralDepositInputAmountBigNum}
							inputLimit={$userCollateralBalance}
							actionText={$_('actions.deposit')}
							actionHandler={depositERC20}
						/>
					{/if}
				{/if}
			{:else if $selectedTab==='mint'}
				<AmountInput 
					headerText={$_('input.mint')} 
					bind:inputAmount={$XOCMintInputAmount} 
					bind:inputError={$XOCMintInputError} 
					inputAmountBigNum={$XOCMintInputAmountBigNum}
					inputLimit={$userXOCMintingPower}
					inputTypeText={$_('input.token-mint')}
					actionHandler={mintXOC}
					actionText={$_('actions.mint')}
				/>
			{:else if $selectedTab==='redeem'}
				<AmountInput 
					headerText={$_('input.redeem')} 
					bind:inputAmount={$XOCRedeemInputAmount} 
					bind:inputError={$XOCRedeemInputError} 
					inputAmountBigNum={$XOCRedeemInputAmountBigNum}
					inputLimit={$userXOCBalance?.gt($userXOCDebt ? $userXOCDebt : 0) ? $userXOCDebt : $userXOCBalance}
					inputTypeText={$_('input.token-redeem')}
					actionHandler={redeemXOC}
					actionText={$_('actions.redeem')}
				/>
			{:else if $selectedTab==='withdraw'}
				<AmountReservesInput 
					headerText={$_('input.withdraw')} 
					bind:inputAmount={$WETHWithdrawInputAmount} 
					bind:inputError={$WETHWithdrawInputError} 
					inputAmountBigNum={$WETHWithdrawInputAmountBigNum}
					inputLimit={$userCollateralMaxWithdrawal}
					actionHandler={withdrawWETH}
					actionText={$_('actions.withdraw')}
				/>
			{/if}
			</div>
			<div class="info-section">
				<CollateralInfo/>
			</div>
		</div>
	</div>

	<MainInfo/>
</section>

