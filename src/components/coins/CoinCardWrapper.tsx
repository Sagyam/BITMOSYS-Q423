import CoinCard, { CoinCardProps } from '@components/coins/CoinCard.tsx';
import React from 'react';

interface CoinCardWrapperProps {
  coins: CoinCardProps[];
}

const CoinCardWrapper: React.FC<CoinCardWrapperProps> = (props) => {
  const { coins } = props;
  return (
    <>
      <h3 className="text-xl font-semibold tracking-tight mb-4">Your Coins</h3>
      <div className="grid-cols-1 gap-y-4 w-[400px]">
        {coins.map((coin) => {
          return (
            <CoinCard
              key={coin.key}
              icon={coin.icon}
              name={coin.name}
              symbol={coin.symbol}
              balance={coin.balance}
            />
          );
        })}
      </div>
    </>
  );
};
export default CoinCardWrapper;
