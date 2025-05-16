import { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Albert_Sans, JetBrains_Mono } from 'next/font/google';
import { PropsWithChildren, ReactNode } from 'react';
import Footer from 'src/components/footer/footer';
import Header from 'src/components/header/header';
import { protocol } from 'src/helpers/environment';
import { cn, fullName } from 'src/helpers/utilities';
import './styles/globals.css';

const albert = Albert_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-albert',
});

const jetBrainsMono = JetBrains_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const host = `qiang.li`;
  const baseURL = `${protocol}://${host}`;
  const siteName = `${fullName} Professional Résumé`;
  const title = `Résumé | ${fullName}`;
  const description = `Professional résumé for ${fullName}.`;

  return {
    applicationName: siteName,
    authors: { name: fullName },
    creator: fullName,
    description,
    generator: 'Next.js',
    keywords: ['resume', fullName, 'next.js', 'pdf'],
    metadataBase: new URL(baseURL),
    title,
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({ children }: PropsWithChildren): ReactNode {
  return (
    <html
      lang="en"
      className={cn(albert.variable, jetBrainsMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </head>
      <body className="bg-neutral-1 text-neutral-12 selection:bg-accent-11 selection:text-neutral-1">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="space-y-12">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
