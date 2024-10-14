import { Tab, Tabs } from '@/app/components/tabs';
import { PagePath } from '@/app/config/nav';
import { cn } from '@/app/lib/utils';

interface TabWrapperProps {
  activeTab: PagePath;
  tabs: Tab[];
  className?: string;
}

export const TabWrapper = ({ activeTab, tabs, className }: TabWrapperProps) => {
  return (
    <div className={cn(className)}>
      <Tabs tabs={tabs} activeTab={activeTab} />
    </div>
  );
};
