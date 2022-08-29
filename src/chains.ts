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
	assetsAccountantAddress: '0x2e690b471fF7Ded526Bc0Df66f0F96f4c6C3CF64',
	assetsAccountantABI: assetsAccountantABI,
	houseOfReserveAddress: '0x09dFC327364701d73683aCe049B8A5a8Ea27F3E8',
	houseOfReserveABI: houseOfReserveABI,
	houseOfCoinAddress: '0x4F97C3C8Af0764cC0Af5C3C0F5064F4A6BD5b138',
	houseOfCoinABI: houseOfCoinABI,
	XOCAddress: '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf',
	XOCABI: XOCABI,
	reserveTokenID: '79159197467886279972602369927388878441075624717741112905586777130204689824301',
	backedTokenID: '38027928501126880381480226851197398435371565437457569669724747593725466577845',
	supportsNative: false,
	swapURL: 'https://app.uniswap.org/#/swap?inputCurrency=0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf&outputCurrency=0x2791bca1f2de4661ed88a30c99a7a9449aa84174&chain=polygon'
};

export const chains: ChainDict = {
	4: rinkebyData,
	'0x4': rinkebyData, // sometimes metamask returns chain Id as hex and sometimes as int
	137: polygonData,
	'0x89': polygonData
};
