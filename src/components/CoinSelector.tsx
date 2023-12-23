import coins from '@/data/coinValues.ts';
import { Button } from '@components/ui/button.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@components/ui/command.tsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover.tsx';
import { cn } from '@lib/utils.ts';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { CoinDropdownItem } from 'types/CoinDropdown.ts';

interface CoinSelectorProps {
  filterCoin: CoinDropdownItem;
  onChange: (value: string) => void;
}

const CoinSelector = ({ onChange, filterCoin }: CoinSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const otherCoins = coins.filter((coin) => coin.value !== filterCoin.value);

  const coinWithIcon = (
    <>
      <img
        src={otherCoins.find((coin) => coin.value === value)?.icon}
        className="w-4 h-4"
      />
      <span className="ml-2">
        {otherCoins.find((coin) => coin.value === value)?.label}
      </span>
    </>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? coinWithIcon : 'Select Coin...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search coins..." />
          <CommandEmpty>No coin found.</CommandEmpty>
          <CommandGroup>
            {otherCoins.map((coin) => (
              <CommandItem
                key={coin.value}
                value={coin.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  setOpen(false);
                  onChange(currentValue);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === coin.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {coin.icon && <img src={coin.icon} className="w-4 h-4" />}
                <span className="ml-2">{coin.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default CoinSelector;
