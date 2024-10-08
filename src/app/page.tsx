import { redirect } from 'next/navigation'
import { PagePath } from './config/nav'

export default function Hone() {
	redirect(PagePath.Dashboard)
}
