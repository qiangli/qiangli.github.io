import { ReactNode } from 'react';
import styles from '@styles/contact-card.module.css';
import { SHAPE_URL } from 'src/components/header/shape-button';

// Contact details are not published on this static page. Behind the shaping
// engine (DHNT.io Software Shaping) a signed-in visitor sees them: the
// engine's panel fills this card (data-shaping-contact) with the reader's
// contact-* fields, and points the sign-in link (data-shaping-signin) at the
// sign-in page.
export default function ContactCard(): ReactNode {
  return (
    <div className={styles.contactInfo} data-shaping-contact="">
      <h3>Qiang Li</h3>
      <p>
        <i className="fas fa-user-lock"></i>
        <a
          href={SHAPE_URL}
          title="Sign in with DHNT.io to see all contact details"
          data-shaping-signin=""
        >
          <span>Sign in with DHNT.io to see all contact details</span>
          <i
            className="fas fa-external-link-alt"
            style={{ fontSize: '0.8em' }}
          ></i>
        </a>
      </p>
    </div>
  );
}
