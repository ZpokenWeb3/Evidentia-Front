'use client';

import { ReactElement, useState } from 'react';
import { cn } from '../lib/utils';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { TxStatus } from '../types/tx';
import { BadgeCheck, ChartCandlestick, CircleX } from 'lucide-react';
import { Button } from './ui/button';

const Loader = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
      <radialGradient
        id='a1'
        cx='.66'
        fx='.66'
        cy='.3125'
        fy='.3125'
        gradientTransform='scale(1.5)'
      >
        <stop offset='0' stop-color='#232C56'></stop>
        <stop offset='.3' stop-color='#232C56' stop-opacity='.9'></stop>
        <stop offset='.6' stop-color='#232C56' stop-opacity='.6'></stop>
        <stop offset='.8' stop-color='#232C56' stop-opacity='.3'></stop>
        <stop offset='1' stop-color='#232C56' stop-opacity='0'></stop>
      </radialGradient>
      <circle
        transform-origin='center'
        fill='none'
        stroke='url(#a1)'
        stroke-width='15'
        stroke-linecap='round'
        stroke-dasharray='200 1000'
        stroke-dashoffset='0'
        cx='100'
        cy='100'
        r='70'
      >
        <animateTransform
          type='rotate'
          attributeName='transform'
          calcMode='spline'
          dur='2'
          values='360;0'
          keyTimes='0;1'
          keySplines='0 0 1 1'
          repeatCount='indefinite'
        ></animateTransform>
      </circle>
      <circle
        transform-origin='center'
        fill='none'
        opacity='.2'
        stroke='#232C56'
        stroke-width='15'
        stroke-linecap='round'
        cx='100'
        cy='100'
        r='70'
      ></circle>
    </svg>
  );
};

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
  const [status, setStatus] = useState<TxStatus | undefined>(TxStatus.PENDING);

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
