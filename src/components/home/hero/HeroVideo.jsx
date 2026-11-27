import { useRef, useState } from 'react';
import { useApp } from '../../../context/AppContext.jsx';
import { useLang } from '../../../context/LanguageContext.jsx';
import { prefersReducedMotion } from '../../../utils/format.js';
import Icon from '../../common/Icon.jsx';

export default function HeroVideo({ src = null, poster = null, tilt = { rx: 0, ry: 0 } }) {
  const { t, lang } = useLang();
  const { toast } = useApp();
  const vidRef = useRef(null);
  const reduced = prefersReducedMotion();
  const [playing, setPlaying] = useState(Boolean(src && !reduced));

  const togglePlay = () => {
    if (!src || !vidRef.current) {
      toast(lang === 'bn' ? 'পরিচিতি ভিডিও শীঘ্রই যুক্ত হবে' : 'Intro video coming soon');
      return;
    }
    if (vidRef.current.paused) {
      vidRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      vidRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="stage">
      <div className="liquid" aria-hidden="true" />
      <div
        className="tilt"
        style={{
          '--rx': `${tilt.rx}deg`,
          '--ry': `${tilt.ry}deg`,
        }}
      >
        <div className="frame">
          <div className={`screen${src ? ' has-vid' : ''}${playing ? ' playing' : ''}`}>
            {src && (
              <>
                <video
                  ref={vidRef}
                  src={src}
                  poster={poster || undefined}
                  autoPlay={!reduced}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />
                <div className="vid-grad" aria-hidden="true" />
              </>
            )}

            <div className="v-cap">
              <span>{t('hcap1')}</span>
              <b>{t('hcap2')}</b>
            </div>

            <button
              type="button"
              className="v-play"
              aria-label={t('hplay')}
              aria-pressed={src ? playing : undefined}
              onClick={togglePlay}
            >
              <span className="v-rip" aria-hidden="true" />
              <span className="v-disc" aria-hidden="true">
                {src && playing ? (
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <rect x="6" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
                    <rect x="14" y="5" width="4" height="14" rx="1.2" fill="currentColor" />
                  </svg>
                ) : (
                  <Icon name="play" />
                )}
              </span>
            </button>

            <span className="v-name">{t('hname')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
