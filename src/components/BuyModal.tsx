import { buy } from '@/services/buy.ts';
import { Coin } from '@/types/CoinDropdown.ts';
import { Button } from '@components/ui/button.tsx';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form.tsx';
import { Input } from '@components/ui/input.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BuyCoinDto } from 'types/BuyCoinDto.ts';
import * as z from 'zod';

interface BuyModalProps {
  buyingCoinType: Coin;
}

const BuyModal: React.FC<BuyModalProps> = ({ buyingCoinType }) => {
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
          return numericValue >= 1;
        },
        {
          message: 'Please enter a number greater than 0.',
        },
      )
      .transform((data) => parseFloat(data)),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    const formData: BuyCoinDto = {
      buyingCoinSymbol: buyingCoinType.symbol,
      buyingCoinAmount: data.amount,
    };
    await buy(formData)
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Buy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy {buyingCoinType.name}</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Amount of ${buyingCoinType.name}`}
                      type="number"
                      autoComplete="off"
                      min={1}
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
                    Buying...
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
};
export default BuyModal;
