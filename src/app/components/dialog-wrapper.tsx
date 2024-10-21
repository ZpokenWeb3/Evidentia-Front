'use client';

import { ReactElement, useState } from 'react';
import { cn } from '../lib/utils';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { TxStatus } from '../types/tx';
import { BadgeCheck, ChartCandlestick, CircleX } from 'lucide-react';
import { Button } from './ui/button';

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
            <Loader />
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

const Loader = () => {
  return (
    <svg
      width='106'
      height='106'
      viewBox='0 0 106 106'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M97.1666 53.0002C97.1666 77.3927 77.3925 97.1668 52.9999 97.1668C28.6073 97.1668 8.83325 77.3927 8.83325 53.0002C8.83325 28.6076 28.6073 8.8335 52.9999 8.8335C77.3925 8.8335 97.1666 28.6076 97.1666 53.0002ZM24.2916 53.0002C24.2916 68.8553 37.1447 81.7085 52.9999 81.7085C68.8551 81.7085 81.7082 68.8553 81.7082 53.0002C81.7082 37.145 68.8551 24.2918 52.9999 24.2918C37.1447 24.2918 24.2916 37.145 24.2916 53.0002Z'
        fill='url(#paint0_angular_380_2839)'
      />
      <path
        d='M52.9999 8.83318C58.8 8.83318 64.5432 9.97558 69.9018 12.1952C75.2603 14.4147 80.1292 17.668 84.2305 21.7693C88.3317 25.8705 91.585 30.7394 93.8046 36.098C96.0242 41.4565 97.1666 47.1998 97.1666 52.9998L81.7082 52.9998C81.7082 49.2298 80.9657 45.4967 79.5229 42.0136C78.0802 38.5306 75.9656 35.3658 73.2998 32.7C70.634 30.0342 67.4692 27.9195 63.9861 26.4768C60.5031 25.0341 56.7699 24.2915 52.9999 24.2915L52.9999 8.83318Z'
        fill='url(#paint1_angular_380_2839)'
      />
      <defs>
        <radialGradient
          id='paint0_angular_380_2839'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(52.9999 53.0002) scale(44.1667)'
        >
          <stop offset='0.9999' stop-color='#232C56' />
          <stop offset='1' stop-color='#212E6B' stop-opacity='0' />
        </radialGradient>
        <radialGradient
          id='paint1_angular_380_2839'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(52.9999 52.9998) rotate(-90) scale(44.1667)'
        >
          <stop offset='0.9999' stop-color='#232C56' />
          <stop offset='1' stop-color='#212E6B' stop-opacity='0' />
        </radialGradient>
      </defs>
    </svg>
  );
};
