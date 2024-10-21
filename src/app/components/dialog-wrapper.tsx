'use client';

import { ReactElement, useState } from 'react';
import { cn } from '../lib/utils';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { TxStatus } from '../types/tx';
import { BadgeCheck, ChartCandlestick, CircleX } from 'lucide-react';
import { Button } from './ui/button';
import { Loader } from './loader';

interface DialogWrapperProps {
  open: boolean;
  children: ReactElement;
  className?: string;
  disabled: boolean;
  title: string;
  handleTx: () => Promise<void>;
  toggleOpen: (val: boolean) => void;
}

export const DialogWrapper = ({
  open,
  className,
  children,
  disabled,
  title,
  handleTx,
  toggleOpen,
}: DialogWrapperProps) => {
  const [status, setStatus] = useState<TxStatus | undefined>();

  const action = async () => {
    try {
      setStatus(TxStatus.PENDING);
      await handleTx();
      setStatus(TxStatus.SUCCESS);
    } catch (error) {
      console.log(title, error);
      setStatus(TxStatus.ERROR);
    }
  };

  return (
    <Dialog open={open} onOpenChange={open => toggleOpen(open)}>
      <DialogContent className={cn('w-[438px]', status && 'h-[260px]', className)}>
        {!status && (
          <>
            <DialogHeader className='flex flex-row items-center gap-2'>
              <div>
                <ChartCandlestick className='size-6 stroke-2 text-icon' />
              </div>
              <DialogTitle className='text-xl font-medium'>{title}</DialogTitle>
            </DialogHeader>
            {children}
            <DialogFooter>
              <Button className='w-[136px]' variant='destructive' onClick={() => toggleOpen(false)}>
                Cancel
              </Button>
              <Button
                className='w-[136px]'
                onClick={() => {
                  void action();
                }}
                disabled={disabled}
              >
                Submit
              </Button>
            </DialogFooter>
          </>
        )}
        {status === TxStatus.PENDING && (
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='size-[88px]'>
              <Loader />
            </div>
            <p className='mt-2 text-base font-semibold text-[#161822]'>Transaction is processing</p>
            <p className='text-sm font-medium text-input-icon'>Please wait...</p>
          </div>
        )}
        {status === TxStatus.SUCCESS && (
          <div className='flex flex-col items-center justify-center gap-4'>
            <div>
              <BadgeCheck className='h-[96px] w-[106px] fill-status-success stroke-background' />
            </div>
            <p className='text-base font-semibold text-[#161822]'>Transaction completed!</p>
            <Button
              className='w-[136px]'
              onClick={() => {
                toggleOpen(false);
                setStatus(undefined);
              }}
            >
              OK
            </Button>
          </div>
        )}
        {status === TxStatus.ERROR && (
          <div className='flex flex-col items-center justify-center gap-4'>
            <div>
              <CircleX className='h-[96px] w-[106px] fill-status-rejected stroke-background' />
            </div>
            <p className='text-base font-semibold text-[#161822]'>Transaction failed</p>
            <Button
              className='w-[136px]'
              onClick={() => {
                void action();
              }}
            >
              Try again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
