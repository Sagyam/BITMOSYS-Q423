import { ModeToggle } from '@components/ModeToggle.tsx';

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center py-6">
      <a
        href="/"
        className="text-2xl font-bold text-grey-800 px-4 hover:text-gray-400 mr-12"
      >
        CryptoTraders
      </a>
      <div className="flex">
        <a href="/" className="px-4 hover:text-gray-400">
          Home
        </a>
        <a href="/crypto" className="px-4 hover:text-gray-400">
          Cryptos
        </a>
      </div>
      <ModeToggle />
    </nav>
  );
};
export default Navbar;
