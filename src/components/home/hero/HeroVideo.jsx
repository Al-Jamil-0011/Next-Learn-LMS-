import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../../context/AppContext.jsx';
import { useLang } from '../../../context/LanguageContext.jsx';
import { prefersReducedMotion } from '../../../utils/format.js';
import Icon from '../../common/Icon.jsx';

export default function HeroVideo({
  src = null,
  poster = null,
  tilt = { rx: 0, ry: 0 },
  offScreen = false,
}) {
  const { t, lang } = useLang();
  const { toast } = useApp();
  const vidRef = useRef(null);
  const userPausedRef = useRef(false);
  const reduced = prefersReducedMotion();
  const [playing, setPlaying] = useState(Boolean(src && !reduced));
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const vid = vidRef.current;
    if (!src || !vid) return;

    vid.defaultMuted = true;
    vid.muted = muted;

    if (offScreen) {
      if (!vid.paused) vid.pause();
      return;
    }

    if (!reduced && !userPausedRef.current && vid.paused) {
      vid.play().catch(() => setPlaying(false));
    }
  }, [src, offScreen, reduced, muted]);

  const togglePlay = () => {
    if (!src || !vidRef.current) {
      toast(lang === 'bn' ? 'পরিচিতি ভিডিও শীঘ্রই যুক্ত হবে' : 'Intro video coming soon');
      return;
    }
    const vid = vidRef.current;
    if (vid.paused) {
      userPausedRef.current = false;
      vid.play().catch(() => setPlaying(false));
    } else {
      userPausedRef.current = true;
      vid.pause();
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const vid = vidRef.current;
    if (!vid) return;
    const nextMuted = !vid.muted;
    vid.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted && vid.paused) {
      userPausedRef.current = false;
      vid.play().catch(() => {});
    }
  };

  const playLabel = src
    ? playing
      ? lang === 'bn'
        ? 'ভিডিও থামান'
        : 'Pause video'
      : lang === 'bn'
        ? 'ভিডিও চালান'
        : 'Play video'
    : t('hplay');

  const soundLabel = muted
    ? lang === 'bn'
      ? 'সাউন্ড চালু করুন'
      : 'Unmute video'
    : lang === 'bn'
      ? 'মিউট করুন'
      : 'Mute video';

  return (
    <div className={`stage${src ? ' stage-vid' : ''}`}>
      <div className="liquid" aria-hidden="true" />
      <div
        className="tilt"
        style={{
          '--rx': `${tilt.rx}deg`,
          '--ry': `${tilt.ry}deg`,
        }}
      >
        <div className="frame">
          <div
            className={`screen${src ? ' has-vid' : ''}${playing ? ' playing' : ''}`}
            onClick={src ? togglePlay : undefined}
          >
            {src && (
              <>
                <video
                  ref={vidRef}
                  src={src}
                  poster={poster || undefined}
                  autoPlay={!reduced}
                  muted={muted}
                  loop
                  playsInline
                  preload="auto"
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onVolumeChange={() => {
                    if (vidRef.current) setMuted(vidRef.current.muted);
                  }}
                />
                <div className="vid-grad" aria-hidden="true" />
              </>
            )}

            {!src && (
              <div className="v-cap">
                <span>{t('hcap1')}</span>
                <b>{t('hcap2')}</b>
              </div>
            )}

            <button
              type="button"
              className="v-play"
              aria-label={playLabel}
              aria-pressed={src ? playing : undefined}
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
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

            {src ? (
              <button
                type="button"
                className={`v-sound${muted ? '' : ' on'}`}
                aria-label={soundLabel}
                aria-pressed={!muted}
                onClick={toggleSound}
              >
                {muted ? (
                  <svg className="ic s" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path d="M22 9l-6 6M16 9l6 6" />
                  </svg>
                ) : (
                  <svg className="ic s" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path d="M15.5 8.5a5 5 0 010 7" />
                    <path d="M18.5 5.5a9 9 0 010 13" />
                  </svg>
                )}
                <span className="v-eq" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span>{muted ? (lang === 'bn' ? 'সাউন্ড' : 'Sound') : (lang === 'bn' ? 'চালু' : 'On')}</span>
              </button>
            ) : (
              <span className="v-name">{t('hname')}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
