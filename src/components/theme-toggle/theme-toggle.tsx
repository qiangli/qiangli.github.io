'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';
import { Button, ButtonProperties } from 'src/components/button/button';
import { cn } from 'src/helpers/utilities';

export type ThemeToggleProperties = Pick<
  ButtonProperties,
  'color' | 'variant'
> & {
  buttonTextVisible: boolean;
  labelButton: string;
  themeNameDark: string;
  themeNameLight: string;
};

function ThemeToggle({
  buttonTextVisible,
  color,
  labelButton,
  themeNameDark,
  themeNameLight,
  variant = 'outline',
}: ThemeToggleProperties): ReactNode {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid SSR/hydration mismatch by only rendering when mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // eslint-disable-next-line unicorn/no-null
  if (!mounted) return null; // Disables all rendering until client-side

  const isDark = resolvedTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  return (
    <Button
      className={cn({
        'rounded-full': !buttonTextVisible,
      })}
      color={color}
      size={buttonTextVisible ? 'md' : 'icon'}
      variant={variant}
      aria-label={labelButton}
      onClick={() => {
        setTheme(nextTheme);
      }}
    >
      <div className="flex items-center gap-2">
        {isDark ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
        <span
          className={cn({
            'sr-only': !buttonTextVisible,
          })}
        >
          {isDark ? themeNameDark : themeNameLight}
        </span>
      </div>
    </Button>
  );
}

export { ThemeToggle };
