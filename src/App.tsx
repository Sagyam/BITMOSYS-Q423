import Navbar from '@/components/Navbar.tsx';
import coins from '@/data/coinValues.ts';
import BuyModal from '@components/BuyModal.tsx';
import { ModeToggle } from '@components/ModeToggle.tsx';

function App() {
  return (
    <main className="flex justify-center items-center">
      <Navbar />
      {/* <ExchangeModal sellingCoinType={coins[0]} sellingCoinBalance={100} /> */}
      <BuyModal buyingCoinType={coins[0]} />
      <ModeToggle />
    </main>
  );
}

export default App;
