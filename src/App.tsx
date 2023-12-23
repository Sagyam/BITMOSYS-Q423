import ExchangeModal from '@/components/ExchangeModal.tsx';
import Navbar from '@/components/Navbar.tsx';
import coins from '@/data/coinValues.ts';

function App() {
  return (
    <main className="flex justify-center items-center">
      <Navbar />
      <ExchangeModal sellingCoinType={coins[0]} />
    </main>
  );
}

export default App;
