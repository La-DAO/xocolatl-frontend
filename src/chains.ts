import {
	mockWETHABI,
	ERC20ABI,
	houseOfReserveABI,
	houseOfCoinABI,
	assetsAccountantABI,
	XOCABI
} from './abis';

interface Asset {
	name: string;
	address: string;
	abi: string[];
	houseOfReserveAddress: string;
	reserveTokenID: string;
	backedTokenID: string;
}

interface ChainData {
	chain: number;
	chainHex: string;
	name: string;
	blockExplorerURL: string;
	reserveAssets: Asset[];
	assetsAccountantAddress: string;
	assetsAccountantABI: string[];
	houseOfReserveABI: string[];
	houseOfCoinAddress: string;
	houseOfCoinABI: string[];
	XOCAddress: string;
	XOCABI: string[];
	supportsNative: boolean; // indicates if we can send ETH directly so contract handles the wrapping
	swapURL: string;
}

type ChainDict = Record<number | string, ChainData>

const goerliData: ChainData = {
	chain: 5,
	chainHex: '0x5',
	name: 'Goerli',
	blockExplorerURL: 'https://goerli.etherscan.io/',
	reserveAssets: [
		{
			name: "WETH",
			address: "0xCCB14936C2E000ED8393A571D15A2672537838Ad",
			abi: mockWETHABI,
			houseOfReserveAddress: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
			reserveTokenID: '73887769654539014949073486582216648661191570491572674202348119740207094196106',
			backedTokenID: '61675758050310630888197740848107423622427107441595589912927697675813290646218',
		}
	],
	assetsAccountantAddress: '0xB90996A70C957a1496e349434CF0E030A9f693A4',
	assetsAccountantABI: assetsAccountantABI,
	houseOfReserveABI: houseOfReserveABI,
	houseOfCoinAddress: '0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B',
	houseOfCoinABI: houseOfCoinABI,
	XOCAddress: '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf',
	XOCABI: XOCABI,
	supportsNative: true,
	swapURL: 'https://app.uniswap.org/#/swap?inputCurrency=0x6aA1465af9A3140c5741943939961b197FFfe872&outputCurrency=0xb18d016cDD2d9439A19f15633005A6b2cd6Aa774&chain=rinkeby'
};

const polygonData: ChainData = {
	chain: 137,
	chainHex: '0x89',
	name: 'Polygon',
	blockExplorerURL: 'https://polygonscan.com/',
	reserveAssets: [
		{
			name: "WETH",
			address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
			abi: ERC20ABI,
			houseOfReserveAddress: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
			reserveTokenID: '11947586584348366889623359790458925956500907418440056359644468546038903560217',
			backedTokenID: '70972479931534892086591623403426119776171689317875217451089907405265175126937',
		}
	],
	assetsAccountantAddress: '0xB90996A70C957a1496e349434CF0E030A9f693A4',
	assetsAccountantABI: assetsAccountantABI,
	houseOfReserveABI: houseOfReserveABI,
	houseOfCoinAddress: '0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B',
	houseOfCoinABI: houseOfCoinABI,
	XOCAddress: '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf',
	XOCABI: XOCABI,
	supportsNative: false,
	swapURL: 'https://app.uniswap.org/#/swap?inputCurrency=0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf&outputCurrency=0x2791bca1f2de4661ed88a30c99a7a9449aa84174&chain=polygon'
};

export const chains: ChainDict = {
	5: goerliData,
	'0x4': goerliData, // sometimes metamask returns chain Id as hex and sometimes as int
	137: polygonData,
	'0x89': polygonData
};

export function getSelectedAssetObject(chainId_: string | number, collateralName_: string): Asset {
	const assets_: Asset[] = chains[chainId_].reserveAssets;
	const asset: any = assets_.find((assetElement: Asset) => assetElement.name == collateralName_);
	return asset;
}
