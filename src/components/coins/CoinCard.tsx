import ExchangeModal from '@components/ExchangeModal.tsx';
import React from 'react';

export interface CoinCardProps {
  key: number;
  icon: string;
  name: string;
  symbol: string;
  balance: number;
}

const CoinCard: React.FC<CoinCardProps> = (props) => {
  const { icon, name, symbol, balance } = props;
  return (
    <div className="flex items-center justify-between rounded-lg bg-secondary p-4 mb-4">
      <div className="flex items-center">
        <img src={icon} alt={name} className="w-8 h-8 mr-4" />
        <span>{name}</span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold mr-4">{balance}</span>
        <ExchangeModal
          sellingCoinType={{ label: name, value: symbol, icon }}
          sellingCoinBalance={balance}
        />
      </div>
    </div>
  );
};
export default CoinCard;
