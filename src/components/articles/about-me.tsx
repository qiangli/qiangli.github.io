import { personalInfo } from '@content';
import { UserIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';
import Prose from 'src/components/prose/prose';
import SectionHeading from 'src/components/section-heading/section-heading';

export default function AboutMe(): ReactNode {
  return (
    <article className="space-y-4">
      <SectionHeading Icon={UserIcon} level={3} text="About" />
      <Prose html={personalInfo.body.html} />
    </article>
  );
}
