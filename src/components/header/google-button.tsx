'use client';

import { ReactNode } from 'react';
import { Button } from 'src/components/button/button';

// https://icons.getbootstrap.com/icons/google/
export default function GoogleButton(): ReactNode {
  return (
    <Button asChild key="download-google-version" size="icon">
      <a
        href="https://drive.google.com/file/d/1-3bW17BzpzygVsLCdCBHoZUadYAj5l70/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        title="One page PDF version on Google Drive"
        aria-label="One page PDF version on Google Drive"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-google"
          viewBox="0 0 16 16"
        >
          <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
        </svg>
      </a>
    </Button>
  );
}
