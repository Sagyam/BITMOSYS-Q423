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
import { CoinDropdownItem } from '@/types/CoinDropdown.ts';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@lib/utils.ts';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CoinExchangeDto } from 'types/CoinExchangeDto.ts';
import * as z from 'zod';

interface ExchangeModalProps {
  sellingCoinType: CoinDropdownItem;
}

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
        return numericValue >= 1 && numericValue <= 1000000;
      },
      {
        message: 'Amount must be positive and less than 1,000,000.',
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

function ExchangeModal({ sellingCoinType }: ExchangeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    const formData: CoinExchangeDto = {
      sellingCoinSymbol: sellingCoinType.value,
      buyingCoinSymbol: data.buyingCoinType,
      sellingCoinAmount: data.amount,
    };
    await exchange(formData)
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 1,
      buyingCoinType: undefined,
    },
  });

  const otherCoins = coins.filter(
    (coin) => coin.value !== sellingCoinType.value,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Buy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exchange {sellingCoinType.label} with</DialogTitle>
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
                                  (coin) => coin.value === field.value,
                                )?.icon
                              }
                              className="w-4 h-4 mr-2"
                            />
                          )}
                          {field.value
                            ? otherCoins.find(
                                (coin) => coin.value === field.value,
                              )?.label
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
                              value={coin.label}
                              key={coin.value}
                              onSelect={() => {
                                form.setValue('buyingCoinType', coin.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  coin.value === field.value
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
                                  <span>{coin.label}</span>
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
                  <FormLabel>Amount of {sellingCoinType.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Amount of ${sellingCoinType.label}`}
                      type="number"
                      autoComplete="off"
                      min={1}
                      max={1000000}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
