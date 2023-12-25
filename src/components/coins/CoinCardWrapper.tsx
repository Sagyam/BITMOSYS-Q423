import CoinCard, { CoinCardProps } from '@components/coins/CoinCard.tsx';
import { ScrollArea } from '@components/ui/scroll-area.tsx';
import React from 'react';

interface CoinCardWrapperProps {
  coins: CoinCardProps[];
}

const CoinCardWrapper: React.FC<CoinCardWrapperProps> = (props) => {
  const { coins } = props;
  return (
    <>
      <h3 className="text-xl font-semibold tracking-tight mb-4">Your Coins</h3>
      <ScrollArea className="h-96 w-[450px]">
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
      </ScrollArea>
    </>
  );
};
export default CoinCardWrapper;
