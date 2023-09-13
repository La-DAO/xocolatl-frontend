<script lang="ts">
  import { provider, chainId, connected } from "svelte-ethers-store";
  import "@fontsource/quicksand";
  import "@fontsource/quicksand/700.css";
  import "@fontsource/roboto";

  import "../i18n"; // locales
  import { isLoading } from "svelte-i18n";

  import { isRighNetwork, accountModalHidden } from "../store/store";
  import { handleProviderChange, checkIfAlreadyConnected } from "../utils";
  import { orgURLs } from "../constants";

  import Header from "./Header.svelte";
  import AccountModal from "./AccountModal.svelte";
  import Dashboard from "./Dashboard.svelte";
  import TxMonitor from "./TxMonitor.svelte";
  import Polling from "./Polling.svelte";
  import ChainModal from "./ChainModal.svelte";
  import Footer from "./Footer.svelte";

  $: $provider && handleProviderChange();

  function handleNetworkChange(
    oldChain: number | string,
    newChain: number | string,
  ): number | string {
    if (oldChain && newChain) {
      window.location.reload();
    }
    return newChain;
  }

  checkIfAlreadyConnected();

  let oldChain: number | string;
  $: oldChain = handleNetworkChange(oldChain, $chainId);
</script>

{#if $isLoading}
  Por favor espere...
{:else}
  <main>
    <ChainModal hidden={$connected && $isRighNetwork} />
    <Header />
    {#key !$accountModalHidden}
      <AccountModal bind:hidden={$accountModalHidden} />
    {/key}
    <Dashboard />
    <TxMonitor />
    <Polling />
    <Footer urls={orgURLs} />
  </main>
{/if}

<style>
  /* global colors */
  :global(:root) {
    --main-color: #2e2e2c; /* chocolate */
    --light-color: #f8f8f8;
    --box-radius: 8px; /* border radius of all boxes for consitent design */
    --app-background-color: #e0ddd7;
  }

  :global(html, body) {
    background-color: var(--app-background-color);
  }

  main {
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: "Roboto", sans-serif;
    background-color: var(--app-background-color);
    min-height: 100vh;
    max-height: 100vh;
  }
</style>
