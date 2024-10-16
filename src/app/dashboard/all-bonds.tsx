'use client';

import moment from 'moment';
import Image from 'next/image';
import { useMemo } from 'react';
import { DataTable } from '../components/data-table';
import { formatNumber } from '../lib/formatter';
import { useStore } from '../state';
import { userSelector } from '../state/user';
import { BondTableActions } from './bond-table-actions';
import { allBondHeader } from './constants';

export const AllBonds = () => {
  const { userBonds } = useStore(userSelector);

  const data = useMemo(() => {
    return userBonds.map(i => {
      return {
        ...i,
        country: (
          <div className='flex items-center justify-center'>
            <Image alt='Flag' src={'/' + i.country + '.png'} width={36} height={27} />
            <p>{i.country}</p>
          </div>
        ),
        APY: <p>{i.APY}%</p>,
        expirationTimestamp: <p>{moment(i.expirationTimestamp * 1000).format('DD.MM.YYYY')}</p>,
        action: <BondTableActions bond={i} />,
        minted: <p>{formatNumber(i.minted)}</p>,
        availableToMint: <p>{formatNumber(i.availableToMint)}</p>,
        staked: <p>{formatNumber(i.staked)}</p>,
      };
    });
  }, [userBonds]);

  return <DataTable headers={allBondHeader} data={data} />;
};
