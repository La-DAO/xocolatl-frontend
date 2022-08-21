<script lang="ts">
import { _ } from 'svelte-i18n';
import { clickOutside, changeNetwork } from '../utils';
export let hidden = true; 


function handleOutsideClick() {
	hidden = true;
}

</script>

<style>
.modal {
	position: fixed;
	z-index: 3;
	left: 0;
  top: 0;
	overflow: auto;
	width: 100%;
	height: 100%;
	background-color: #CE978680;
  padding-top: 50px;
}


.modal-content {
	z-index: 4;
	border: 2px solid var(--main-color);
	border-radius: 7px;
	width: 30rem;
	margin: auto;
	background-color: var(--light-color);
	opacity: 1;
	padding: 2rem;
	text-align: center;
}

.modal-body {
	margin-left: 2rem;
}

p {
	display: inline-block;
	margin: 0.5rem;
	cursor: pointer;
	color: #F86F00;
	text-decoration: underline;
}

button {
	background-color: #FDDFC3;
	border: 1px solid var(--main-color);
	cursor: pointer;
	height: 2rem;
	width: 10rem;
	margin: 1rem;
	font-weight: 700;
}

.hidden {
	display: none;
}
</style>

<section class:hidden class="modal">
	<div use:clickOutside={handleOutsideClick} class="modal-content">
		<h2 class="modal-header">{$_('modal.header')}</h2>
		<div class="modal-body">
			<h4>{$_('modal.body')}: </h4>
				<p on:click={()=>changeNetwork('0x89')}>Polygon</p><br>
				<p on:click={()=>changeNetwork('0x4')}>Rinkeby</p><br>
			<button on:click="{()=>hidden=true}">{$_('modal.close')}</button>
		</div>
	</div>
</section>
