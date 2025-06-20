'use client';

import { personal } from '@content';
import { ReactNode, useState } from 'react';
import { Heading } from 'src/components/heading/heading';
import { ThemeToggle } from 'src/components/theme-toggle/theme-toggle';
import { fullName } from 'src/helpers/utilities';

import PrinterButton from './printer-button';
import PDFButton from './pdf-button';
import ShareButton from './share-button';
// import DownloadButton from './download-button';
// import GoogleButton from './google-button';

export default function Header(): ReactNode {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-neutral-6 bg-neutral-1 relative border-b py-12">
      {/* Hamburger and dropdown are now outside the container */}
      <div className="md:hidden">
        <button
          className="hover:bg-neutral-3 fixed top-4 right-4 z-50 rounded p-2 focus:outline-none"
          aria-label="Open menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          {/* Hamburger Icon */}
          <svg width="24" height="24" fill="none">
            <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
        {/* Mobile Dropdown Menu fixed to top-right */}
        {menuOpen && (
          <div className="bg-neutral-1 border-neutral-4 fixed top-16 right-0 z-40 flex w-16 flex-col items-stretch gap-2 rounded border p-2 shadow-lg">
            <PrinterButton />
            <PDFButton />
            <ShareButton />
            <ThemeToggle
              buttonTextVisible={false}
              labelButton="Select theme"
              themeNameDark="dark"
              themeNameLight="light"
              color={undefined}
              variant={undefined}
            />
          </div>
        )}
      </div>

      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <div className="flex-1 space-y-2">
            <Heading level={1}>{fullName}</Heading>
            <Heading color="muted" className="text-balance" level={2}>
              {personal.title}
            </Heading>
          </div>
          {/* Desktop Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <PrinterButton />
            <PDFButton />
            {/* <DownloadButton /> */}
            {/* <GoogleButton /> */}
            <ShareButton />
            <ThemeToggle
              buttonTextVisible={false}
              labelButton="Select theme"
              themeNameDark="dark"
              themeNameLight="light"
              color={undefined}
              variant={undefined}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
