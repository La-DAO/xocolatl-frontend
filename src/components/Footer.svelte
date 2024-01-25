<script lang="ts">
  import { _ } from "svelte-i18n";
  import Icon from "./Shared/Icon.svelte";

  export let urls: URLS;

  type URLS = {
    twitter: string;
    docs: string;
    github: string;
    discord: string;
    dao: string;
  };
</script>

<footer class="container">
  <div class="left">
    <span on:click={() => window.open(urls.twitter, "_blank")}>
      <Icon name="twitter" width="1.2rem" height="1.2rem" />
    </span>

    <span on:click={() => window.open(urls.docs, "_blank")}>
      <Icon name="docs" width="1.2rem" height="1.2rem" />
    </span>

    <span on:click={() => window.open(urls.github, "_blank")}>
      <Icon name="github" width="1.2rem" height="1.2rem " />
    </span>

    <span on:click={() => window.open(urls.discord, "_blank")}>
      <Icon name="discord" width="1.2rem" height="1.2rem" />
    </span>

    <span on:click={() => window.open(urls.dao, "_blank")}>
      <img alt="dao icon" class="icon" src="/static/dao-icon.png" />
    </span>
  </div>
  <div>
    <p>
      <a class="linkish" href="mailto:contact@xocolatly.xyz" target="_blank"
        >contact@xocolatl.xyz</a
      >
    </p>
  </div>
  <div class="right">
    <p>
      {$_("footer.project")}
      <a class="linkish" href="https://ladao.club/" target="_blank">La DAO</a>
    </p>
  </div>
</footer>

<style>
  :global(main) > footer {
    position: sticky;
    top: 93vh;
  }

  footer {
    margin-top: 1rem;
    height: 4rem;
    width: 100%;
    border-top: 1px solid grey;
    text-align: right;
    color: grey;
    background-color: #2e2e2c;
  }

  .container {
    display: flex;
    justify-content: space-between;
    margin: auto;
    /* width:95%; */
  }

  .left {
    margin: 1rem 0 0 2rem;
  }

  .left > span {
    cursor: pointer;
    margin: 0.1rem;
  }

  .right > p {
    margin-right: 2rem;
  }

  a {
    color: var(--main-color);
  }

  .icon {
    width: 1.3rem;
    height: 1.3rem;
  }

  .linkish {
    color: gray;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
