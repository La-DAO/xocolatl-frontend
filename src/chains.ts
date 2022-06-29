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
	supportsNative: true
};

const kovanData: ChainData = {
	chain: 42,
	chainHex: '0x2a',
	name: 'Kovan',
	blockExplorerURL: 'https://kovan.etherscan.io/',
	WETHAddress: '0x053DA244AaaF94A071d9e3E73141e5249FE9251D',
	WETHABI: mockWETHABI,
	assetsAccountantAddress: '0xd9c5D3B12719fdA2d8c2CCA48FD3D92123c5D1CC',
	assetsAccountantABI: assetsAccountantABI,
	houseOfReserveAddress: '0x8325CE385A2Fbc320f55F6C7bbe267532bF1F89B',
	houseOfReserveABI: houseOfReserveABI,
	houseOfCoinAddress: '0x3c3714b6Ac979241a71717c0A89e7226988141A5',
	houseOfCoinABI: houseOfCoinABI,
	XOCAddress: '0x2FeE11961a58b36E766a74CC9c76A847E002FEAa',
	XOCABI: XOCABI,
	reserveTokenID: '69208386426602677783460625292205263210637705470065513959812478282694433536962',
	backedTokenID: '6398073223512371539250731142149975136586141799346430329041765947991383045798',
	supportsNative: true
};

export const chains: ChainDict = {
	4: rinkebyData,
	'0x4': rinkebyData, // sometimes metamask returns chain Id as hex and sometimes as int
	42: kovanData,
	'0x2a': kovanData
};
