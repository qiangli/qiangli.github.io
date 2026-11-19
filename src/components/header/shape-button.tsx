'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Button } from 'src/components/button/button';

// The shaping engine for this site (DHNT.io Software Shaping): the same pages,
// plus a panel that shapes them for the signed-in reader.
export const SHAPE_URL =
  'https://165-227-49-91.sslip.io/matrix/h/elephant/app/site/';

export default function ShapeButton(): ReactNode {
  // Already on the engine face: the panel is the shaping entry point there.
  const [onEngine, setOnEngine] = useState(false);
  useEffect(() => {
    setOnEngine(globalThis.location.pathname.includes('/matrix/h/'));
  }, []);
  if (onEngine) return undefined;

  return (
    <Button asChild key="shape-page" size="icon">
      <a
        href={SHAPE_URL}
        title="Shape this page (DHNT.io Software Shaping)"
        data-shaping-hide-on-engine=""
        aria-label="Shape this page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          {/* The Software Shaping Flow mark */}
          <path d="M43 85 C65 100 84 86 105 63 C124 42 143 29 169 29 C201 29 225 51 227 85 Q228 92 221 88 C189 65 159 77 137 96 C116 115 96 147 65 148 C35 149 20 122 30 99 Q38 81 43 85 Z" />
          <path
            d="M43 85 C65 100 84 86 105 63 C124 42 143 29 169 29 C201 29 225 51 227 85 Q228 92 221 88 C189 65 159 77 137 96 C116 115 96 147 65 148 C35 149 20 122 30 99 Q38 81 43 85 Z"
            transform="rotate(180 128 128)"
          />
        </svg>
      </a>
    </Button>
  );
}
