<script lang="ts">
  import { toShortAddress } from "../utils";
  import { get } from "svelte/store";
  import { pendingTxs, blockExplorerURL } from "../store/account";
  import { _ } from "svelte-i18n";

  function handleClose(txHash: string) {
    pendingTxs.closeModal(txHash);
  }
</script>

<div class="overlay-wrapper">
  {#each $pendingTxs as tx}
    <div class="overlay-box">
      <div class="heading">
        {#if tx.status === "pending"}
          <div class="loader"></div>
          <h2>{$_("txMonitor.pending.status")}</h2>
        {:else if tx.status === "completed"}
          <div class="status-icon">✓</div>
          <h2>{$_("txMonitor.completed.status")}</h2>
        {:else if tx.status === "failed"}
          <div class="status-icon">⨯</div>
          <h2>{$_("txMonitor.failed.status")}</h2>
        {/if}
      </div>

      {#if tx.status === "pending"}
        <p>{$_("txMonitor.pending.message")}</p>
      {:else if tx.status === "completed"}
        <p>
          {$_("txMonitor.completed.message")}
        </p>
      {:else if tx.status === "failed"}
        <p>
          {$_("txMonitor.failed.message")}
        </p>
      {/if}

      <a
        class="hash"
        href={get(blockExplorerURL) + "tx/" + tx.hash}
        target="_blank"
        rel="noopener noreferrer">{toShortAddress(tx.hash)}</a
      >

      {#if tx.status === "pending"}
        <img src="/static/waiting.svg" alt="text waiting" />
      {:else if tx.status === "completed"}
        <img src="/static/success.svg" alt="text waiting" />
      {:else if tx.status === "failed"}
        <img src="/static/failure.svg" alt="text waiting" />
      {/if}
      <div class="button-line">
        <a
          href={get(blockExplorerURL) + "tx/" + tx.hash}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="button">{$_("txMonitor.view")}</div>
        </a>
        <div class="button" on:click={() => handleClose(tx.hash)}>
          {$_("txMonitor.close")}
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .overlay-wrapper {
    z-index: 100;
    position: absolute;
    top: 12vh;
    right: 4vh;
  }

  .overlay-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1rem auto auto auto;
    width: 24rem;
    height: 26rem;
    border: 2px solid black;
    border-radius: 5px;
    background-color: var(--light-color);
    opacity: 0.9;
    padding: 1rem;
  }

  .loader {
    margin: 0 0.5rem 0 0.7rem;
    position: relative;
    border: 0.2rem solid #f3f3f3; /* Light grey */
    border-top: 0.2rem solid var(--main-color); /* Blue */
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    animation: spin 2s linear infinite;
  }

  .status-icon {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1.5rem;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .heading {
    display: flex;
  }

  h2 {
    font-family: Quicksand, sans-serif;
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
  }

  .hash {
    color: #0057ff;
    font-family: Quicksand, sans-serif;
    font-weight: 900;
  }

  .button-line {
    display: flex;
  }

  .button {
    cursor: pointer;
    color: #371903;
    border: 0.1rem solid black; /* Light grey */
    text-align: center;
    padding: 0.5rem;
    margin: auto;
    border-radius: 5px;
    width: 10rem;
  }

  img {
    height: 14rem;
    margin-bottom: 1rem;
  }
</style>
