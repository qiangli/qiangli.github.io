'use client';

import { BriefcaseIcon } from '@heroicons/react/24/solid';
import { Fragment, ReactNode, useEffect } from 'react';
import Separator from 'src/components/articles/separator';
import SectionHeading from 'src/components/section-heading/section-heading';
import { sortedProfessionalExperiences } from 'src/helpers/utilities';
import ProfessionalItem from './professional-item';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Professional(): ReactNode {
  useEffect(() => {
    AOS.init();
  });

  return (
    <article className="border-neutral-6 bg-neutral-2 rounded-xl border py-12 shadow-md">
      <div className="container space-y-8">
        <SectionHeading
          data-aos="fade-center"
          data-aos-duration="600"
          className="justify-center"
          Icon={BriefcaseIcon}
          level={2}
          text="Professional Experience"
        />
        <div>
          {sortedProfessionalExperiences.map((professional) => (
            <Fragment key={professional._id}>
              <ProfessionalItem {...professional} />
              <Separator />
            </Fragment>
          ))}
        </div>
      </div>
    </article>
  );
}
