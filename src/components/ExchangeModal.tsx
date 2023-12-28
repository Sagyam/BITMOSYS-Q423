import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import coins from '@/data/coinValues.ts';
import { exchange } from '@/services/exchnage.ts';
import { Coin } from '@/types/CoinDropdown.ts';
import TooltipWrapper from '@components/TooltipWrapper.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form.tsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover.tsx';
import { Progress } from '@components/ui/progress.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils.ts';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CoinExchangeDto } from 'types/CoinExchangeDto.ts';
import * as z from 'zod';

interface ExchangeModalProps {
  sellingCoinType: Coin;
  sellingCoinBalance: number;
}

function ExchangeModal({
  sellingCoinType,
  sellingCoinBalance,
}: ExchangeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FormSchema = z.object({
    amount: z
      .string()
      .refine(
        (data) => {
          const numericValue = parseFloat(data);
          return !isNaN(numericValue);
        },
        {
          message: 'Please enter a valid number for the amount.',
        },
      )
      .refine(
        (data) => {
          const numericValue = parseFloat(data);
          return numericValue >= 1 && numericValue <= sellingCoinBalance;
        },
        {
          message: 'You do not have enough coins to exchange.',
        },
      )
      .transform((data) => parseFloat(data)),

    buyingCoinType: z
      .string({
        required_error: 'Please select an coin to exchange.',
      })
      .min(1, {
        message: 'Please select an coin to exchange.',
      }),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    const formData: CoinExchangeDto = {
      sellingCoinSymbol: sellingCoinType.symbol,
      buyingCoinSymbol: data.buyingCoinType,
      sellingCoinAmount: data.amount,
    };
    await exchange(formData)
      .then(() => {
        //toast.success(res.message);
      })
      .catch(() => {
        //toast.error(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
        toast.info('This feature wii be available soon.');
      });
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: undefined,
      buyingCoinType: undefined,
    },
  });

  const otherCoins = coins.filter(
    (coin) => coin.symbol !== sellingCoinType.symbol,
  );

  const getRemainingAmount = (amount: number) => {
    if (amount < 0) return sellingCoinBalance;
    if (amount > sellingCoinBalance) return 0;
    if (!amount) return sellingCoinBalance;
    return sellingCoinBalance - amount;
  };

  const getRemainingPercentage = (amount: number) => {
    if (amount < 0) return 0;
    if (amount > sellingCoinBalance) return 0;
    if (!amount) return 0;
    const percentage = (amount / sellingCoinBalance) * 100;
    return 100 - percentage;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Exchange</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exchange {sellingCoinType.name} with</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="buyingCoinType"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Coin to Buy</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value && (
                            <img
                              src={
                                otherCoins.find(
                                  (coin) => coin.symbol === field.value,
                                )?.icon
                              }
                              className="w-4 h-4 mr-2"
                            />
                          )}
                          {field.value
                            ? otherCoins.find(
                                (coin) => coin.symbol === field.value,
                              )?.name
                            : 'Select Coin'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search coins..." />
                        <CommandEmpty>No such coin</CommandEmpty>
                        <CommandGroup>
                          {otherCoins.map((coin) => (
                            <CommandItem
                              value={coin.name}
                              key={coin.symbol}
                              onSelect={() => {
                                form.setValue('buyingCoinType', coin.symbol);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  coin.symbol === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {
                                <>
                                  <img
                                    src={coin.icon}
                                    className="w-4 h-4 mr-2"
                                  />
                                  <span>{coin.name}</span>
                                </>
                              }
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount of {sellingCoinType.name}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Amount of ${sellingCoinType.name}`}
                      type="number"
                      autoComplete="off"
                      min={1}
                      max={sellingCoinBalance}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TooltipWrapper
              trigger={
                <Progress
                  value={getRemainingPercentage(form.watch('amount'))}
                />
              }
              content={`You will have ${getRemainingAmount(
                form.watch('amount'),
              )} ${sellingCoinType.name} left`}
            />
            <DialogFooter>
              <Button
                className="w-full mt-4"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <>
                    {' '}
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exchanging...
                  </>
                )}
                {!isSubmitting && 'Exchange'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
        {/* End Form */}
      </DialogContent>
    </Dialog>
  );
}

export default ExchangeModal;
