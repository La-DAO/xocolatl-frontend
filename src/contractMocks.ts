/* utility functions to compute values sucha as health ratio in the same way as the
	 smarts contracts to save on RPC calls, very important for the computations to be
	 identical, and is a good idea to write automated tests for this */
import { BigNumber, utils } from 'ethers';

// https://github.com/PipilaDAO/xocolatl-contracts/blob/main/contracts/HouseOfCoin.sol#L741
export function computeUserHealthRatio(reserveBal: BigNumber,  mintedCoinBal: BigNumber, collatRatioNum: BigNumber, collatRatioDenom: BigNumber, price: BigNumber, liqParamGlobalBase: BigNumber) {
	if (mintedCoinBal.isZero() || reserveBal.isZero()) {
		throw 'No balances for healthRatio';
	}

	console.log('DEBUG price: ', utils.formatEther(price));
	console.log('DEBUG reserveBal: ', utils.formatEther(reserveBal));
	console.log('DEBUG mintedCoinBal: ', utils.formatEther(reserveBal));
	console.log('DEBUG collatRatioNum: ', utils.formatEther(collatRatioNum));
	console.log('DEBUG liqParamGlobalBase: ', utils.formatEther(liqParamGlobalBase));

	const reserveBalReducedByFactor: BigNumber = (reserveBal.mul(collatRatioDenom)).div(collatRatioNum);

	const maxMintableAmount = (reserveBalReducedByFactor.mul(price)).div(BigNumber.from(liqParamGlobalBase));

	return (maxMintableAmount.mul(liqParamGlobalBase)).div(mintedCoinBal);
}


const WETH = utils.parseEther('0.006158562721536154');
const XOC = utils.parseEther('128.28311626679232');
const nume = BigNumber.from('150');
const denom = BigNumber.from('100');
const price = utils.parseUnits('32039.95834182', 18);
// const price = utils.parseEther('32039.95834182', 12);
const base = utils.parseEther('1');
const test = computeUserHealthRatio(WETH, XOC, nume, denom, price, base);
console.log(utils.formatEther(test));
