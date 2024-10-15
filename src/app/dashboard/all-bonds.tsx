'use client';

import moment from 'moment';
import Image from 'next/image';
import { useMemo } from 'react';
import { allBondHeader } from './constants';
import { TableAction } from './shared/table-action';
import { useStore } from '../state';
import { userSelector } from '../state/user';
import { DataTable } from '../components/data-table';

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
        action: <TableAction bond={i} />,
        minted: <p>{i.minted.toString()}</p>,
        availableToMint: <p>{i.availableToMint.toString()}</p>,
        staked: <p>{i.staked.toString()}</p>,
      };
    });
  }, [userBonds]);

  return <DataTable headers={allBondHeader} data={data} />;
};
