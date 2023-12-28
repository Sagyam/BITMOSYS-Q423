import CoinCard, { CoinCardProps } from '@components/coins/CoinCard.tsx';
import { ScrollArea } from '@components/ui/scroll-area.tsx';
import React from 'react';

interface CoinCardWrapperProps {
  coins: CoinCardProps[];
  showBuy?: boolean;
  showExchange?: boolean;
}

const CoinCardWrapper: React.FC<CoinCardWrapperProps> = (props) => {
  const { coins } = props;
  return (
    <>
      <ScrollArea className="h-[300px] w-[450px] my-4">
        {coins.map((coin) => {
          return (
            <CoinCard
              key={coin.key}
              icon={coin.icon}
              name={coin.name}
              symbol={coin.symbol}
              balance={coin.balance}
              brandColor={coin.brandColor}
              showBuy={props.showBuy || false}
              showExchange={props.showExchange || false}
            />
          );
        })}
      </ScrollArea>
    </>
  );
};
export default CoinCardWrapper;
