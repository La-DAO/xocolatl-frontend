import {
	mockWETHABI,
	ERC20ABI,
	houseOfReserveABI,
	houseOfCoinABI,
	assetsAccountantABI,
	XOCABI
} from './abis';

export interface Asset {
	name: string;
	address: string;
	decimals: string;
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
			decimals: "18",
			abi: mockWETHABI,
			houseOfReserveAddress: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
			reserveTokenID: '73887769654539014949073486582216648661191570491572674202348119740207094196106',
			backedTokenID: '61675758050310630888197740848107423622427107441595589912927697675813290646218',
		},
		{
			name: "WBTC",
			address: "0x45AC379F019E48ca5dAC02E54F406F99F5088099",
			decimals: "8",
			abi: ERC20ABI,
			houseOfReserveAddress: "0xEFAA8B7EF4b8f6D71B9d892Ae7d3DdC0a02E0372",
			reserveTokenID: '99941502029397031111252900809768826641181088650485097910049856126860921422367',
			backedTokenID: '96411199536796624847494636185874213197953978055675146569468026905015150253258',
		},
	],
	assetsAccountantAddress: '0xB90996A70C957a1496e349434CF0E030A9f693A4',
	assetsAccountantABI: assetsAccountantABI,
	houseOfReserveABI: houseOfReserveABI,
	houseOfCoinAddress: '0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B',
	houseOfCoinABI: houseOfCoinABI,
	XOCAddress: '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf',
	XOCABI: XOCABI,
	supportsNative: false,
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
			decimals: "18",
			abi: ERC20ABI,
			houseOfReserveAddress: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
			reserveTokenID: '11947586584348366889623359790458925956500907418440056359644468546038903560217',
			backedTokenID: '70972479931534892086591623403426119776171689317875217451089907405265175126937',
		},
		{
			name: "WBTC",
			address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
			decimals: "8",
			abi: ERC20ABI,
			houseOfReserveAddress: "0x983A0eC44bf1BB11592a8bD5F91f05adE4F44D81",
			reserveTokenID: '50797098686137655044639401348940838345052794690448053205415697806813824230086',
			backedTokenID: '57342654198272734872890350495888597817619885438410899681268349930674170869034',
		},
		{
			name: "WMATIC",
			address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
			decimals: "18",
			abi: ERC20ABI,
			houseOfReserveAddress: "0xdB9Dd25660240415d95144C6CE4f21f00Edf8168",
			reserveTokenID: '7249884297576192763949224262904801338033525667336087702159801204853428754755',
			backedTokenID: '91100958396429013258976897630183527246789787972219101872512970882812448345098',
		},
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

const binanceData: ChainData = {
	chain: 56,
	chainHex: '0x36',
	name: 'BSC',
	blockExplorerURL: 'https://bscscan.com/',
	reserveAssets: [
		{
			name: "WETH",
			address: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
			decimals: "18",
			abi: ERC20ABI,
			houseOfReserveAddress: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
			reserveTokenID: '109392682290811008908886113795024894114858297692101491428581960053892280371532',
			backedTokenID: '20522261273989995093535621539527639348056070782168896977856206653483982583625',
		},
		{
			name: "WBNB",
			address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
			decimals: "18",
			abi: ERC20ABI,
			houseOfReserveAddress: "0x070ccE6887E70b75015F948b12601D1E759D2024",
			reserveTokenID: '85925987621059561469642133971917522532759533358859710307334868485990845307587',
			backedTokenID: '36240893346862244708187722980583805772746997097966348518842957091580463611081',
		},
	],
	assetsAccountantAddress: '0xB90996A70C957a1496e349434CF0E030A9f693A4',
	assetsAccountantABI: assetsAccountantABI,
	houseOfReserveABI: houseOfReserveABI,
	houseOfCoinAddress: '0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B',
	houseOfCoinABI: houseOfCoinABI,
	XOCAddress: '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf',
	XOCABI: XOCABI,
	supportsNative: false,
	swapURL: 'https://app.uniswap.org/'
}

export const chains: ChainDict = {
	5: goerliData,
	'0x5': goerliData, // sometimes metamask returns chain Id as hex and sometimes as int
	137: polygonData,
	'0x89': polygonData,
	56: binanceData,
	'0x36': binanceData
};

export function getSelectedAssetObject(chainId_: string | number, collateralName_: string): Asset {
	const assets_: Asset[] = chains[chainId_].reserveAssets;
	const asset: any = assets_.find((assetElement: Asset) => assetElement.name == collateralName_);
	return asset;
}

export function getCollateralOptions(chainId_:string | number):string[] {
	const assets_: Asset[] = chains[chainId_].reserveAssets;
	let options: string[] = [];
	for (let i = 0; i < assets_.length; i++) {
		options.push(assets_[i].name);
	}
	return options;
}
