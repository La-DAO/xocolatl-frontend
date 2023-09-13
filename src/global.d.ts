/// <reference types="svelte" />

// TODO: fix this and remove ts-ignore from window.ethereum access
declare global {
  import type { ExternalProvider } from "@ethersproject/providers";

  interface Window {
    ethereum: ExternalProvider;
  }
  declare let window: Window;
}
