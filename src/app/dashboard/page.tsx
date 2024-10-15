import { AllBonds } from './all-bonds';
import { BondsData } from './bonds-data';
import { dashboardTabs } from './constants';
import { TabWrapper } from './shared/tab-wrapper';
import { PagePath } from '../config/nav';

export default function Dashboard() {
  return (
    <div className='flex min-h-full flex-col gap-3 pb-6'>
      <div className='flex grow flex-col rounded bg-background-secondary pb-7 pt-6 shadow-[0px_4px_4px_0px_#00000040]'>
        <TabWrapper
          activeTab={PagePath.Dashboard}
          tabs={dashboardTabs}
          className='border-b-[0.5px] border-border/40 px-6 pb-[18px]'
        />
        <div className='flex flex-col px-6 pb-5 pt-6'>
          <BondsData />
          <p className='pb-3 pt-10 text-lg font-bold leading-7'>Bonds</p>
        </div>
        <AllBonds />
      </div>
    </div>
  );
}
