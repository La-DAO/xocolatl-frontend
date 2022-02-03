<script lang="ts">
	// TODO: only update the needed parts according to event, not all display data
	// TODO: remove logs once all events are tested
	// TODO: are assetsAccountant events needed?

	import { ethers } from 'ethers';
	import { provider, signerAddress } from 'svelte-ethers-store';
	import { 
		mockWETHABI, 
		mockWETHAddress, 
		houseOfReserveABI, 
		houseOfReserveAddress, 
		houseOfCoinAddress, 
		houseOfCoinABI, 
		XOCAddress, 
		XOCABI
	} from './abis';
	import { fetchAllDisplayData } from './contractReads';
	import { isRighNetwork } from './store';

	$: if ($isRighNetwork) {
		const mockWETHContract = new ethers.Contract(mockWETHAddress, mockWETHABI, $provider);
		const houseOfReserveContract = new ethers.Contract(houseOfReserveAddress, houseOfReserveABI, $provider);
		const houseOfCoinContract = new ethers.Contract(houseOfCoinAddress, houseOfCoinABI, $provider);
		const XOCContract = new ethers.Contract(XOCAddress, XOCABI, $provider);

		$provider.on('block', (blockNumber: number) => {
			// update all data every 50 blocks in case some event is not picked up
			if (blockNumber%50 === 0) {
				fetchAllDisplayData();			
			}
		});

		/* eslint-disable @typescript-eslint/no-unused-vars */
		mockWETHContract.on('Approval', (src, guy, _event) => {
			if (src === $signerAddress || guy === $signerAddress) {
				console.log('detected WETH Approval event');
				fetchAllDisplayData();			
			}
		});

		mockWETHContract.on('Deposit', (dst, _wad, _event) => {
			if (dst === $signerAddress) {
				console.log('detected WETH Deposit event');
				fetchAllDisplayData();			
			}
		});

		mockWETHContract.on('Transfer', (src, dst, wad, event) => {
			console.log('from: ', src, 'to ', dst, 'amount ', wad);
			console.log(event.blockNumber);
			if (src === $signerAddress || dst === $signerAddress) {
				console.log('detected WETH Transfer event');
				fetchAllDisplayData();			
			}
		});


		mockWETHContract.on('Withdrawal', (src, _wad, _event) => {
			if (src === $signerAddress) {
				console.log('detected WETH Withdrawal event');
				fetchAllDisplayData();			
			}
		});
		
		houseOfReserveContract.on('UserDeposit', (user, _asset, _amount, _event) => {
			if (user === $signerAddress) {
				console.log('detected HouseOfContract UserDeposit event');
				fetchAllDisplayData();
			}
		});

		houseOfReserveContract.on('UserWithdraw', (user, _asset, _amount, _event) => {
			if (user === $signerAddress) {
				console.log('detected HouseOfContract UserWithdraw event');
				fetchAllDisplayData();
			}
		});

		houseOfCoinContract.on('CoinMinted', (user, _backedTokenID, _amount, _event) => {
			if (user === $signerAddress) {
				console.log('detected HouseOfCoin CoinMinted event');	
				fetchAllDisplayData();
			}
		});

		houseOfCoinContract.on('CoinPayback', (user, _backedTokenID, _amount, _event) => {
			if (user === $signerAddress) {
				console.log('detected HouseOfCoin CoinPayback event');	
				fetchAllDisplayData();
			}
		});

		houseOfCoinContract.on('Liquidation', (userLiquidated, _liquidator, _collateralAmount, _event) => {
			if (userLiquidated === $signerAddress) {
				console.log(`
     |~~~~~~|                 
     |      |                   
     |      |       __________    
     | (o)(o)      /          \\     
     @      _)  __/  ¡Ay       \\ 
      | ,___| /___    caramba!  |   
      |   /       \\            /    
     /____\\        \\__________/     
    /      \\    `); // dont remove this 
				console.log('detected HouseOfCoin Liquidation event');	
				fetchAllDisplayData();
			}
		});

		houseOfCoinContract.on('MarginCall', (user, _mintedAsset, _reserveAsset, _event) => {
			if (user === $signerAddress) {
				console.log('detected HouseOfCoin MarginCall event');	
				fetchAllDisplayData();
			}
		});

		XOCContract.on('Approval', (owner, _spender, _value, _event) => {
			if(owner === $signerAddress) {
				console.log('detected XOC Approval event');	
				fetchAllDisplayData();
			}
		});
		
		XOCContract.on('Transfer', (from, to, _value, _event) => {
			if(from === $signerAddress || to === $signerAddress) {
				console.log('detected XOC Transfer event');	
				fetchAllDisplayData();
			}
		});
		/* eslint-enable @typescript-eslint/no-unused-vars */
	}
</script>

