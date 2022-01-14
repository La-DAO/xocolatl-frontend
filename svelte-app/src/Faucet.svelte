<script lang="ts">
	export let provider;

	import { ethers } from "ethers";

	const mockWETHAddress = "0xb3a8599c3f57a7b21693A41e038d34A9E1789283";

	const abi = [
		/* 'event Approval(address indexed src, address indexed guy, uint256 wad)', */
		/* 'event Deposit(address indexed dst, uint256 wad)', */
		/* 'event Transfer(address indexed src, address indexed dst, uint256 wad)', */
		/* 'event Withdrawal(address indexed src, uint256 wad)', */
		/* 'function allowance(address, address) view returns (uint256)', */
		/* 'function approve(address guy, uint256 wad) returns (bool)', */
		'function balanceOf(address) view returns (uint256)',
		/* 'function decimals() view returns (uint8)', */
		/* 'function deposit() payable', */
		/* 'function getFromFaucet()', */
		/* 'function name() view returns (string)', */
		/* 'function symbol() view returns (string)', */
		/* 'function totalSupply() view returns (uint256)', */
		/* 'function transfer(address dst, uint256 wad) returns (bool)', */
		/* 'function transferFrom(address src, address dst, uint256 wad) returns (bool)', */
		/* 'function withdraw(uint256 wad)' */
	];

	const contract = new ethers.Contract(mockWETHAddress, abi, provider);
	/* console.log(provider.enable()); */
</script>

<button type="button">get mockWETH</button>
