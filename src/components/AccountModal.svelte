<script lang="ts">
import { providers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { defaultEvmStores, connected, signerAddress, chainId, provider } from 'svelte-ethers-store';
import { onMount } from 'svelte';
import { _ } from 'svelte-i18n';

import { clickOutside, toShortAddress } from '../utils';
import { chains } from '../chains';
import { resetAll } from '../store/contractData';

import Icon from './Icon.svelte';




export let hidden = true; 
let delayPassed = false;

function handleOutsideClick() {
	if(delayPassed) {
		hidden = true;
	}
}


async function handleMetamaskConnect() {
	/* hidden = true; */
	await defaultEvmStores.setProvider();
}

async function handleWalletConnectProvider() {
	const providerOptions = {
		walletconnect: {
			network: 'rinkeby',
			cacheProvider: false,
			package: WalletConnectProvider, // required
			options: {
				rpc: {
					4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
					42: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
					// ...
				},
			}
		}
	};
	//  Enable session (triggers QR Code modal)


	const wcProvider = new WalletConnectProvider({
		rpc: {
			4: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
			42: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
			// ...
		},
	});
	//  Enable session (triggers QR Code modal)
	await wcProvider.enable();

	//  Wrap with Web3Provider from ethers.js
	const web3Provider = new providers.Web3Provider(wcProvider);
	await defaultEvmStores.setProvider(web3Provider);
	console.log($provider);
}


async function handleDisconnect() {
	defaultEvmStores.disconnect();
	resetAll();
	hidden = true;
}

onMount(async () => {
	if(!$connected) {
		/* handleConnect(); */
	}
	await new Promise(r => setTimeout(r, 1000));
	delayPassed = true;
});
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
	width: 20rem;
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
	background-color: #FDDFC3;
	border: 1px solid var(--main-color);
	cursor: pointer;
	height: 2rem;
	width: 10rem;
	margin: 1rem;
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
	column-gap: 0.8rem;
}

.mini-button {
	font-size: 0.8rem;
	cursor: pointer;
	color: var(--light-main-color);
}


.mini-button:hover {
	font-size: 0.8rem;
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
	color: var(--light-main-color);
	margin: 0.2rem;
}


.mini-pill-button:hover {
	border-color:	var(--main-color);
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
	padding: 0.8rem;
	margin: 0.2rem;
}

.provider-option:hover {
	border: 1px solid var(--main-color);
	font-weight: 600;
}


.wallet-logo {
	width: 1.5rem;
	height: 1.5rem;
}

</style>

<section class:hidden class="modal">
	<div use:clickOutside={handleOutsideClick} class="modal-content">
		{#if $connected}
			<div class="modal-header">
				<b>Account</b>
				<div>
					<div class="mini-pill-button">Change</div>
					<div on:click={handleDisconnect} class="mini-pill-button">Disconnect</div>
				</div>
			</div>
			<div class="round-border modal-body">
				<p>{toShortAddress($signerAddress)}</p><br>
				<div class="mini-buttons">
					<div on:click={()=>navigator.clipboard.writeText($signerAddress)} class="mini-button"><Icon name="copy" width="0.8rem" height="0.8rem"/>&nbsp;Copy address</div>
					<div on:click={()=>window.open(chains[$chainId].blockExplorerURL + '/address/' + $signerAddress, '_blank')} class="mini-button"><Icon name="link" width="0.8rem" height="0.8rem"/>&nbsp;View on block explorer</div>
				</div>
			</div>
		{:else}
			<div class="modal-header">
				<b>Connect a wallet</b>
			</div>
			<div class="modal-body">
				<div on:click={handleMetamaskConnect} class="round-border provider-option">
					Metamask
					<img class="wallet-logo" alt="Metamask logo" src="/static/wallets/metamask.png"/>
				</div>
				<div on:click={handleWalletConnectProvider} class="round-border provider-option">
					WalletConnect
					<img class="wallet-logo" alt="WalletConnect logo" src="/static/wallets/walletconnect.svg"/>
				</div>

				<div class="round-border provider-option">
					Coinbase	
					<img class="wallet-logo" alt="Coinbase logo" src="/static/wallets/coinbase.svg"/>
				</div>
			</div>
		{/if}
		<button class="mini-pill-button" on:click="{()=>hidden=true}">{$_('modal.close')}</button>
	</div>
</section>
