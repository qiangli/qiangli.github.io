'use client';

import { MouseEvent, ReactNode } from 'react';
import { Button } from 'src/components/button/button';

// https://icons.getbootstrap.com/icons/share/
export default function ShareButton(): ReactNode {
  return (
    <Button asChild key="share-page" size="icon">
      <a
        href="#"
        onClick={handleShare}
        title="Share this page"
        aria-label="Share this page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-share"
          viewBox="0 0 16 16"
        >
          <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
        </svg>
      </a>
    </Button>
  );
}

const handleShare = (event: MouseEvent): void => {
  event.preventDefault();
  navigator
    .share({
      title: 'Resume - Qiang Li, Software Engineer',
      text: 'Find out more on my github page at http://qiang.li/, thanks!',
      url: 'http://qiang.li/',
    })
    .catch((error: unknown) => {
      console.error('Failed to share:', error);
    });
};
