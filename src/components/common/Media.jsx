import { useState } from 'react';
import { IMAGES } from '../../data/images.js';

const iniStyle = {
  position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'inherit',
  opacity: 0.75, fontWeight: 600, fontSize: '.72rem', letterSpacing: '.02em',
};

/**
 * A photo frame. Shows the real photo when data/images.js gives the slot a `src`,
 * otherwise initials (people) or a labelled placeholder.
 */
export default function Media({ img, ini, className = '', parallax, eager }) {
  const meta = IMAGES[img] || {};
  const [failed, setFailed] = useState(false);
  const showImg = meta.src && !failed;
  return (
    <div className={`media${className ? ' ' + className : ''}`} data-img={img}>
      {showImg ? (
        <img
          src={meta.src}
          alt={meta.alt || ''}
          decoding="async"
          loading={eager ? 'eager' : 'lazy'}
          className={parallax ? 'px' : undefined}
          style={meta.pos ? { objectPosition: meta.pos } : undefined}
          onError={() => setFailed(true)}
        />
      ) : ini ? (
        <span style={iniStyle}>{ini}</span>
      ) : (
        <span className="ph-l">{meta.alt || img}</span>
      )}
    </div>
  );
}
