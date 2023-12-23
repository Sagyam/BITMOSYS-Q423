import CoinSelector from '@/components/CoinSelector.tsx';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CoinDropdownItem } from 'types/CoinDropdown.ts';

interface ExchangeModalProps {
  sellingCoinType: CoinDropdownItem;
}

function ExchangeModal({ sellingCoinType }: ExchangeModalProps) {
  const handleOnSelect = (value: string) => {
    console.log(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Buy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exchange {sellingCoinType.label} with</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <CoinSelector
              onChange={handleOnSelect}
              filterCoin={sellingCoinType}
            />
          </div>
          <div className="grid items-center gap-4">
            <Input
              id="amount"
              placeholder={`Amount of ${sellingCoinType.label}`}
              type="number"
              min="0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" type="submit">
            Exchange
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ExchangeModal;
