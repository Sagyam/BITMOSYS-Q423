import router from '@/routes/routes.tsx';
import { ModeToggle } from '@components/ModeToggle.tsx';

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center py-6">
      <span
        onClick={() => router.navigate('/')}
        className="text-2xl font-bold text-grey-800 px-4 hover:text-gray-400 mr-12 cursor-pointer"
      >
        CryptoTraders
      </span>
      <div className="flex">
        <span
          onClick={() => router.navigate('/')}
          className="px-4 hover:text-gray-400 cursor-pointer"
        >
          Home
        </span>
        <span
          onClick={() => router.navigate('/crypto')}
          className="px-4 hover:text-gray-400 cursor-pointer"
        >
          Cryptos
        </span>
      </div>
      <ModeToggle />
    </nav>
  );
};
export default Navbar;
