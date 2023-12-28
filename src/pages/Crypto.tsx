import coins from '@/data/coinValues.ts';
import headers from '@/data/headerItems.tsx';
import Layout from '@/layout/layout.tsx';
import AreaChart from '@components/AreaChart.tsx';
import CoinCardWrapper from '@components/coins/CoinCardWrapper.tsx';
import StatsCardWrapper from '@components/header/StatsCardWrapper.tsx';

const Crypto = () => {
  return (
    <Layout>
      <StatsCardWrapper
        cards={headers.map((header, index) => {
          return {
            key: index,
            name: header.name,
            content: header.content,
            icon: header.icon,
          };
        })}
      />
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        Your Coins
      </h1>
      <CoinCardWrapper
        coins={coins.map((coin, index) => {
          return {
            key: index,
            icon: coin.icon,
            name: coin.name,
            symbol: coin.symbol,
            balance: coin.balance,
            brandColor: coin.brandColor,
          };
        })}
        showBuy={true}
      />
      <AreaChart />
    </Layout>
  );
};
export default Crypto;
