import React, { ReactNode } from 'react';

const linkStyle: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'underline',
  transition: 'color 0.2s',
};

export default function SimpleLink({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}): ReactNode {
  const [active, setActive] = React.useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        ...linkStyle,
        color: active ? 'red' : 'inherit',
      }}
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
      onFocus={() => {
        setActive(true);
      }}
      onBlur={() => {
        setActive(false);
      }}
    >
      {children ?? href}
    </a>
  );
}
