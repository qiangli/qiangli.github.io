'use client';

import { ReactNode, useEffect, useState } from 'react';
import styles from '@styles/contact-card.module.css';
import { SHAPE_URL } from 'src/components/header/shape-button';

// Contact details are not published on the static page. Behind the shaping
// engine (DHNT.io Software Shaping) a signed-in visitor sees the full card,
// with the email taken from the engine's `email` field (audience: signed-in
// users); everyone else gets one link to sign in with DHNT.io.
const engineBase = (): string | undefined => {
  const match = /^(.*\/app\/[^/]+\/)/.exec(globalThis.location.pathname);
  return match ? match[1] : undefined;
};

interface Me {
  tier?: string;
}

interface Fields {
  fields?: { name: string; body: string }[];
}

interface Contact {
  signedIn: boolean;
  email?: string;
  signIn: string;
  onEngine: boolean;
}

function useContact(): Contact {
  const [contact, setContact] = useState<Contact>({
    signedIn: false,
    signIn: SHAPE_URL,
    onEngine: false,
  });
  useEffect(() => {
    const base = engineBase();
    if (!base) return;
    setContact((c) => ({ ...c, signIn: '/signin', onEngine: true }));
    const load = async (): Promise<void> => {
      const requestOptions: RequestInit = { credentials: 'same-origin' };
      const meResponse = await fetch(`${base}_shaping/api/me`, requestOptions);
      if (!meResponse.ok) return;
      const me = (await meResponse.json()) as Me;
      if (!me.tier || me.tier === 'anonymous') return;
      const fieldsResponse = await fetch(
        `${base}_shaping/api/fields`,
        requestOptions,
      );
      const data = fieldsResponse.ok
        ? ((await fieldsResponse.json()) as Fields)
        : {};
      const email = data.fields?.find((f) => f.name === 'email')?.body.trim();
      setContact((c) => ({ ...c, signedIn: true, email }));
    };
    load().catch(() => {
      /* engine unavailable: keep the sign-in prompt */
    });
  }, []);
  return contact;
}

const external = (
  <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }}></i>
);

// https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css
// https://fontawesome.com/search
export default function ContactCard(): ReactNode {
  const contact = useContact();

  if (!contact.signedIn) {
    return (
      <div className={styles.contactInfo}>
        <h3>Qiang Li</h3>
        <p>
          <i className="fas fa-user-lock"></i>
          <a
            href={contact.signIn}
            title="Sign in with DHNT.io to see all contact details"
            target={contact.onEngine ? '_blank' : undefined}
            rel="noreferrer"
          >
            <span>Sign in with DHNT.io to see all contact details</span>
            {external}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.contactInfo}>
      <h3>Qiang Li</h3>
      <p>
        <i className="fab fa-chrome"></i>
        <a target="_blank" href="https://qiang.li/" rel="noreferrer">
          <span>https://qiang.li/</span>
          {external}
        </a>
      </p>
      {contact.email && (
        <p>
          <i className="fas fa-envelope"></i>
          <a target="_blank" href={`mailto:${contact.email}`} rel="noreferrer">
            <span>{contact.email}</span>
            {external}
          </a>
        </p>
      )}
      <p>
        <i className="fab fa-linkedin"></i>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/liqiangsprofile/"
          rel="noreferrer"
        >
          <span className={styles.linkHead}>https://www.linkedin.com/in/</span>
          <span>liqiangsprofile</span>
          {external}
        </a>
      </p>
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
          {external}
        </a>
      </p>
    </div>
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
