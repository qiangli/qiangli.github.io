'use client';

import { PaintBrushIcon } from '@heroicons/react/24/solid';
import { Fragment, ReactNode, useEffect } from 'react';
import Separator from 'src/components/articles/separator';
import SectionHeading from 'src/components/section-heading/section-heading';
import { sortedPersonalProjects } from 'src/helpers/utilities';
import PersonalItem from './personal-item';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PersonalProjects(): ReactNode {
  useEffect(() => {
    AOS.init();
  });

  return (
    <article className="border-neutral-6 bg-neutral-2 rounded-xl border py-12 shadow-md print:break-before-page">
      <div className="container space-y-8">
        <SectionHeading
          data-aos="fade-center"
          data-aos-duration="600"
          className="justify-center"
          Icon={PaintBrushIcon}
          level={2}
          text="Personal Projects"
        />
        <div>
          {sortedPersonalProjects.map((item) => (
            <Fragment key={item._id}>
              <PersonalItem {...item} />
              <Separator />
            </Fragment>
          ))}
        </div>
      </div>
    </article>
  );
}
