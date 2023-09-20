<script lang="ts">
  import {
    defaultEvmStores,
    connected,
    signerAddress,
    chainId,
  } from "svelte-ethers-store";
  import { onMount, onDestroy } from "svelte";
  import { _ } from "svelte-i18n";

  import {
    clickOutside,
    toShortAddress,
    handleWalletConnectProvider,
  } from "../utils";
  import { index } from "../chains";

  import { providerType } from "../store/account";
  import { resetAll } from "../store/contractData";

  import Icon from "./Shared/Icon.svelte";

  export let hidden = true;

  let delayPassed = false;
  let hideTimeOutId: number;

  let changing = false;
  let copying = false;

  async function handleCopy() {
    navigator.clipboard.writeText($signerAddress);
    copying = true;
    await new Promise((r) => setTimeout(r, 1000));
    copying = false;
  }

  function handleOutsideClick() {
    if (delayPassed) {
      changing = false;
      hidden = true;
    }
  }

  async function handleMetamaskConnect() {
    await defaultEvmStores.setProvider();
    changing = false;
  }

  async function handleDisconnect() {
    await defaultEvmStores.disconnect();
    resetAll();
    localStorage.removeItem("walletconnect");
    hidden = true;
  }

  onMount(async () => {
    if (!$connected) {
      if ($providerType === "metamask") {
        await handleMetamaskConnect();
      } else if ($providerType === "walletconnect") {
        await handleWalletConnectProvider();
      }
    }
    hideTimeOutId = await new Promise((r) => setTimeout(r, 1000));
    delayPassed = true;
  });

  onDestroy(() => {
    clearTimeout(hideTimeOutId);
  });
</script>

<section class:hidden class="modal">
  <div use:clickOutside={handleOutsideClick} class="modal-content">
    {#if $connected && !changing}
      <div class="modal-header">
        <b>{$_("modal.account")}</b>
        <div>
          <div on:click={() => (changing = true)} class="mini-pill-button">
            {$_("actions.change")}
          </div>
          <div on:click={handleDisconnect} class="mini-pill-button">
            {$_("actions.disconnect")}
          </div>
        </div>
      </div>
      <div class="round-border modal-body">
        <p>{toShortAddress($signerAddress)}</p>
        <br />
        <div class="mini-buttons">
          {#if !copying}
            <div on:click={handleCopy} class="mini-button">
              <Icon name="copy" width="0.8rem" height="0.8rem" />&nbsp;{$_(
                "modal.copyAddress",
              )}
            </div>
          {:else}
            <div on:click={handleCopy} class="mini-button">
              <Icon name="check" width="0.8rem" height="0.8rem" />&nbsp;{$_(
                "modal.copiedAddress",
              )}
            </div>
          {/if}
          <div
            on:click={() =>
              window.open(
                index[$chainId].blockExplorerURL + "/address/" + $signerAddress,
                "_blank",
              )}
            class="mini-button"
          >
            <Icon name="link" width="0.8rem" height="0.8rem" />&nbsp;{$_(
              "modal.viewOnExplorer",
            )}
          </div>
        </div>
      </div>
    {:else}
      <div class="modal-header">
        <b>{$_("actions.connect")}</b>
      </div>
      <div class="modal-body">
        <div
          on:click={handleMetamaskConnect}
          class="round-border provider-option"
        >
          <div>
            <span class:hidden={$providerType !== "metamask"} class="green"
              >&#8226;</span
            >
            Metamask
          </div>
          <img
            class="wallet-logo"
            alt="Metamask logo"
            src="/static/wallets/metamask.png"
          />
        </div>
        <div
          on:click={handleWalletConnectProvider}
          class="round-border provider-option"
        >
          <div>
            <span class:hidden={$providerType !== "walletconnect"} class="green"
              >&#8226;</span
            >
            WalletConnect
          </div>
          <img
            class="wallet-logo"
            alt="WalletConnect logo"
            src="/static/wallets/walletconnect.svg"
          />
        </div>

        <!-- <div class="round-border provider-option">
					Coinbase
					<img class="wallet-logo" alt="Coinbase logo" src="/static/wallets/coinbase.svg"/>
				</div>
				-->
      </div>
    {/if}
    <button class="mini-pill-button" on:click={() => (hidden = true)}
      >{$_("modal.close")}</button
    >
  </div>
</section>

<style lang="scss">
  .modal {
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    overflow: auto;
    width: 100%;
    height: 100%;
    background-color: #ce978680;
    padding-top: 50px;
  }

  .modal-content {
    z-index: 4;
    border: 2px solid var(--main-color);
    border-radius: 7px;
    max-width: 22rem;
    margin: auto;
    background-color: white;
    opacity: 1;
    padding: 2rem;
    text-align: center;
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 1rem;
    color: black;
  }

  p {
    display: inline-block;
    margin: 0.5rem 0 0.5rem 0;
    cursor: pointer;
    color: black;
  }

  button {
    background-color: #fddfc3;
    border: 1px solid var(--main-color);
    cursor: pointer;
    height: 2rem;
    width: 10rem;
    font-weight: 700;
    margin: 1rem auto auto auto !important;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    color: black;
    text-align: left;
    margin: 0.5rem 0 1rem 0;
  }

  .mini-buttons {
    display: flex;
    column-gap: 0.7rem;
  }

  .mini-button {
    font-size: 0.7rem;
    cursor: pointer;
    color: var(--light-main-color);
  }

  .mini-button:hover {
    font-size: 0.7rem;
    cursor: pointer;
    color: var(--main-color);
  }

  .mini-pill-button {
    border: 1px solid var(--light-main-color);
    border-radius: 10px;
    cursor: pointer;
    padding: 0.2rem;
    font-size: 0.8rem;
    display: inline;
    margin: 0.2rem;
  }

  .mini-pill-button:hover {
    border-color: var(--main-color);
    color: var(--main-color);
  }

  .hidden {
    display: none;
  }

  .round-border {
    border: 1px solid grey;
    border-radius: 7px;
  }

  .provider-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;

    margin: 0.2rem;
  }

  .provider-option:hover {
    border: 1px solid var(--main-color);
    font-weight: 600;
  }

  .provider-option > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .wallet-logo {
    width: 1.5rem;
    height: 1.5rem;
  }

  .green {
    color: green;
  }
</style>
