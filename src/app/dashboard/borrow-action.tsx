'use client';

import { useState } from 'react';
import { Button } from '../components/ui/button';
import { BorrowModal } from './loans/borrow-modal';

export const BorrowAction = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button variant='secondary' className='w-[151px]' onClick={() => setOpen(true)}>
        Borrow
      </Button>
      <BorrowModal open={open} toggleOpen={val => setOpen(val)} />
    </>
  );
};
