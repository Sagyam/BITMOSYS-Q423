import coins from '@/data/coinValues.ts';
import TooltipWrapper from '@components/TooltipWrapper.tsx';
import { useEffect, useState } from 'react';

const AreaChart = () => {
  const [totalBalance, setTotalBalance] = useState<number>(0);

  useEffect(() => {
    // get total balance
    const totalBalance = coins.reduce((acc, coin) => {
      return acc + coin.balance;
    }, 0);
    setTotalBalance(totalBalance);
    console.log(totalBalance);
  }, []);

  return (
    <>
      <h1 className="text-2xl my-4 font-semibold leading-none tracking-tight">
        Distribution of your coins
      </h1>
      <div className="block w-[450px] h-8">
        {coins.map((coin) => (
          <TooltipWrapper
            trigger={
              <div
                key={coin.name}
                className="inline-block hover:opacity-80 border-2 rounded-full"
                style={{
                  width: `${(coin.balance / totalBalance) * 100}%`,
                  height: '100%',
                  backgroundColor: coin.brandColor,
                }}
              />
            }
            content={`${coin.name}: ${Math.round(
              (coin.balance / totalBalance) * 100,
            )}%`}
          />
        ))}
      </div>
    </>
  );
};
export default AreaChart;
