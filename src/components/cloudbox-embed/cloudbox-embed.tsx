import { ReactNode } from 'react';

interface CloudboxEmbedProperties {
  /** Outpost-advertised app name (e.g. "classgo", "kg", "ycode-canvas") */
  app: string;
  /** Cloudbox-registered host name (the outpost the app runs on) */
  host: string;
  /**
   * Cloudbox origin used to build the link URL. Default: https://ai.dhnt.io.
   */
  origin?: string;
  /** Optional sub-path inside the app, must start with "/". */
  path?: string;
  /** Optional link label. When unset, the component renders nothing. */
  linkTitle?: string;

  /**
   * Carried for frontmatter compatibility — the embedded-iframe path is
   * intentionally not wired here. Earlier versions of this component
   * rendered a `<div data-cloudbox-*>` plus `<Script src=…/embed.js>` that
   * mounted the app inside an iframe; that surface is removed for now to
   * keep the published page link-only.
   */
  login?: string;
  height?: string;
}

/**
 * Renders a single link out to a cloudbox-hosted app. No iframe, no
 * runtime embed snippet — just an anchor.
 */
export default function CloudboxEmbed({
  app,
  host,
  origin = 'https://ai.dhnt.io',
  path,
  linkTitle,
}: CloudboxEmbedProperties): ReactNode {
  if (!linkTitle) {
    return undefined;
  }
  const cleanOrigin = origin.replace(/\/+$/, '');
  const subpath = path?.startsWith('/') ? path : '/';
  const appURL = `${cleanOrigin}/matrix/h/${encodeURIComponent(host)}/app/${encodeURIComponent(app)}${subpath}`;
  return (
    <p className="print:hidden">
      <a
        href={appURL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {linkTitle}
      </a>
    </p>
  );
}
