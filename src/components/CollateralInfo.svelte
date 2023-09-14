<script lang="ts">
  import { ethers } from "ethers";
  import { _ } from "svelte-i18n";
  import {
    CollateralToXOC,
    userHealthRatio,
    userMaxDebtUtilization,
    userMaxDebt,
    userCollateralLiquidationPrice,
    maxLTVFactor,
    userCollateralMXNPrice,
    healthRatioAsPercentage,
  } from "../store/contractData";
  import InfoRow from "src/components/Shared/InfoRow.svelte";

  const commify = ethers.utils.commify;
</script>

<section>
  <div class="content">
    <div class="info">
      <InfoRow
        label={$_("healthIndex.healthIndex")}
        tooltip={$_("healthIndex.healthIndexTooltip")}
        value={`${$userHealthRatio ? $healthRatioAsPercentage : "-"} %`}
      />
      <InfoRow
        label={$_("healthIndex.usedBorrowingPower")}
        tooltip={$_("healthIndex.usedBorrowingPowerTooltip")}
        value={`${
          $userMaxDebtUtilization
            ? Math.ceil($userMaxDebtUtilization * 10000) / 100
            : "-"
        } %`}
      />

      <InfoRow
        label={$_("healthIndex.LTV")}
        tooltip={$_("healthIndex.LTVTooltip")}
        value={`${
          $maxLTVFactor
            ? (
                parseFloat(ethers.utils.formatEther($maxLTVFactor)) * 100
              ).toFixed(2)
            : "-"
        } %`}
      />

      <InfoRow
        label={$_("healthIndex.currentETHPrice")}
        tooltip={$_("healthIndex.currentETHPriceTooltip")}
        value={`${
          $CollateralToXOC
            ? commify(
                ethers.utils.formatUnits(
                  $CollateralToXOC.sub($CollateralToXOC.mod(1e7)),
                  8,
                ),
              )
            : "-"
        } (MXN)`}
      />

      <InfoRow
        label={$_("healthIndex.liquidationETHPrice")}
        tooltip={$_("healthIndex.liquidationETHPriceTooltip")}
        value={`${
          $userCollateralLiquidationPrice
            ? commify($userCollateralLiquidationPrice.toFixed(1))
            : "-"
        } (MXN)`}
      />

      <InfoRow
        label={$_("healthIndex.collateralValue")}
        tooltip={$_("healthIndex.collateralValueTooltip")}
        value={`${
          $userCollateralMXNPrice
            ? commify(
                parseFloat(
                  ethers.utils.formatUnits($userCollateralMXNPrice, 8),
                ).toFixed(1),
              )
            : "-"
        } (MXN)`}
      />

      <InfoRow
        label={$_("healthIndex.maxDebt")}
        tooltip={$_("healthIndex.maxDebtTooltip")}
        value={`${
          $userMaxDebt
            ? commify(
                ethers.utils.formatEther(
                  $userMaxDebt.sub($userMaxDebt.mod(1e14)),
                ),
              )
            : "-"
        } (MXN)`}
      />
    </div>
  </div>
</section>

<style lang="scss">
  section {
    border-left: 1px solid white;
    width: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 1rem;
    justify-content: flex-start;
    width: 60%;

    @media (max-width: 1200px) {
      width: 80%;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  @media (max-width: 842px) {
    section {
      width: 100%;
      margin: 0 0 1rem 0;
      border-left: none;
      border-bottom: 1px solid white;
      text-align: center;
    }

    .content {
      flex-direction: row;
      margin: 0 0 2rem 0;
      justify-content: center;
      width: 100%;
    }
  }
</style>
