import { CheckIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';
import SectionHeading from 'src/components/section-heading/section-heading';

export default function Skills(): ReactNode {
  return (
    <article className="space-y-4 md:col-span-2">
      <SectionHeading
        Icon={CheckIcon}
        level={3}
        text="Skills &amp; Expertise"
      />
    </article>
  );
}
