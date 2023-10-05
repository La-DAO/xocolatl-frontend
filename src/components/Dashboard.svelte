<script lang="ts">
  import { _ } from "svelte-i18n";
  import { get } from "svelte/store";
  import { chainId } from "svelte-ethers-store";
  import { BigNumber } from "ethers";

  import { selectedTab } from "../store/account";
  import { chains } from "../chains";

  import {
    CollateralDepositInputAmount,
    CollateralDepositInputAmountBigNum,
    CollateralDepositInputError,
    XOCMintInputAmount,
    XOCMintInputAmountBigNum,
    XOCMintInputError,
    XOCRedeemInputAmount,
    XOCRedeemInputAmountBigNum,
    XOCRedeemInputError,
    WETHWithdrawInputAmount,
    WETHWithdrawInputAmountBigNum,
    WETHWithdrawInputError,
  } from "../store/userInput";

  import {
    userCollateralBalance,
    userXOCMintingPower,
    userXOCBalance,
    userXOCDebt,
    userCollateralAllowance,
    userCollateralMaxWithdrawal,
    userNativeTokenBalance,
  } from "../store/contractData";

  import {
    approveERC20,
    depositERC20,
    mintXOC,
    redeemXOC,
    withdrawWETH,
    depositNativeToken,
  } from "../store/contract/writes";

  import PillNavigation from "./PillNavigation.svelte";
  import CollateralInfo from "./CollateralInfo.svelte";
  import MainInfo from "./MainInfo.svelte";
  import AmountInput from "./AmountInput.svelte";

  const checkNeedsAllowance = function (
    inputAmount: BigNumber | undefined,
    currentAllowance: BigNumber | null,
  ): boolean {
    let need = false;
    if (inputAmount && currentAllowance) {
      if (inputAmount.gt("0") && inputAmount.gt(currentAllowance)) {
        need = true;
      }
    }
    return need;
  };

  $: isNative =
    $chainId && $chainId in chains ? chains[$chainId].supportsNative : false;

  $: swapURL = $chainId && $chainId in chains ? chains[$chainId].swapURL : "";
</script>

<section>
  <div class="wrapper">
    <PillNavigation {swapURL} />
    <div class="main-section">
      <div class="input-section">
        <div class="input-section__container">
          {#if $selectedTab === "deposit"}
            {#if isNative}
              <AmountInput
                headerText={$_("input.deposit")}
                bind:inputAmount={$CollateralDepositInputAmount}
                bind:inputError={$CollateralDepositInputError}
                inputAmountBigNum={$CollateralDepositInputAmountBigNum}
                inputLimit={$userNativeTokenBalance}
                inputTypeText={$_("input.collateral")}
                actionText={$_("actions.deposit")}
                actionHandler={depositNativeToken}
              />
            {:else if checkNeedsAllowance($CollateralDepositInputAmountBigNum, get(userCollateralAllowance))}
              <AmountInput
                headerText={$_("input.deposit")}
                bind:inputAmount={$CollateralDepositInputAmount}
                bind:inputError={$CollateralDepositInputError}
                inputAmountBigNum={$CollateralDepositInputAmountBigNum}
                inputLimit={$userCollateralBalance}
                inputTypeText={$_("input.collateral")}
                actionText={$_("actions.approve")}
                actionHandler={approveERC20}
              />
            {:else}
              <AmountInput
                headerText={$_("input.deposit")}
                bind:inputAmount={$CollateralDepositInputAmount}
                bind:inputError={$CollateralDepositInputError}
                inputAmountBigNum={$CollateralDepositInputAmountBigNum}
                inputLimit={$userCollateralBalance}
                inputTypeText={$_("input.collateral")}
                actionText={$_("actions.deposit")}
                actionHandler={depositERC20}
              />
            {/if}
          {:else if $selectedTab === "mint"}
            <AmountInput
              headerText={$_("input.mint")}
              bind:inputAmount={$XOCMintInputAmount}
              bind:inputError={$XOCMintInputError}
              inputAmountBigNum={$XOCMintInputAmountBigNum}
              inputLimit={$userXOCMintingPower}
              inputTypeText={$_("input.token-mint")}
              actionHandler={mintXOC}
              actionText={$_("actions.mint")}
            />
          {:else if $selectedTab === "redeem"}
            <AmountInput
              headerText={$_("input.redeem")}
              bind:inputAmount={$XOCRedeemInputAmount}
              bind:inputError={$XOCRedeemInputError}
              inputAmountBigNum={$XOCRedeemInputAmountBigNum}
              inputLimit={$userXOCBalance?.gt($userXOCDebt ? $userXOCDebt : 0)
                ? $userXOCDebt
                : $userXOCBalance}
              inputTypeText={$_("input.token-redeem")}
              actionHandler={redeemXOC}
              actionText={$_("actions.redeem")}
            />
          {:else if $selectedTab === "withdraw"}
            <AmountInput
              headerText={$_("input.withdraw")}
              bind:inputAmount={$WETHWithdrawInputAmount}
              bind:inputError={$WETHWithdrawInputError}
              inputAmountBigNum={$WETHWithdrawInputAmountBigNum}
              inputLimit={$userCollateralMaxWithdrawal}
              inputTypeText={$_("input.collateral")}
              actionHandler={withdrawWETH}
              actionText={$_("actions.withdraw")}
            />
          {/if}
        </div>
      </div>
      <div class="info-section">
        <CollateralInfo />
      </div>
    </div>
  </div>

  <MainInfo />
</section>

<style lang="scss">
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
    align-items: center;
    flex-wrap: wrap-reverse;
    margin-bottom: 2rem;

    @media (max-width: 1200px) {
      flex-direction: column-reverse;
      padding: 0 1rem;
    }
  }

  .input-section {
    display: flex;
    justify-content: flex-end;
    flex-basis: 50%;
    flex-grow: 1;

    @media (max-width: 1200px) {
      justify-content: center;
    }

    &__container {
      width: 70%;
      margin-right: 2rem;

      @media (max-width: 1200px) {
        width: 90%;
        margin-right: 0;
      }

      @media (max-width: 842px) {
        width: 100%;
        justify-content: center;
      }
    }
  }

  .info-section {
    flex-basis: 50%;
    flex-grow: 1;

    @media (max-width: 1200px) {
      width: 100%;
    }
  }
</style>
