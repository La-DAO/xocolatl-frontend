<script lang="ts">
import { _ } from 'svelte-i18n';
</script>
<style>
:global(main) > footer {
  position: sticky;
  top: 100vh;
}
footer {
	margin-top: 1rem;
	height: 3.5rem;
  width:100%;
	border-top: 1px solid grey;
	text-align: right;
	color: grey;
}

p {
	margin-right: 2rem;
}

a {
	color: var(--main-color);
}

</style>
<footer>
	<p>{$_('footer')} <a href="https://pipiladao.org" target="_blank">PipilaDAO</a></p>
</footer>
