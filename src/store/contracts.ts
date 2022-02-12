import { ethers } from 'ethers';
import { WrapperBuilder } from 'redstone-evm-connector';
import { derived } from 'svelte/store';
import { provider, signer, chainId } from 'svelte-ethers-store';

import { chains } from '../chains';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const WETHContract = derived(
	[provider, signer, chainId],
	([_, $signer, $chainId]) => {
		if($chainId) {
			return new ethers.Contract(chains[$chainId].WETHAddress, chains[$chainId].WETHABI, $signer);
		}
	}
);

export const XOCContract = derived(
	[provider, signer, chainId],
	([_, $signer, $chainId]) => {
		if($chainId) {
			return new ethers.Contract(chains[$chainId].XOCAddress, chains[$chainId].XOCABI, $signer);
		}
	}
);

export const houseOfCoinContract = derived(
	[provider, signer, chainId],
	([_, $signer, $chainId]) => {
		if($chainId) {
			return new ethers.Contract(chains[$chainId].houseOfCoinAddress, chains[$chainId].houseOfCoinABI, $signer);
		}
	}
);

export const wrappedHouseOfCoinContract = derived(
	houseOfCoinContract,
	($houseOfCoinContract) => {
		if($houseOfCoinContract) {
			return WrapperBuilder.wrapLite($houseOfCoinContract).usingPriceFeed('redstone-stocks');
		}
	}
);

export const assetsAccountantContract = derived(
	[provider, signer, chainId],
	([_, $signer, $chainId]) => {
		if($chainId) {
			return new ethers.Contract(chains[$chainId].assetsAccountantAddress, chains[$chainId].assetsAccountantABI, $signer);
		}
	}
);

export const houseOfReserveContract = derived(
	[provider, signer, chainId],
	([_, $signer, $chainId]) => {
		if($chainId) {
			return new ethers.Contract(chains[$chainId].houseOfReserveAddress, chains[$chainId].houseOfReserveABI, $signer);
		}
	}
);
/* eslint-enable @typescript-eslint/no-unused-vars */

export const wrappedHouseOfReserveContract = derived(
	houseOfReserveContract,
	($houseOfReserveContract) => {
		if($houseOfReserveContract) {
			return WrapperBuilder.wrapLite($houseOfReserveContract).usingPriceFeed('redstone-stocks');
		}
	}
);

