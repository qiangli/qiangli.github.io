'use client';

import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { Fragment, ReactNode, useEffect } from 'react';
import AchievementItem from 'src/components/articles/achievement-item';
import Separator from 'src/components/articles/separator';
import SectionHeading from 'src/components/section-heading/section-heading';
import { sortedAchievements } from 'src/helpers/utilities';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Heading } from 'src/components/heading/heading';

export default function Achievements(): ReactNode {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    AOS.init();
  });

  const isLight = resolvedTheme === 'light';
  const lightStyle = { backgroundColor: 'grey' };
  const darkStyle = { backgroundColor: 'white' };

  return (
    <>
      <article className="border-neutral-6 bg-neutral-2 rounded-xl border py-12 shadow-md print:break-before-page">
        <div className="container space-y-8">
          <SectionHeading
            data-aos="fade-center"
            data-aos-duration="600"
            className="justify-center"
            Icon={AcademicCapIcon}
            level={2}
            text="Education"
          />
          <div>
            <Fragment key={'nus'}>
              <article className="space-y-4">
                <div className="space-y-1">
                  <Heading className="text-balance" level={3}>
                    <br />
                    M.Sc, Information Systems and Computer Science
                  </Heading>
                  <div className="text-neutral-11 flex items-center gap-2 text-lg font-semibold tracking-wide">
                    <a
                      href="https://nus.edu.sg/"
                      title="National University of Singapore, Singapore"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex items-center space-x-4 p-2">
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            ...(isLight ? darkStyle : {}),
                          }}
                        >
                          <Image
                            src="/images/nus-logo.png"
                            alt="NUS Logo"
                            unoptimized
                          />
                        </div>
                        <div>
                          <h3>National University of Singapore</h3>
                          <p>Singapore</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </article>
              <Separator />
            </Fragment>
            <Fragment key={'whu'}>
              <article className="space-y-4">
                <div className="space-y-1">
                  <Heading className="text-balance" level={3}>
                    <br />
                    B.Sc M.Sc, Information Science
                  </Heading>
                  <div className="text-neutral-11 flex items-center gap-2 text-lg font-semibold tracking-wide">
                    <a
                      href="https://en.whu.edu.cn/"
                      title="Wuhan University, China"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex items-center space-x-4 p-2">
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            ...(isLight ? lightStyle : {}),
                          }}
                        >
                          <Image
                            src="/images/whu-logo.png"
                            alt="Wuhan University Logo"
                            unoptimized
                          />
                        </div>
                        <div>
                          <h3>Wuhan University</h3>
                          <p>China</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </article>
              <Separator />
            </Fragment>
          </div>
        </div>
      </article>

      <article className="border-neutral-6 bg-neutral-2 rounded-xl border py-12 shadow-md">
        <div className="container space-y-8">
          <SectionHeading
            data-aos="fade-center"
            data-aos-duration="600"
            className="justify-center"
            Icon={AcademicCapIcon}
            level={2}
            text="Certification"
          />
          <div>
            {sortedAchievements.map((achievement) => (
              <Fragment key={achievement._id}>
                <AchievementItem key={achievement._id} {...achievement} />
                <Separator />
              </Fragment>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
