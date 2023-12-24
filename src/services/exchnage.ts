import { CoinExchangeDto } from 'types/CoinExchangeDto.ts';

export const exchange = async (exchange: CoinExchangeDto) => {
  // this function has 50% chance of failing but wait for 1 second
  const random = Math.random();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (random > 0.5) {
        resolve({
          success: true,
          message: `Successfully exchanged ${exchange.sellingCoinAmount} ${exchange.sellingCoinSymbol} to ${exchange.buyingCoinSymbol}`,
        });
      } else {
        reject({
          success: false,
          message: `Exchange failed. Please try again later.`,
        });
      }
    }, 1000);
  });
};
