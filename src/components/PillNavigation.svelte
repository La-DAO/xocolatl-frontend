<script lang="ts">
  import { _ } from "svelte-i18n";
  import { selectedTab } from "../store/account";

  export let swapURL: string;

  function handleSectionClick(selected: string) {
    selectedTab.set(selected);
  }

  let selectedTabValue: string;
  let innerWidth = window.innerWidth;

  selectedTab.subscribe((value) => {
    selectedTabValue = value;
  });
</script>

<svelte:window bind:innerWidth />
<nav>
  <div
    class="nav-button left-nav-button"
    class:selected={selectedTabValue === "deposit"}
    on:click={() => handleSectionClick("deposit")}
  >
    {$_("actions.deposit")}
  </div>
  <div
    class="nav-button"
    class:selected={selectedTabValue === "mint"}
    on:click={() => handleSectionClick("mint")}
  >
    {$_("actions.mint")}
  </div>
  <div
    class="nav-button"
    class:selected={selectedTabValue === "redeem"}
    on:click={() => handleSectionClick("redeem")}
  >
    {$_("actions.redeem")}
  </div>
  <div
    class="nav-button"
    class:selected={selectedTabValue === "withdraw"}
    on:click={() => handleSectionClick("withdraw")}
    class:right-nav-button={innerWidth < 570}
  >
    {$_("actions.withdraw")}
  </div>
  <div
    class="nav-button right-nav-button"
    hidden={innerWidth < 570}
    on:click={() => window.open(swapURL, "_blank")}
  >
    {$_("actions.exchange")}
  </div>
</nav>

<style>
  nav {
    display: flex;
    width: 30%;
    margin: 0 auto auto auto;
    justify-content: center;
    text-align: center;
  }

  .nav-button {
    width: 100%;
    height: 100%;
    color: black;
    background-color: var(--light-color);
    border-color: var(--light-color);
    margin: 0.5rem 0 0 0;
    padding: 0.8rem;
    border-style: solid;
    font-family: "Quicksand", sans-serif;
    font-weight: bold;
    cursor: pointer;
  }

  .left-nav-button {
    border-right: none;
    border-radius: var(--box-radius) 0 0 var(--box-radius);
  }

  .right-nav-button {
    border-left: none;
    border-radius: 0 var(--box-radius) var(--box-radius) 0;
  }

  .selected {
    background-color: var(--main-color);
    color: var(--light-color);
  }
</style>
