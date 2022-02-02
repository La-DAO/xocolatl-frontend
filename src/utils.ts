import { get } from 'svelte/store';
import { connected } from 'svelte-ethers-store';
import { isRighNetwork } from './store';

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

