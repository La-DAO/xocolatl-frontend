<script lang="ts">
import { _ } from 'svelte-i18n';
import { selectedPage } from '../store/store';
import Icon from './Icon.svelte';

const githubURL = "https://github.com/PipilaDAO";
const docsURL = "https://iafhurtado.gitbook.io/xocolatl-documentacion-tecnica/";
const discordURL = "https://discord.gg/GguRwtZj4x";
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
		<span on:click={()=>window.open(githubURL, '_blank')}>
			<Icon name="github" width="1.5rem" height="1.5rem "/>
		</span>
		<span on:click={()=>window.open(docsURL, '_blank')}>
			<Icon name="docs" width="1.5rem" height="1.5rem"/>
		</span>
		<span on:click={()=>window.open(discordURL, '_blank')}>
			<Icon name="discord" width="1.5rem" height="1.5rem"/>
		</span>
	</div>
	<div class="right">
		<p>{$_('footer.project')} <a href="https://pipiladao.org" target="_blank">PipilaDAO</a></p>
		<p class="linkish" on:click={()=>{$selectedPage='liquidations';}}>{$_('footer.liquidations')}</p>
	</div>
</footer>
