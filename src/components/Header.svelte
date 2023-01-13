<script lang="ts">
	import { signerAddress, chainId, connected, provider} from 'svelte-ethers-store';

	import { _, locale, locales } from 'svelte-i18n';
	import { toShortAddress, changeNetwork } from '../utils';

	import { isRighNetwork, accountModalHidden, selectedPage } from '../store/store';
	import { chains } from '../chains';

	import Select from './Select.svelte';

	const chainOptions = {
		'0x89': 'Polygon',
		'0x4': 'Rinkeby'
	};

	// locale array as select options object
	$: localeOptions = $locales.reduce((a, v) => ({ ...a, [v]: v}), {});
	// removes - from locale for select
	$: trimmedLocale = $locale!.replace(/-.*/,'');


	// locale array as select options object
	/* const localeOptions = $locales.map(locale=>{return {value: locale, label: locale}}) */

	$: shortSignerAddress = toShortAddress($signerAddress);

	$: currentChainHex = chains[$chainId] ? chains[$chainId].chainHex : null;

	function addXOCToMetamask() {
		// @ts-ignore:next-line
		$provider.provider.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20', // Initially only supports ERC20, but eventually more!
				options: {
					address: chains[$chainId].XOCAddress, // The address that the token is at.
					symbol: 'XOC', // A ticker symbol or shorthand, up to 5 chars.
					decimals: 18, // The number of decimals in the token
					/* image: '', // TODO: A string url of the token logo */
				},
			},
		});
	}
</script>

<style> 
	header {
		margin: 0;
		width: 100%;
		background-color: var(--main-color);
		color: var(--light-color);
		cursor: pointer;
	}

	h2 {
		font-family: "HWTAetna-ExtraCondensed";
		font-size: 2rem;
		color:#f8f8f8
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
		width: 2.5rem;
		/* width: 45px; */
		cursor: pointer;
	}
	
	button {
		padding: 0.5rem;
		background-color: #f25b3d;
		color: var(--light-color);
		border-radius: var(--box-radius);
		border: 2px solid #f25b3d;
  	text-decoration: none;
		cursor: pointer;
	}

</style>

<header class="header">
	<div class="container">
		<h2 on:click={()=>{$selectedPage='home';}}>Xocolatl-.-v2</h2>
		<div class="right-content">
		{#if $signerAddress}
			<img class="add-token-button" src="/static/tokens/XOC.svg" on:click={addXOCToMetamask} alt="Add XOC to metamask button"/>
			{#if $isRighNetwork && currentChainHex}
				<Select width="6rem" options={chainOptions} defaultValue={currentChainHex} handleClickFunc={changeNetwork}/>
			{:else}
				Unsupported network!
			{/if}
			<Select width="3rem" options={localeOptions} defaultValue={trimmedLocale} handleClickFunc={locale.set}/>
		{:else}
			<Select width="3rem" options={localeOptions} defaultValue={trimmedLocale} handleClickFunc={locale.set}/>
		{/if}
		<button type="button" on:click={()=>$accountModalHidden=false}>{$connected ? shortSignerAddress : $_('actions.connect')}</button>
		</div>
	</div>
</header>



