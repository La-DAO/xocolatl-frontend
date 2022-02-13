import { get } from 'svelte/store';
import { connected } from 'svelte-ethers-store';
import { isRighNetwork } from './store/store';
import { resetAll } from './store/contractData';
import { fetchAllDisplayData } from './contractReads';

// input: 0x50c57894c3b9bf022d10b94b9d940a48a93cd8c0
// output: 0x50...d8c0
export function toShortAddress(address: string): string {
	if(address) {
		return address.slice(0,4) + '...' + address.slice(-4);
	} else return '';
}

export function checkContractCallPrereqs() {
	if(!get(connected)) {
		throw 'Wallet is not connected!';
	} 

	if(!get(isRighNetwork)) {
		throw 'Wallet is connected to the wrong network!';
	} 
}

export function handleProviderChange() {
	resetAll();
	fetchAllDisplayData();
}

// custom svelte directive, usage <Component use:clickOutside={handleClick} />
export function clickOutside(node: HTMLElement, onEventFunction: ()=>void) {
	const handleClick = (event: Event) => {
		const path = event.composedPath();
		if (!path.includes(node)) {
			onEventFunction();
		}
	};

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		}
	};
}

// prompt user to change network via metamask
export async function changeNetwork(chainId: string) {
	// @ts-ignore:next-line
	await window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId}]});
}
