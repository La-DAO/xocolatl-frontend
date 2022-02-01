/// <reference types="svelte" />

interface Window {
  ethereum: any;
}

// TODO: make better types for module
declare module "svelte-ethers-store" {
  import type {Readable} from 'svelte/store';
  import type {Provider} from '@ethersproject/abstract-provider';
  import type {Signer} from '@ethersproject/abstract-signer';

  interface DefaultEVMStore {
      disconnect: () => void;
      setProvider: () => void;
      provider: Readable<Provider>;
      signer: Readable<Signer>;
      connected: Readable<boolean>;
      chainId: Readable<number | string>;
      signerAddress: Readable<string>;
      evmProviderType: Readable<string>;
  }

  export const defaultEvmStores: DefaultEVMStore;
  export const connected: DefaultEVMStore['connected'];
  export const chainId: DefaultEVMStore['chainId'];
  export const signerAddress: DefaultEVMStore['signerAddress'];
  export const provider: DefaultEVMStore['provider'];
  export const signer: DefaultEVMStore['signer'];
}
