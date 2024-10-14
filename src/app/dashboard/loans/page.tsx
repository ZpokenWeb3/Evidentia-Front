import { dashboardTabs } from '../constants';
import { TabWrapper } from '../shared/tab-wrapper';
import { LoansData } from './loans-data';
import { BorrowModal } from './borrow-modal';
import { PagePath } from '@/app/config/nav';
import { AllLoans } from './all-loans';
import { RepayModal } from './repay-modal';

export default function Loans() {
  return (
    <div className='flex min-h-full flex-col gap-3 pb-6'>
      <div className='flex grow flex-col rounded bg-background-secondary pb-7 pt-6 shadow-[0px_4px_4px_0px_#00000040]'>
        <TabWrapper
          activeTab={PagePath.Loans}
          tabs={dashboardTabs}
          className='border-b-[0.5px] border-border/40 px-6 pb-[18px]'
        />
        <div className='flex flex-col px-6 pb-5 pt-6'>
          <LoansData />
          <p className='pb-3 pt-10 text-lg font-bold leading-7'>Active Loans</p>
          <div className='flex items-center justify-between pb-3'>
            <div />
            <div className='flex items-center gap-2'>
              <RepayModal />
              <BorrowModal />
            </div>
          </div>
        </div>
        <AllLoans />
      </div>
    </div>
  );
}
