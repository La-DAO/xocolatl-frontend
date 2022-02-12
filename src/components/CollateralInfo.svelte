<script lang="ts">
import { ethers } from 'ethers';
import { WETHToXOC, userHealthRatio, userMaxDebtUtilization, userMaxDebt,  userWETHLiquidationPrice, collateralFactor, userWETHCollateralMXNPrice, healthRatioAsPercentage } from '../store/contractData';
/* import HealthCircle from './HealthCircle.svelte'; */
import ProgressBar from '@okrad/svelte-progressbar';
import Icon from '../components/Icon.svelte';

const healthIndexTooltip = 'Porcentaje del poder de prestamo utilizado';

const maxDebtTooltip = 'Deuda maxima posible acorde al valor actual de tu colateral';

const LTVTooltip = 'Porcentaje de deuda maxima permitida';

const healthRatioTooltip = 'La seguridad de tu deuda, derivada de la proporcion de tu colateral contra tu cantidad prestada. Mantenlo arriba de 1 para no ser liquidado.';

const ethPriceTooltip = 'El precio actual de ETH segun el oraculo de redstone';

const ethLiquidationPriceTooltip = 'El precio de ETH en el que tu deuda seria liquidada';

const commify = ethers.utils.commify;
</script>

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


<section>
    <h1>Indice de salud</h1>
    <div class="content">
        <div data-tooltip={healthRatioTooltip}>
            <ProgressBar 
                width={180} 
                style="radial" 
                    series={$healthRatioAsPercentage} 
                    labelColor="white" 
                    valueLabel={$userHealthRatio ? ethers.utils.formatEther($userHealthRatio.sub($userHealthRatio.mod(1e15))) : '-'}
                    thresholds={[
                          {
                            till: 50, 
                            color: '#FF0000' /* rojo */
                          },
                          {
                            till: 80,
                            color: '#F86F00' /* naranja */
                          },
                          {
                            till: 100,
                            color: '#9BB03A' /* verde-rama */

                          }
                        ]}
                    />
        </div>
        <div class="info">
            <div class="text-row">
                <div class="text-and-tooltip">
                    <p>Limite de prestamo utilizado</p>
                    <div class='info-icon' data-tooltip={healthIndexTooltip}><Icon name="info" width="100%" height="100%" focusable={true}/></div>
                </div>
                <p>{$userMaxDebtUtilization ? Math.ceil($userMaxDebtUtilization*10000) / 100 : '-'} %</p>
            </div>

            <div class="text-row">
                <div class="text-and-tooltip">
                    <p>Umbral de liquidacion del RPV</p>
                    <div class='info-icon' data-tooltip={LTVTooltip}><Icon name="info" width="100%" height="100%" focusable={true}/></div>
                </div>
                <p>{$collateralFactor ? ($collateralFactor*100).toFixed(2) : '-'} %</p>
            </div>

            <div class="text-row">
                <div class="text-and-tooltip">
                    <p>Precio actual de ETH </p>
                    <div class='info-icon' data-tooltip={ethPriceTooltip}><Icon name="info" width="100%" height="100%" focusable={true}/></div>
                </div>
                <p>${$WETHToXOC ?  commify(ethers.utils.formatUnits($WETHToXOC.sub($WETHToXOC.mod(1e4)), 8)) : '-'} (MXN)</p>
            </div>

            <div class="text-row">
                <div class="text-and-tooltip">
                    <p>Precio de liquidacion de ETH</p>
                    <div class='info-icon' data-tooltip={ethLiquidationPriceTooltip}><Icon name="info" width="100%" height="100%" focusable={true}/></div>
                </div>
                <p>${$userWETHLiquidationPrice ? commify($userWETHLiquidationPrice.toFixed(4)) : '-'} (MXN)</p>
            </div>


            <div class="text-row">
                <div class="text-and-tooltip">
                    <p>Valor del colateral depositado </p>
                    <div class='info-icon' data-tooltip={maxDebtTooltip}><Icon name="info" width="100%" height="100%" focusable={true}/></div>
                </div>
                <p>${$userWETHCollateralMXNPrice ? commify(ethers.utils.formatEther($userWETHCollateralMXNPrice.sub($userWETHCollateralMXNPrice.mod(1e14)))) : '-'} (MXN)</p>
            </div>


            <div class="text-row">
                <div class="text-and-tooltip">
                    <p>Deuda maxima </p>
                    <div class='info-icon' data-tooltip={maxDebtTooltip}><Icon name="info" width="100%" height="100%" focusable={true}/></div>
                </div>
                <p>${$userMaxDebt ? commify(ethers.utils.formatEther($userMaxDebt.sub($userMaxDebt.mod(1e14)))) : '-'} (MXN)</p>
            </div>

        </div>
    </div>
</section>
