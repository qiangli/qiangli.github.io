'use client';

import { links } from '@config/links';
import { personal } from '@content';
import { ReactNode } from 'react';
import { Button } from 'src/components/button/button';
import SimpleLink from '../link/simple-link';

const scrollTop = (): void => {
  if (!window.scrollY) return;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export default function Footer(): ReactNode {
  return (
    <footer className="border-neutral-6 bg-neutral-2 text-neutral-12 border-t py-12">
      <div className="container space-y-8 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <Button
              asChild
              className="h-12 w-12 rounded-full"
              key={link.title}
              size="icon"
            >
              <a href={link.href}>
                <span className="sr-only">
                  {personal.givenName} on {link.title}
                </span>
                <link.icon aria-hidden size={18} />
              </a>
            </Button>
          ))}
        </div>

        <div className="space-y-1">
          <div onClick={scrollTop}>Copyright © {new Date().getFullYear()}</div>
          <div className="text-sm">
            This page is generated from and hosted at{' '}
            <SimpleLink href="https://github.com/qiangli/qiangli.github.io">
              GitHub
            </SimpleLink>{' '}
            assisted by{' '}
            <SimpleLink href="https://github.com/openaide/awesome/tree/main/docker/continue">
              Continue
            </SimpleLink>{' '}
            and <SimpleLink href="https://github.com/qiangli/ai">AI</SimpleLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
