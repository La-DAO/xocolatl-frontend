<script lang="ts">
import {WETHToXOC, userHealthRatio, userMaxDebtUtilization, userMaxDebt, liquidationThreshold, userWETHLiquidationPrice} from '../store/contractData';
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
            <p>Deuda maxima {$userMaxDebt}</p>
            <p>Limite de prestamo utilizado {$userMaxDebtUtilization} %</p>
            <p>Umbral de liquidacion del RPV {$liquidationThreshold} %</p>
            <p>Factor de salud {$userHealthRatio}</p>
            <p>Precio actual de ETH {$WETHToXOC}</p>
            <p>Precio de liquidacion de ETH {$userWETHLiquidationPrice}</p>
        </div>
    </div>
</section>
