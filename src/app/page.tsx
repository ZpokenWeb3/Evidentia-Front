import { redirect } from 'next/navigation'
import { PagePath } from './config/nav'

export default function Home() {
	redirect(PagePath.Dashboard)
}
