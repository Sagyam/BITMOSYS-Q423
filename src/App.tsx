import Navbar from '@/components/Navbar.tsx';
import CoinCardWrapper from '@components/coins/CoinCardWrapper.tsx';

function App() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Navbar />
      <CoinCardWrapper
        coins={coins.map((coin, index) => {
          return {
            key: index,
            icon: coin.icon,
            name: coin.name,
            symbol: coin.symbol,
            balance: coin.balance,
          };
        })}
      />
    </main>
  );
}

const coins = [
  {
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: 0.5,
  },
  {
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: 0.5,
  },
  {
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: 0.5,
  },
];

export default App;
