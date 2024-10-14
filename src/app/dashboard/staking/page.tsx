import { PagePath } from '@/app/config/nav';
import { dashboardTabs } from '../constants';
import { TabWrapper } from '../shared/tab-wrapper';
import { StakeData } from './stake-data';
import { StakeUnstake } from './stake-unstake';

export default function Staking() {
  return (
    <div className='flex min-h-full flex-col gap-3 pb-6'>
      <div className='flex grow flex-col rounded bg-background-secondary pb-7 pt-6 shadow-[0px_4px_4px_0px_#00000040]'>
        <TabWrapper
          activeTab={PagePath.Staking}
          tabs={dashboardTabs}
          className='border-b-[0.5px] border-border/40 px-6 pb-[18px]'
        />
        <div className='mb-10 flex flex-col px-6 pt-6'>
          <StakeData />
        </div>
        <div className='grid grid-cols-3 gap-[22px] px-6'>
          <StakeUnstake />
        </div>
      </div>
    </div>
  );
}
