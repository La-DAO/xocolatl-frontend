<script lang="ts">
  // TODO: only update the needed parts according to event, not all display data
  // TODO: remove logs once all events are tested
  // TODO: are assetsAccountant events needed?

  import type { BigNumber, Event } from "ethers";

  import { get } from "svelte/store";
  import { provider, signerAddress } from "svelte-ethers-store";
  import {
    fetchAllDisplayData,
    getCollateralToXOCRate,
    getMaxCollateralWithdrawal,
    getXOCMintingPower,
    getHealthRatio,
  } from "../contractReads";
  import { isRighNetwork } from "../store/store";
  import {
    CollateralContract,
    houseOfReserveContract,
    houseOfCoinContract,
    XOCContract,
  } from "../store/contracts";
  import { selectedCollateral } from "src/store/userInput";

  $: if (
    $isRighNetwork &&
    $selectedCollateral &&
    get(CollateralContract) &&
    get(houseOfCoinContract) &&
    get(houseOfReserveContract) &&
    get(XOCContract)
  ) {
    /* eslint-disable @typescript-eslint/no-unused-vars */

    $provider.on("block", (blockNumber: number) => {
      // update price dependant data more often
      if (blockNumber % 3 === 0) {
        getCollateralToXOCRate();
        getMaxCollateralWithdrawal();
        getXOCMintingPower();
        getHealthRatio();
      }
    });

    /* 	/1* eslint-disable @typescript-eslint/no-unused-vars *1/ */
    get(CollateralContract)!.on(
      "Approval",
      (src: string, guy: string, _event: Event) => {
        if (src === $signerAddress || guy === $signerAddress) {
          console.log("detected WETH Approval event");
          fetchAllDisplayData();
        }
      },
    );

    get(CollateralContract)!.on(
      "Transfer",
      (src: string, dst: string, wad: BigNumber, event: Event) => {
        if (src === $signerAddress || dst === $signerAddress) {
          console.log("detected WETH Transfer event");
          fetchAllDisplayData();
        }
      },
    );

    get(CollateralContract)!.on(
      "Withdrawal",
      (src: string, _wad: BigNumber, _event: Event) => {
        if (src === $signerAddress) {
          console.log("detected WETH Withdrawal event");
          fetchAllDisplayData();
        }
      },
    );

    get(houseOfReserveContract)!.on(
      "UserDeposit",
      (user: string, _asset: string, _amount: BigNumber, _event: Event) => {
        if (user === $signerAddress) {
          console.log("detected HouseOfContract UserDeposit event");
          fetchAllDisplayData();
        }
      },
    );

    get(houseOfReserveContract)!.on(
      "UserWithdraw",
      (user: string, _asset: string, _amount: BigNumber, _event: Event) => {
        if (user === $signerAddress) {
          console.log("detected HouseOfContract UserWithdraw event");
          fetchAllDisplayData();
        }
      },
    );

    get(houseOfCoinContract)!.on(
      "CoinMinted",
      (
        user: string,
        _backedTokenID: number,
        _amount: BigNumber,
        _event: Event,
      ) => {
        if (user === $signerAddress) {
          console.log("detected HouseOfCoin CoinMinted event");
          fetchAllDisplayData();
        }
      },
    );

    get(houseOfCoinContract)!.on(
      "CoinPayback",
      (
        user: string,
        _backedTokenID: number,
        _amount: BigNumber,
        _event: Event,
      ) => {
        if (user === $signerAddress) {
          console.log("detected HouseOfCoin CoinPayback event");
          fetchAllDisplayData();
        }
      },
    );

    // get(houseOfCoinContract)!.on('Liquidation', (userLiquidated: string, _liquidator: string, _collateralAmount: BigNumber, _event: Event) => {
    // 	if (userLiquidated === $signerAddress) {
    // 		console.log(`
    //  |~~~~~~|
    //  |      |
    //  |      |       __________
    //  | (o)(o)      /          \\
    //  @      _)  __/  ¡Ay       \\
    //   | ,___| /___    caramba!  |
    //   |   /       \\            /
    //  /____\\        \\__________/
    // /      \\    `); // dont remove this
    // 		console.log('detected HouseOfCoin Liquidation event');
    // 		fetchAllDisplayData();
    // 	}
    // });

    // get(houseOfCoinContract)!.on('MarginCall', (user: string, _mintedAsset: string, _reserveAsset: string, _event: Event) => {
    // 	if (user === $signerAddress) {
    // 		console.log('detected HouseOfCoin MarginCall event');
    // 		fetchAllDisplayData();
    // 	}
    // });

    get(XOCContract)!.on(
      "Approval",
      (owner: string, _spender: string, _value: BigNumber, _event: Event) => {
        if (owner === $signerAddress) {
          console.log("detected XOC Approval event");
          fetchAllDisplayData();
        }
      },
    );

    get(XOCContract)!.on(
      "Transfer",
      (from: string, to: string, _value: string, _event: Event) => {
        if (from === $signerAddress || to === $signerAddress) {
          console.log("detected XOC Transfer event");
          fetchAllDisplayData();
        }
      },
    );
    /* eslint-enable @typescript-eslint/no-unused-vars */
  }
</script>
