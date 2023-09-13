<script>
  import Icon from "./Icon.svelte";
  export let options;
  export let defaultValue;
  export let handleClickFunc;
  export let width;

  let isClickExpanded = false;
</script>

<ul>
  <li {width} class="box">
    <div class="title">{options[defaultValue]} <Icon name="chevron" /></div>
    <ul class:visible={isClickExpanded}>
      {#each Object.entries(options) as [key, value]}
        <li class="option" on:click={() => handleClickFunc(key)}>{value}</li>
      {/each}
    </ul>
  </li>
</ul>

<style lang="scss">
  /* resets */
  ul {
    list-style: none;
    padding: 0;
  }
  ul li {
    display: inline-block;
    position: relative;
  }

  /* minimal dropdown CSS */
  li > ul {
    left: -9999px;
    position: absolute;
    visibility: hidden;
  }

  li:hover > ul,
  li:focus-within > ul {
    left: 0;
    visibility: visible;
  }

  .visible {
    left: 0;
    visibility: visible;
  }

  .box {
    border: 1px solid #f25b3d;
    border-radius: var(--box-radius);
    margin: auto;
    background-color: #f25b3d;
    cursor: pointer;
  }

  .title {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0.5rem;
  }

  .option {
    box-sizing: border-box;
    background-color: #f25b3d;
    width: 100%;
    border: 1px solid black;
    border-radius: var(--box-radius);
    padding: 0.5rem 1rem;
    text-align: center;

    &:first-of-type {
      margin-top: 1px;
    }
  }
</style>
