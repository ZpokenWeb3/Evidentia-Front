import { ReactNode } from 'react';
import { Input, InputProps } from './ui/input';
import { Button } from './ui/button';

interface InputIconProps extends InputProps {
  icon: ReactNode;
  label?: string;
  maxValue?: {
    label: string;
    onClick: () => void;
  };
}

export const InputIcon = ({ icon, label, maxValue, ...props }: InputIconProps) => {
  return (
    <div className='flex w-full flex-col gap-1'>
      {label && <p className='pb-1 text-base font-semibold'>{label}</p>}
      <div className='flex h-11 w-full items-center gap-3 rounded-lg border border-input-border bg-input py-[10px] pl-3 pr-[15px]'>
        {icon}
        <Input variant='transparent' {...props} />
        {maxValue && (
          <Button
            className='w-[52px] font-semibold'
            variant='destructive'
            size='sm'
            onClick={maxValue.onClick}
          >
            max
          </Button>
        )}
      </div>
      {maxValue && <p className='text-[12px] font-normal leading-[18px]'>{maxValue.label}</p>}
    </div>
  );
};
