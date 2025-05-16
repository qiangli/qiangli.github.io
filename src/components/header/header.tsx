import { personal } from '@content';
import { ReactNode } from 'react';
import { Heading } from 'src/components/heading/heading';
import { ThemeToggle } from 'src/components/theme-toggle/theme-toggle';
import { fullName } from 'src/helpers/utilities';

import PrinterButton from './printer-button';
import PDFButton from './pdf-button';
import ShareButton from './share-button';

export default function Header(): ReactNode {
  return (
    <header className="border-neutral-6 bg-neutral-1 border-b py-12">
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="flex-1 space-y-2">
            <Heading level={1}>{fullName}</Heading>
            <Heading color="muted" className="text-balance" level={2}>
              {personal.title}
            </Heading>
          </div>
          <PrinterButton />
          <PDFButton />
          <ShareButton />
          <ThemeToggle
            buttonTextVisible={false}
            labelButton="Select theme"
            themeNameDark="dark"
            themeNameLight="light"
          />
        </div>
      </div>
    </header>
  );
}
