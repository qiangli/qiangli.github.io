import { ReactNode } from 'react';
import AboutMe from 'src/components/articles/about-me';
import Achievements from 'src/components/articles/achievements';
import AdditionalInfo from 'src/components/articles/additional-info';
import ContactInformation from 'src/components/articles/contact-info';
import Professional from 'src/components/articles/professional';

export const dynamic = 'force-static';

export default function Page(): ReactNode {
  return (
    <div className="container space-y-12 print:text-xs">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <AboutMe />
        <ContactInformation />
      </div>

      <Professional />
      <Achievements />
      <AdditionalInfo />
    </div>
  );
}
