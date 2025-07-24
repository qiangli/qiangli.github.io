import * as React from 'react';
import type { IconType } from '@icons-pack/react-simple-icons';

// eslint-disable-next-line react/display-name
const LinkedInIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    ref={ref}
    {...props}
  >
    <title>LinkedIn</title>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.85-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667h-3.554V9h3.414v1.561h.049c.476-.899 1.637-1.85 3.369-1.85 3.602 0 4.266 2.369 4.266 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.123zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.222 0z"/>
  </svg>
));

export default LinkedInIcon as IconType;