'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Connect } from './connect';
import { navLinks, PagePath } from '../config/nav';

export const Header = () => {
  const pathname = usePathname() as PagePath;

  const label = useMemo(() => {
    const currentPage = [
      ...navLinks,
      {
        label: 'KYC Verificaton',
        href: PagePath.KYC,
      },
    ].find(link => link.href === pathname);

    return currentPage ? currentPage.label : 'Dashboard';
  }, [pathname]);

  return (
    <header className='flex min-h-[60px] items-center justify-between bg-header pl-4 pr-[30px]'>
      <h2 className='text-left text-2xl font-semibold leading-7'>{label}</h2>
      <Connect />
    </header>
  );
};
