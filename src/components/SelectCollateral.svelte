<script>
  import { listOfCollaterals, selectedCollateral } from "src/store/userInput";
</script>

<select class="box" bind:value={$selectedCollateral}>
  {#each $listOfCollaterals as option}
    <option class="options" value={option}>{option}</option>
  {/each}
</select>

<style>
  .box {
    background-color: var(--main-color);
    color: grey;
    font-size: 1.2rem;
    text-align: center;
    margin-left: 0.5rem;
    cursor: pointer;
    width: 7rem;
    border-radius: 1rem;
    margin-bottom: 0rem;
  }

  .options {
    color: grey;
  }
</style>
