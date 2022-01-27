/// <reference types="svelte" />

interface Window {
  ethereum: any;
}



// TODO: make better types for module
declare module "svelte-ethers-store" {
  import type {Readable} from 'svelte/store';

  export const defaultEvmStores: DefaultEVMStore 
  export const connected: Readable<boolean>
  export const chainId: Readable<number | string>
  export const signerAddress: Readable<string>
  export const provider: any;
  export const signer: any;
}


interface DefaultEVMStore {
    disconnect: () => void;
    setProvider: () => void;
}
