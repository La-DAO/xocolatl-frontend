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
}

type ChainDict = Record<number | string, ChainData>

const rinkebyData: ChainData = {
	chain: 4,
	chainHex: '0x4',
	name: 'Rinkeby',
	blockExplorerURL: 'https://rinkeby.etherscan.io/',
	WETHAddress: '0xDf032Bc4B9dC2782Bb09352007D4C57B75160B15',
	WETHABI: mockWETHABI,
	assetsAccountantAddress: '0xf487Ff2A5430eFBdC4B15e2735d9D83e3508F317',
	assetsAccountantABI: assetsAccountantABI,
	houseOfReserveAddress: '0x62c4014a76e21C046fc5196D81E8cD7e04C5f122',
	houseOfReserveABI: houseOfReserveABI,
	houseOfCoinAddress: '0xF3A1C091f110F7b931c02d3603ec8bC771182466',
	houseOfCoinABI: houseOfCoinABI,
	XOCAddress: '0x2872332fB3619F5fDbAeb04F4e3Bd8e42AF8fD04',
	XOCABI: XOCABI,
	reserveTokenID: '88734515301932686712688092184837134491539790610697260956188654409873299489389',
	backedTokenID: '52951359997726846672786431933234956040022616589815865782932571823524763458518',
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
};

export const chains: ChainDict = {
	4: rinkebyData,
	'0x4': rinkebyData, // sometimes metamask returns chain Id as hex and sometimes as int
	42: kovanData,
	'0x2a': kovanData
};
