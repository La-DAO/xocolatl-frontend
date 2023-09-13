<script lang="ts">
  import Icon from "src/components/Shared/Icon.svelte";

  export let label: string;
  export let tooltip: string;
  export let value: string;
</script>

<div class="text-row">
  <div class="text-and-tooltip">
    <p>{label}</p>
    <div class="info-icon" data-tooltip={tooltip}>
      <Icon name="info" width="100%" height="100%" focusable={true} />
    </div>
  </div>
  <p>
    {value}
  </p>
</div>

<style>
  p {
    margin: 0.5rem;
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

  .info-icon {
    display: inline;
    cursor: pointer;
    width: 1.2rem;
    height: 1.2rem;
  }
</style>
