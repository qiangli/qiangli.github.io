'use client';

import { ReactNode } from 'react';
import styles from '@styles/contact-card.module.css';

// https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css
// https://fontawesome.com/search
export default function ContactCard(): ReactNode {
  return (
    <>
      <div className={styles.contactInfo}>
        <h3>Qiang Li</h3>
        <p>
          <i className="fab fa-chrome"></i>
          <a target="_blank" href="http://qiang.li/" rel="noreferrer">
            <span>http://qiang.li/</span>
            <i
              className="fas fa-external-link-alt"
              style={{ fontSize: '0.8em' }}
            ></i>
          </a>
        </p>
        <p>
          <i className="fas fa-envelope"></i>
          <a target="_blank" href="mailto:liqiang@gmail.com" rel="noreferrer">
            <span>liqiang@gmail.com</span>
            <i
              className="fas fa-external-link-alt"
              style={{ fontSize: '0.8em' }}
            ></i>
          </a>
        </p>
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
