'use client';

import { ProfessionalExperience } from '@content';
import { ReactNode, useEffect } from 'react';
import { Heading } from 'src/components/heading/heading';
import Prose from 'src/components/prose/prose';
import { cn } from 'src/helpers/utilities';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '@styles/professional.module.css';

export default function ProfessionalItem({
  body,
  organization,
  titles,
  tags,
}: ProfessionalExperience): ReactNode {
  useEffect(() => {
    AOS.init();
  });

  return (
    <article className="space-y-4">
      <Heading
        data-aos="fade-left"
        data-aos-duration="600"
        className="text-balance"
        level={3}
      >
        <br />
        {organization}
      </Heading>

      <ul>
        {titles.map((title) => (
          <li className="group flex gap-6" key={title.title}>
            <div
              className={cn('flex flex-col items-center gap-[6px]', {
                hidden: titles.length === 1,
              })}
            >
              <span className="bg-accent-11 mt-[6px] block h-2 w-2 flex-none rounded-full" />
              <div className="bg-accent-6 h-full w-[2px] rounded-full group-last:hidden" />
            </div>

            <div className="space-y-3 pb-4 group-last:pb-0">
              <div className="text-lg leading-none font-bold">
                {title.title}
              </div>
              <div className="text-neutral-11 text-sm leading-none tracking-wide">
                {title.startDate}–{title.endDate ?? 'Current'}
              </div>
              {title.description && (
                <p className="text-sm">{title.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <Prose html={body.html} />

      <div className={styles.tagsContainer}>
        {(tags ?? []).map((tag) => (
          <span className={styles.tag} key={tag}>
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
