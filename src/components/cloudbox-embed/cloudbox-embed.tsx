'use client';

import Script from 'next/script';
import { ReactNode } from 'react';

interface CloudboxEmbedProperties {
  /** Outpost-advertised app name (e.g. "classgo", "kg", "ycode-canvas") */
  app: string;
  /** Cloudbox-registered host name (the outpost the app runs on) */
  host: string;
  /**
   * Login mode the embed snippet uses when the app needs auth:
   *   "none"      — Mode A: the upstream app does its own auth in-iframe.
   *   "subdomain" — Mode B: top-level navigate to <origin>/cloud/login/...;
   *                 cookies on origin's apex domain flow as first-party.
   *   "popup"     — Mode C: window.open the OAuth flow; cookies use
   *                 SameSite=None;Secure;Partitioned (CHIPS).
   * Default: "none".
   */
  login?: string;
  /**
   * Cloudbox origin to load embed.js from. The snippet derives the iframe
   * origin from this — point at https://kg.qiang.li for Mode B's first-
   * party variant. Default: https://ai.dhnt.io.
   */
  origin?: string;
  /** Initial iframe height in CSS px before the embed snippet auto-resizes. */
  height?: string;
  /** Optional sub-path inside the app, must start with "/". */
  path?: string;
}

/**
 * CloudboxEmbed renders a slot for cloudbox's third-party embed snippet
 * (served at <origin>/embed.js) and the matching <div data-cloudbox-*>
 * the snippet binds to on load.
 *
 * When the embedded app's auth gate fails, cloudbox itself detects the
 * iframe context (via Sec-Fetch-Dest / Accept) and renders a friendly
 * HTML page inside the iframe — including a postMessage of
 * `cloudbox-auth-required` to the parent so embed.js's snippet can
 * surface its sign-in overlay. That makes this component pure
 * mount-and-go: no per-origin CORS probe, no integrator-specific
 * fallback markup. The polite degraded state lives on the server side
 * and is the same for every embedding domain.
 *
 * Print-hidden so the PDF résumé export skips the iframe entirely.
 */
export default function CloudboxEmbed({
  app,
  host,
  login = 'none',
  origin = 'https://ai.dhnt.io',
  height = '640',
  path,
}: CloudboxEmbedProperties): ReactNode {
  const scriptSource = `${origin.replace(/\/+$/, '')}/embed.js`;
  return (
    <>
      <div
        data-cloudbox-app={app}
        data-cloudbox-host={host}
        data-cloudbox-login={login}
        data-cloudbox-height={height}
        {...(path ? { 'data-cloudbox-path': path } : {})}
        className="border-neutral-6 overflow-hidden rounded-lg border print:hidden"
        style={{ maxWidth: '100%' }}
      />
      <Script src={scriptSource} strategy="afterInteractive" />
    </>
  );
}
