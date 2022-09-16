<script lang="ts">
import { _ } from 'svelte-i18n';
import { selectedPage } from '../store/store';
import Icon from './Icon.svelte';

export let urls: URLS;

type URLS = {
	twitter: string;
	docs: string;
	github: string;
	discord: string;
}
</script>

<style>
:global(main) > footer {
  position: sticky;
  top: 100vh;
}

footer {
	margin-top: 1rem;
	height: 5.5rem;
  width:100%;
	border-top: 1px solid grey;
	text-align: right;
	color: grey;
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

.linkish {
	color: var(--main-color);
	cursor: pointer;
	text-decoration: underline;
}

</style>
<footer class="container">
	<div class="left">
		<span on:click={()=>window.open(urls.twitter, '_blank')}>
			<Icon name="twitter" width="1.2rem" height="1.2rem"/>
		</span>

		<span on:click={()=>window.open(urls.docs, '_blank')}>
			<Icon name="docs" width="1.2rem" height="1.2rem"/>
		</span>

		<span on:click={()=>window.open(urls.github, '_blank')}>
			<Icon name="github" width="1.2rem" height="1.2rem "/>
		</span>

		<span on:click={()=>window.open(urls.discord, '_blank')}>
			<Icon name="discord" width="1.2rem" height="1.2rem"/>
		</span>
	</div>
	<div class="right">
		<p>{$_('footer.project')} <a href="https://pipiladao.org" target="_blank">PipilaDAO</a></p>
		<p class="linkish" on:click={()=>{$selectedPage='liquidations';}}>{$_('footer.liquidations')}</p>
	</div>
</footer>
