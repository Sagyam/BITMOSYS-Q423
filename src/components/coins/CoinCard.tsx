import BuyModal from '@components/BuyModal.tsx';
import ExchangeModal from '@components/ExchangeModal.tsx';
import React from 'react';

export interface CoinCardProps {
  key: number;
  icon: string;
  name: string;
  symbol: string;
  balance: number;
  showBuy?: boolean;
  showExchange?: boolean;
}

const CoinCard: React.FC<CoinCardProps> = (props) => {
  const { icon, name, symbol, balance } = props;
  const { showBuy, showExchange } = props;
  return (
    <div className="flex items-center justify-between rounded-lg bg-secondary px-8 py-4 mb-4">
      <div className="flex items-center justify-end">
        <img src={icon} alt={name} className="w-8 h-8 mr-4" />
        <span>{name}</span>
      </div>
      <span className="font-semibold">{balance}</span>

      {showExchange && (
        <ExchangeModal
          sellingCoinType={{ name, symbol, icon, balance }}
          sellingCoinBalance={balance}
        />
      )}
      {showBuy && <BuyModal buyingCoinType={{ name, symbol, icon, balance }} />}
    </div>
  );
};
export default CoinCard;
