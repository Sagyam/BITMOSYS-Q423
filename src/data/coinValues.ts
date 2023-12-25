import { Coin } from 'types/CoinDropdown.ts';

const coins: Coin[] = [
  {
    name: 'Bitcoin',
    symbol: 'btc',
    balance: 10,
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029',
    brandColor: '#f7931a',
  },
  {
    name: 'Ethereum',
    symbol: 'eth',
    balance: 20,
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029',
    brandColor: '#627eea',
  },
  {
    name: 'Dogecoin',
    symbol: 'doge',
    balance: 30,
    icon: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=029',
    brandColor: '#c3a634',
  },
  {
    name: 'Litecoin',
    symbol: 'ltc',
    balance: 15,
    icon: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=029',
    brandColor: '#345d9d',
  },
  {
    name: 'Monero',
    symbol: 'xmr',
    balance: 22,
    icon: 'https://cryptologos.cc/logos/monero-xmr-logo.svg?v=029',
    brandColor: '#ff6600',
  },
];

export default coins;
