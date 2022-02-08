<script lang="ts">
import { ethers } from 'ethers';
import { WETHToXOC, userHealthRatio, userMaxDebtUtilization, userMaxDebt,  userWETHLiquidationPrice, collateralFactor } from '../store/contractData';
/* import HealthCircle from './HealthCircle.svelte'; */
import ProgressBar from '@okrad/svelte-progressbar';

$: progress = $userMaxDebtUtilization ? Math.round($userMaxDebtUtilization*100) : 0;
</script>

<style>
    section {
        margin: auto;
        border-left: 1px solid white;
        width: 100%;
    }

    h1 {
        margin: 0 0 0 2rem;
        font-weight: 700;
        font-size: 2rem;
        text-align: center;
    }


    .content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
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
        <ProgressBar 
            width={180} 
            style="radial" 
                series={progress} 
                labelColor="white" 
                thresholds={[
                      {
                        till: 50, 
                        color: '#9BB03A' /* verde-rama */
                      },
                      {
                        till: 80,
                        color: '#F86F00' /* naranja */
                      },
                      {
                        till: 100,
                        color: '#FF0000' /* rojo */
                      }
                    ]}
                />
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
