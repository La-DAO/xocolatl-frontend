<script lang="ts">
import { ethers } from 'ethers';
import { WETHToXOC, userHealthRatio, userMaxDebtUtilization, userMaxDebt,  userWETHLiquidationPrice, collateralFactor } from '../store/contractData';
</script>

<style>
section {
    margin: 0 2rem 0 0;
    flex-basis: 75%;
}

    h1 {
        margin: 0 0 0 2rem;
        text-align: left;

        font-weight: 700;
        font-size: 2rem;
    }

    .circle {
        background: lightgreen;
        
        border-radius: 50%;
        width: 12rem;
        height: 12rem;
        margin: 0 2rem 0 2rem;
        
    }

    .content {
        display: flex;
        flex-direction: row;
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    p {
        margin: 0.5rem;
    }
</style>

<section>

    <h1> Indice de salud </h1>
    <div class="content">
        <div class="circle"></div>
        <div class="info">
            <p>Deuda maxima {$userMaxDebt ? ethers.utils.formatEther($userMaxDebt) : '-'} XOC</p>

            <p>Limite de prestamo utilizado {$userMaxDebtUtilization ? $userMaxDebtUtilization*100 : '-'} %</p>
<!--
<p>Limite de prestamo utilizado {$userMaxDebtUtilization ? ethers.utils.formatEther($userMaxDebtUtilization) : '-'} %</p> -->
            <p>Umbral de liquidacion del RPV {$collateralFactor ? $collateralFactor*100 : '-'} %</p>
            <p>Factor de salud {$userHealthRatio ? ethers.utils.formatEther($userHealthRatio) : '-'}</p>
            <p>Precio actual de ETH ${$WETHToXOC ?  ethers.utils.formatUnits($WETHToXOC, 8) : '-'} MXN</p>
            <p>Precio de liquidacion de ETH ${$userWETHLiquidationPrice ? $userWETHLiquidationPrice : '-'} MXN</p>
        </div>
    </div>
</section>
