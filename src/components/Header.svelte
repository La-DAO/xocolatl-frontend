<script lang="ts">
  import {
    signerAddress,
    chainId,
    connected,
    provider,
  } from "svelte-ethers-store";

  import { _, locale, locales } from "svelte-i18n";
  import { toShortAddress, changeNetwork } from "../utils";

  import {
    isRighNetwork,
    accountModalHidden,
    selectedPage,
  } from "../store/account";
  import { chains } from "../chains";

  import Select from "./Shared/Select.svelte";

  const chainOptions = {
    "0x89": "Polygon",
    "0x5": "Goerli",
    "0x38": "BSC",
  };

  // locale array as select options object
  $: localeOptions = $locales.reduce((a, v) => ({ ...a, [v]: v }), {});
  // removes - from locale for select
  $: trimmedLocale = $locale!.replace(/-.*/, "");

  // locale array as select options object
  /* const localeOptions = $locales.map(locale=>{return {value: locale, label: locale}}) */

  $: shortSignerAddress = toShortAddress($signerAddress);

  $: currentChainHex = chains[$chainId]
    ? chains[$chainId].chainHex
    : "Select Chain";

  function addXOCToMetamask() {
    // @ts-ignore:next-line
    $provider.provider.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: chains[$chainId].XOCAddress, // The address that the token is at.
          symbol: "XOC", // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18, // The number of decimals in the token
          /* image: '', // TODO: A string url of the token logo */
        },
      },
    });
  }
</script>

<header class="header">
  <div class="container">
    <h2
      on:click={() => {
        $selectedPage = "home";
      }}
    >
      <img id="logo_img" src="/static/la-dao-logo.svg" alt="logo" />
      {"Xocolatl-V2"}
    </h2>
    <div class="right-content">
      {#if $signerAddress}
        <button
          type="button"
          class="add-token-button"
          on:click={addXOCToMetamask}
          ><img
            class="small-icon"
            src="/static/tokens/XOC.svg"
            alt="Add XOC to metamask button"
          />{$_("actions.add-to-wallet")}</button
        >
        {#if $isRighNetwork && currentChainHex}
          <Select
            width="6rem"
            options={chainOptions}
            defaultValue={currentChainHex}
            handleClickFunc={changeNetwork}
          />
        {:else}
          Unsupported network!
          <Select
            width="6rem"
            options={chainOptions}
            defaultValue={currentChainHex}
            handleClickFunc={changeNetwork}
          />
        {/if}
        <Select
          width="3rem"
          options={localeOptions}
          defaultValue={trimmedLocale}
          handleClickFunc={locale.set}
        />
      {:else}
        <Select
          width="3rem"
          options={localeOptions}
          defaultValue={trimmedLocale}
          handleClickFunc={locale.set}
        />
      {/if}
      <button type="button" on:click={() => ($accountModalHidden = false)}
        >{$connected ? shortSignerAddress : $_("actions.connect")}</button
      >
    </div>
  </div>
</header>

<style>
  header {
    margin: 0;
    width: 100%;
    background-color: var(--main-color);
    color: var(--light-color);
    cursor: pointer;
  }

  h2 {
    font-family: "HWTAetna-ExtraCondensed", sans-serif;
    font-size: 2rem;
    color: #f8f8f8;
    align-items: flex-start;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
  }

  .container {
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    margin: auto;
  }

  .right-content {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }

  .add-token-button {
    /* width: 45px; */
    cursor: pointer;
    display: flex;
    column-gap: 0.5rem;
    align-items: center;
  }

  .small-icon {
    width: 1rem;
    align-self: center;
  }

  #logo_img {
    width: 3rem;
  }

  button {
    padding: 0.5rem;
    background-color: #f25b3d;
    color: var(--light-color);
    border-radius: var(--box-radius);
    border: 2px solid #f25b3d;
    text-decoration: none;
    cursor: pointer;
    min-width: 8rem;
    font-family: "Quicksand", sans-serif;
    font-weight: 700;
  }
</style>
