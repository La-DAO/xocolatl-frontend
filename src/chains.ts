import {
	mockWETHABI,
	houseOfReserveABI,
	houseOfCoinABI,
	assetsAccountantABI,
	XOCABI
} from './abis';

interface ChainData {
	chain: number;
	chainHex: string;
	name: string;
	blockExplorerURL: string;
	WETHAddress: string;
	WETHABI: string[];
	assetsAccountantAddress: string;
	assetsAccountantABI: string[];
	houseOfReserveAddress: string;
	houseOfReserveABI: string[];
	houseOfCoinAddress: string;
	houseOfCoinABI: string[];
	XOCAddress: string;
	XOCABI: string[];
	reserveTokenID: string;
	backedTokenID: string;
	supportsNative: boolean; // indicates if we can send ETH directly so contract handles the wrapping
	swapURL: string; 
}

type ChainDict = Record<number | string, ChainData>

const rinkebyData: ChainData = {
	chain: 4,
	chainHex: '0x4',
	name: 'Rinkeby',
	blockExplorerURL: 'https://rinkeby.etherscan.io/',
	WETHAddress: '0xDf032Bc4B9dC2782Bb09352007D4C57B75160B15',
	WETHABI: mockWETHABI,
	assetsAccountantAddress: '0x06201248C592cbC28AF2B874e3192204742E8355',
	assetsAccountantABI: assetsAccountantABI,
	houseOfReserveAddress: '0x2dFEB8322279a3b25BD7061f6219858E01cE5b18',
	houseOfReserveABI: houseOfReserveABI,
	houseOfCoinAddress: '0xa123ae7C924cD1891F9C1d19c0ad403d754e6134',
	houseOfCoinABI: houseOfCoinABI,
	XOCAddress: '0x6aA1465af9A3140c5741943939961b197FFfe872',
	XOCABI: XOCABI,
	reserveTokenID: '23521581748539401991698080115251968228683771099106616881408414261195714218434',
	backedTokenID: '107399411905206098464630623321328189146904250703588213735147548373379041237213',
	supportsNative: true,
	swapURL: 'https://app.uniswap.org/#/swap?inputCurrency=0x6aA1465af9A3140c5741943939961b197FFfe872&outputCurrency=0xb18d016cDD2d9439A19f15633005A6b2cd6Aa774&chain=rinkeby'
};

const polygonData: ChainData = {
	chain: 137,
	chainHex: '0x89',
	name: 'Polygon',
	blockExplorerURL: 'https://polygonscan.com/',
	WETHAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
	WETHABI: mockWETHABI,
	assetsAccountantAddress: '0x168D80Ba955033B8f98FCcC94051842d40f294c2',
	assetsAccountantABI: assetsAccountantABI,
	houseOfReserveAddress: '0xd411BE9A105Ea7701FabBe58C2834b7033EBC203',
	houseOfReserveABI: houseOfReserveABI,
	houseOfCoinAddress: '0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B',
	houseOfCoinABI: houseOfCoinABI,
	XOCAddress: '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf',
	XOCABI: XOCABI,
	reserveTokenID: '11947586584348366889623359790458925956500907418440056359644468546038903560217',
	backedTokenID: '70972479931534892086591623403426119776171689317875217451089907405265175126937',
	supportsNative: false,
	swapURL: 'https://app.uniswap.org/#/swap?inputCurrency=0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf&outputCurrency=0x2791bca1f2de4661ed88a30c99a7a9449aa84174&chain=polygon'
};

export const chains: ChainDict = {
	4: rinkebyData,
	'0x4': rinkebyData, // sometimes metamask returns chain Id as hex and sometimes as int
	137: polygonData,
	'0x89': polygonData
};
