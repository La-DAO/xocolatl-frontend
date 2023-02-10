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
  /* import HealthCircle from './HealthCircle.svelte'; */
  import ProgressBar from "@okrad/svelte-progressbar";
  import Icon from "../components/Icon.svelte";
  import { formatUnits } from "ethers/lib/utils";

  const commify = ethers.utils.commify;
</script>

<section>
  <h1>{$_("healthIndex.healthIndex")}</h1>
  <div class="content">
    <div data-tooltip={$_("healthIndex.healthIndexTooltip")}>
      <ProgressBar
        width={180}
        style="radial"
        series={$healthRatioAsPercentage}
        labelColor="white"
        valueLabel={$userHealthRatio
          ? ethers.utils.formatEther(
              $userHealthRatio.sub($userHealthRatio.mod(1e15))
            )
          : "-"}
        thresholds={[
          {
            till: 50,
            color: "#FF0000" /* rojo */,
          },
          {
            till: 80,
            color: "#F86F00" /* naranja */,
          },
          {
            till: 100,
            color: "#9BB03A" /* verde-rama */,
          },
        ]}
      />
    </div>
    <div class="info">
      <div class="text-row">
        <div class="text-and-tooltip">
          <p>{$_("healthIndex.usedBorrowingPower")}</p>
          <div
            class="info-icon"
            data-tooltip={$_("healthIndex.usedBorrowingPowerTooltip")}
          >
            <Icon name="info" width="100%" height="100%" focusable={true} />
          </div>
        </div>
        <p>
          {$userMaxDebtUtilization
            ? Math.ceil($userMaxDebtUtilization * 10000) / 100
            : "-"} %
        </p>
      </div>

      <div class="text-row">
        <div class="text-and-tooltip">
          <p>{$_("healthIndex.LTV")}</p>
          <div class="info-icon" data-tooltip={$_("healthIndex.LTVTooltip")}>
            <Icon name="info" width="100%" height="100%" focusable={true} />
          </div>
        </div>
        <p>
          {$maxLTVFactor
            ? (
                parseFloat(ethers.utils.formatEther($maxLTVFactor)) * 100
              ).toFixed(2)
            : "-"} %
        </p>
      </div>

      <div class="text-row">
        <div class="text-and-tooltip">
          <p>{$_("healthIndex.currentETHPrice")}</p>
          <div
            class="info-icon"
            data-tooltip={$_("healthIndex.currentETHPriceTooltip")}
          >
            <Icon name="info" width="100%" height="100%" focusable={true} />
          </div>
        </div>
        <p>
          ${$CollateralToXOC
            ? commify(
                ethers.utils.formatUnits(
                  $CollateralToXOC.sub($CollateralToXOC.mod(1e4)),
                  8
                )
              )
            : "-"} (MXN)
        </p>
      </div>

      <div class="text-row">
        <div class="text-and-tooltip">
          <p>{$_("healthIndex.liquidationETHPrice")}</p>
          <div
            class="info-icon"
            data-tooltip={$_("healthIndex.liquidationETHPriceTooltip")}
          >
            <Icon name="info" width="100%" height="100%" focusable={true} />
          </div>
        </div>
        <p>
          ${$userCollateralLiquidationPrice
            ? commify($userCollateralLiquidationPrice.toFixed(4))
            : "-"} (MXN)
        </p>
      </div>

      <div class="text-row">
        <div class="text-and-tooltip">
          <p>{$_("healthIndex.collateralValue")}</p>
          <div
            class="info-icon"
            data-tooltip={$_("healthIndex.collateralValueTooltip")}
          >
            <Icon name="info" width="100%" height="100%" focusable={true} />
          </div>
        </div>
        <p>
          ${$userCollateralMXNPrice
            ? commify(
                ethers.utils.formatEther(
                  $userCollateralMXNPrice.sub($userCollateralMXNPrice.mod(1e14))
                )
              )
            : "-"} (MXN)
        </p>
      </div>

      <div class="text-row">
        <div class="text-and-tooltip">
          <p>{$_("healthIndex.maxDebt")}</p>
          <div
            class="info-icon"
            data-tooltip={$_("healthIndex.maxDebtTooltip")}
          >
            <Icon name="info" width="100%" height="100%" focusable={true} />
          </div>
        </div>
        <p>
          ${$userMaxDebt
            ? commify(
                ethers.utils.formatEther(
                  $userMaxDebt.sub($userMaxDebt.mod(1e14))
                )
              )
            : "-"} (MXN)
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    border-left: 1px solid white;
    width: 100%;
  }

  h1 {
    display: inline-block;
    margin: 0 1rem 0 1rem;
    font-weight: 700;
    font-size: 2rem;
  }

  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 1rem;
    justify-content: flex-start;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  p {
    margin: 0.5rem;
  }

  .info-icon {
    display: inline;
    cursor: pointer;
    width: 1.2rem;
    height: 1.2rem;
  }

  .text-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .text-and-tooltip {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 995px) {
    section {
      margin: 0 0 1rem 0;
      border-left: none;
      border-bottom: 1px solid white;
      text-align: center;
    }

    h1 {
      margin: 0;
    }

    .content {
      flex-direction: row;
      margin: 0 0 2rem 0;
      justify-content: center;
    }
  }
</style>
