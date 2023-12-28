import { Coin } from '@/types/CoinDropdown.ts';
import create from 'zustand';

type CoinStore = {
  coins: Coin[];
  addCoin: (coin: Coin) => void;
  removeCoin: (symbol: string) => void;
};

export const useCoinStore = create<CoinStore>((set) => ({
  coins: [],
  setCoins: (coins: Coin[]) => set({ coins }),
  addCoin: (coin) => set((state) => ({ coins: [...state.coins, coin] })),
  removeCoin: (symbol) =>
    set((state) => ({
      coins: state.coins.filter((coin) => coin.symbol !== symbol),
    })),
}));
