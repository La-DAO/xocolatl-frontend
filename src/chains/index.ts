import {
  assetsAccountantABI,
  ERC20ABI,
  houseOfCoinABI,
  houseOfReserveABI,
  mockWETHABI,
  XOCABI,
} from "../abis";

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

type ChainDict = Record<number | string, ChainData>;

const baseData: ChainData = {
  chain: 8453,
  chainHex: "0x2105",
  name: "Base",
  blockExplorerURL: "https://basescan.org/",
  reserveAssets: [
    {
      name: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      decimals: "18",
      abi: mockWETHABI,
      houseOfReserveAddress: "0xfF69E183A863151B4152055974aa648b3165014D",
      reserveTokenID:
        "103699178623717208254151570900052288551889562116172163191481545905964204685853 ",
      backedTokenID:
        "8845051240560412557863425425586194836306989955683227883233854819693793989434",
    },
    {
      name: "CBETH",
      address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
      decimals: "18",
      abi: ERC20ABI,
      houseOfReserveAddress: "0x5c4a154690AE52844F151bcF3aA44885db3c8A58",
      reserveTokenID:
        "48535059369184038424797331578893275455355989669714862332699705636188497614796",
      backedTokenID:
        "113840104691995121390901058070296301361752511786326304414032534053768202616249 ",
    },
  ],
  assetsAccountantAddress: "0xB93EcD005B6053c6F8428645aAA879e7028408C7",
  assetsAccountantABI: assetsAccountantABI,
  houseOfReserveABI: houseOfReserveABI,
  houseOfCoinAddress: "0x02c531Cd9791dD3A31428B2987A82361D72F9b13",
  houseOfCoinABI: houseOfCoinABI,
  XOCAddress: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
  XOCABI: XOCABI,
  supportsNative: false,
  swapURL:
    "https://app.uniswap.org/#/swap?inputCurrency=0x6aA1465af9A3140c5741943939961b197FFfe872&outputCurrency=0xb18d016cDD2d9439A19f15633005A6b2cd6Aa774&chain=rinkeby",
};

const polygonData: ChainData = {
  chain: 137,
  chainHex: "0x89",
  name: "Polygon",
  blockExplorerURL: "https://polygonscan.com/",
  reserveAssets: [
    {
      name: "WETH",
      address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      decimals: "18",
      abi: ERC20ABI,
      houseOfReserveAddress: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
      reserveTokenID:
        "11947586584348366889623359790458925956500907418440056359644468546038903560217",
      backedTokenID:
        "70972479931534892086591623403426119776171689317875217451089907405265175126937",
    },
    {
      name: "WSTETH",
      address: "0x03b54A6e9a984069379fae1a4fC4dBAE93B3bCCD",
      decimals: "18",
      abi: ERC20ABI,
      houseOfReserveAddress: "0x28C7DF27e5bC7Cb004c8D4bb2C2D91f246D0A2C9",
      reserveTokenID:
        "70617728597754959671670591070646463325745680913454098292608313964127017937305",
      backedTokenID:
        "78994011081541139165050204664365636342988447771321754025799214181511259384160",
    },
    {
      name: "WBTC",
      address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
      decimals: "8",
      abi: ERC20ABI,
      houseOfReserveAddress: "0x983A0eC44bf1BB11592a8bD5F91f05adE4F44D81",
      reserveTokenID:
        "50797098686137655044639401348940838345052794690448053205415697806813824230086",
      backedTokenID:
        "57342654198272734872890350495888597817619885438410899681268349930674170869034",
    },
    {
      name: "WMATIC",
      address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
      decimals: "18",
      abi: ERC20ABI,
      houseOfReserveAddress: "0xdB9Dd25660240415d95144C6CE4f21f00Edf8168",
      reserveTokenID:
        "7249884297576192763949224262904801338033525667336087702159801204853428754755",
      backedTokenID:
        "91100958396429013258976897630183527246789787972219101872512970882812448345098",
    },
    {
      name: "MATICX",
      address: "0xfa68FB4628DFF1028CFEc22b4162FCcd0d45efb6",
      decimals: "18",
      abi: ERC20ABI,
      houseOfReserveAddress: "0x102dda5f4621a08dafD327f29f9c815f851846dC",
      reserveTokenID:
        "75756732048555830918730488678816927792367711409511194949833821293392592707465",
      backedTokenID:
        "174106140891814996385326390762160244679740722879464514599648389018378556633",
    },
  ],
  assetsAccountantAddress: "0xB90996A70C957a1496e349434CF0E030A9f693A4",
  assetsAccountantABI: assetsAccountantABI,
  houseOfReserveABI: houseOfReserveABI,
  houseOfCoinAddress: "0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B",
  houseOfCoinABI: houseOfCoinABI,
  XOCAddress: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
  XOCABI: XOCABI,
  supportsNative: false,
  swapURL:
    "https://app.uniswap.org/#/swap?inputCurrency=0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf&outputCurrency=0x2791bca1f2de4661ed88a30c99a7a9449aa84174&chain=polygon",
};

const binanceData: ChainData = {
  chain: 56,
  chainHex: "0x38",
  name: "BSC",
  blockExplorerURL: "https://bscscan.com/",
  reserveAssets: [
    {
      name: "WETH",
      address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
      decimals: "18",
      abi: ERC20ABI,
      houseOfReserveAddress: "0xd411BE9A105Ea7701FabBe58C2834b7033EBC203",
      reserveTokenID:
        "109392682290811008908886113795024894114858297692101491428581960053892280371532",
      backedTokenID:
        "20522261273989995093535621539527639348056070782168896977856206653483982583625",
    },
    {
      name: "WBNB",
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      decimals: "18",
      abi: ERC20ABI,
      houseOfReserveAddress: "0x070ccE6887E70b75015F948b12601D1E759D2024",
      reserveTokenID:
        "85925987621059561469642133971917522532759533358859710307334868485990845307587",
      backedTokenID:
        "36240893346862244708187722980583805772746997097966348518842957091580463611081",
    },
  ],
  assetsAccountantAddress: "0xB90996A70C957a1496e349434CF0E030A9f693A4",
  assetsAccountantABI: assetsAccountantABI,
  houseOfReserveABI: houseOfReserveABI,
  houseOfCoinAddress: "0x7ed1aCD46dE3a4E63f2D3b0f4fB5532e113a520B",
  houseOfCoinABI: houseOfCoinABI,
  XOCAddress: "0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf",
  XOCABI: XOCABI,
  supportsNative: false,
  swapURL: "https://app.uniswap.org/",
};

export const chains: ChainDict = {
  8453: baseData,
  "0x2105": baseData,
  137: polygonData,
  "0x89": polygonData,
  56: binanceData,
  "0x38": binanceData,
};

export function getSelectedAssetObject(
  chainId_: string | number,
  collateralName_: string,
): Asset {
  const assets_: Asset[] = chains[chainId_].reserveAssets;
  return <Asset>(
    assets_.find((assetElement: Asset) => assetElement.name == collateralName_)
  );
}

export function getCollateralOptions(chainId_: string | number): string[] {
  const chain: ChainData = chains[chainId_];
  if (!chain) {
    return ["WETH"];
  }

  const assets_: Asset[] = chain.reserveAssets;
  const options: string[] = [];
  for (let i = 0; i < assets_.length; i++) {
    options.push(assets_[i].name);
  }

  return options;
}
