import { ethers } from 'ethers';
import { WrapperBuilder } from 'redstone-evm-connector';
import { derived } from 'svelte/store';
import { provider, signer } from 'svelte-ethers-store';

import {
	mockWETHABI,
	mockWETHAddress,
	houseOfReserveABI,
	houseOfReserveAddress,
	houseOfCoinAddress,
	houseOfCoinABI,
	assetsAccountantAddress,
	assetsAccountantABI,
	XOCAddress,
	XOCABI
} from '../abis';

export const mockWETHContract = derived(
	[provider, signer],
	([_, $signer]) => {
		return new ethers.Contract(mockWETHAddress, mockWETHABI, $signer);
	}
);

export const XOCContract = derived(
	[provider, signer],
	([_, $signer]) => {
		return new ethers.Contract(XOCAddress, XOCABI, $signer);
	}
);

export const houseOfCoinContract = derived(
	[provider, signer],
	([_, $signer]) => {
		return new ethers.Contract(houseOfCoinAddress, houseOfCoinABI, $signer);
	}
);

export const wrappedHouseOfCoinContract = derived(
	houseOfCoinContract,
	($houseOfCoinContract) => {
		return WrapperBuilder.wrapLite($houseOfCoinContract).usingPriceFeed('redstone-stocks');
	}
);


export const assetsAccountantContract = derived(
	[provider, signer],
	([_, $signer]) => {
		return new ethers.Contract(assetsAccountantAddress, assetsAccountantABI, $signer);
	}
);

export const houseOfReserveContract = derived(
	[provider, signer],
	([_, $signer]) => {
		return new ethers.Contract(houseOfReserveAddress, houseOfReserveABI, $signer);
	}
);

export const wrappedHouseOfReserveContract = derived(
	houseOfReserveContract,
	($houseOfReserveContract) => {
		const wrapped = WrapperBuilder.wrapLite($houseOfReserveContract).usingPriceFeed('redstone-stocks');
		console.log(wrapped);
		return WrapperBuilder.wrapLite($houseOfReserveContract).usingPriceFeed('redstone-stocks');
	}
);


