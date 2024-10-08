import { ReactNode } from 'react'
import { cn } from '../lib/utils'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

export interface TableHeader {
	key: string
	value: string
}

interface DataTableProps {
	headers: TableHeader[]
	data: Record<string, ReactNode | string>[]
}

export const DataTable = ({ headers, data }: DataTableProps) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{headers.map((i, index, arr) => (
						<TableHead
							key={i.key}
							className={cn(
								index === 0 && 'text-left',
								index === arr.length - 1 && 'text-right'
							)}
						>
							{i.value}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((i, index) => {
					return (
						<TableRow
							key={index}
							className={cn((index === 0 || index % 2 === 0) && 'bg-card')}
						>
							{headers.map((h, ind, arr) => (
								<TableCell
									key={index.toString() + ind.toString()}
									className={cn(
										ind === 0 && 'text-left',
										ind === arr.length - 1 && 'text-right'
									)}
								>
									{i[h.key]}
								</TableCell>
							))}
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}
