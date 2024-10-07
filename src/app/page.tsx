import { redirect } from 'next/navigation'
import { PagePath } from './components/header'

export default function Hone() {
	redirect(PagePath.Dashboard)
}
