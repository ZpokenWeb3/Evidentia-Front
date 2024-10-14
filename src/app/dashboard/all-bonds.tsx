'use client'

import moment from 'moment'
import Image from 'next/image'
import { useMemo } from 'react'
import { allBondHeader } from './constants'
import { Status } from './shared/status'
import { TableAction } from './shared/table-action'
import { useStore } from '../state'
import { userSelector } from '../state/user'
import { DataTable } from '../components/data-table'

export const AllBonds = () => {
	const { userBonds } = useStore(userSelector)

	const data = useMemo(() => {
		return userBonds.map(i => {
			return {
				...i,
				country: (
					<div className='flex items-center justify-center'>
						<Image
							alt='Flag'
							src={'/' + i.country + '.png'}
							width={36}
							height={27}
						/>
						<p>{i.country}</p>
					</div>
				),
				APY: <p>{i.APY}%</p>,
				expirationTimestamp: (
					<p>{moment(i.expirationTimestamp * 1000).format('DD.MM.YYYY')}</p>
				),
				status: (
					<div className='flex items-center justify-center'>
						<Status status={i.status} />
					</div>
				),
				action: <TableAction bond={i} />,
			}
		})
	}, [userBonds])

	return <DataTable headers={allBondHeader} data={data} />
}
