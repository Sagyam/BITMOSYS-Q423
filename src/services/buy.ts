import { BuyCoinDto } from '@/types/BuyCoinDto.ts';

export const buy = async (buy: BuyCoinDto) => {
  const random = Math.random();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (random > 0.5) {
        resolve({
          success: true,
          message: `Successfully bought ${buy.buyingCoinAmount} ${buy.buyingCoinSymbol}`,
        });
      } else {
        reject({
          success: false,
          message: `Buy failed. Please try again later.`,
        });
      }
    }, 1000);
  });
};
