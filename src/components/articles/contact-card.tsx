'use client';

import { ReactNode, useEffect, useState } from 'react';
import styles from '@styles/contact-card.module.css';
import { SHAPE_URL } from 'src/components/header/shape-button';

// https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css
// https://fontawesome.com/search
export default function ContactCard(): ReactNode {
  return (
    <>
      <div className={styles.contactInfo}>
        <h3>Qiang Li</h3>
        <p>
          <i className="fab fa-chrome"></i>
          <a target="_blank" href="https://qiang.li/" rel="noreferrer">
            <span>https://qiang.li/</span>
            <i
              className="fas fa-external-link-alt"
              style={{ fontSize: '0.8em' }}
            ></i>
          </a>
        </p>
        <EmailRow />
        <p>
          <i className="fab fa-linkedin"></i>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/liqiangsprofile/"
            rel="noreferrer"
          >
            <span className={styles.linkHead}>
              https://www.linkedin.com/in/
            </span>
            <span>liqiangsprofile</span>
            <i
              className="fas fa-external-link-alt"
              style={{ fontSize: '0.8em' }}
            ></i>
          </a>
        </p>
        {/* <p>
          <i className="fas fa-phone"></i>
          <a target="_blank" href="tel:650-xxxxxxx" rel="noreferrer">
            <span>+1 65O xxx xxxx</span>
            <i
              className="fas fa-external-link-alt"
              style={{ fontSize: '0.8em' }}
            ></i>
          </a>
        </p> */}
        <p>
          <i className="fas fa-map-marker-alt"></i>
          <a
            target="_blank"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              handleOpenMap();
            }}
            rel="noreferrer"
          >
            <span>San Francisco Bay Area, USA</span>
            <i
              className="fas fa-external-link-alt"
              style={{ fontSize: '0.8em' }}
            ></i>
          </a>
        </p>
      </div>
    </>
  );
}

const handleOpenMap = (): void => {
  const lat = '37.712392';
  const lng = '-121.863718';
  // Basic iOS detection
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const mapUrl = isIOS
    ? `https://maps.apple.com/?q=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  window.open(mapUrl, '_blank', 'noopener,noreferrer');
};

// The email is not published on the static page. Behind the shaping engine
// (DHNT.io Software Shaping) a signed-in visitor gets it from the engine's
// `email` field, whose audience is signed-in users; everyone else is asked
// to sign in.
const engineBase = (): string | undefined => {
  const match = /^(.*\/app\/[^/]+\/)/.exec(globalThis.location.pathname);
  return match ? match[1] : undefined;
};

interface Fields {
  fields?: { name: string; body: string }[];
}

function EmailRow(): ReactNode {
  const [email, setEmail] = useState<string | undefined>();
  const [signIn, setSignIn] = useState(SHAPE_URL);
  useEffect(() => {
    const base = engineBase();
    if (!base) return;
    setSignIn('/signin');
    const load = async (): Promise<void> => {
      const response = await fetch(`${base}_shaping/api/fields`, {
        credentials: 'same-origin',
      });
      if (!response.ok) return;
      const data = (await response.json()) as Fields;
      const field = data.fields?.find((f) => f.name === 'email');
      if (field) setEmail(field.body.trim());
    };
    load().catch(() => {
      /* not signed in or engine unavailable: keep the sign-in prompt */
    });
  }, []);

  return (
    <p>
      <i className="fas fa-envelope"></i>
      {email ? (
        <a target="_blank" href={`mailto:${email}`} rel="noreferrer">
          <span>{email}</span>
          <i
            className="fas fa-external-link-alt"
            style={{ fontSize: '0.8em' }}
          ></i>
        </a>
      ) : (
        <a
          href={signIn}
          title="Sign in to see the email address"
          target={signIn === SHAPE_URL ? undefined : '_blank'}
          rel="noreferrer"
        >
          <span>Sign in to see email</span>
        </a>
      )}
    </p>
  );
}
