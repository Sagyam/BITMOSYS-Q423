import ExchangeModal from '@/components/ExchangeModal.tsx';
import Navbar from '@/components/Navbar.tsx';
import coins from '@/data/coinValues.ts';
import { ModeToggle } from '@components/ModeToggle.tsx';

function App() {
  return (
    <main className="flex justify-center items-center">
      <Navbar />
      <ExchangeModal sellingCoinType={coins[0]} sellingCoinBalance={100} />
      <ModeToggle />
    </main>
  );
}

export default App;
