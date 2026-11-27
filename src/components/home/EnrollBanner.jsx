import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { IMAGES } from '../../data/images.js';
import useInView from '../../hooks/useInView.js';
import { coursePath, dateParts, initials, photoKey, tk, to24 } from '../../utils/format.js';
import { getNextBatchCourse } from '../../utils/nextBatch.js';
import Icon, { Arrow } from '../common/Icon.jsx';
import Media from '../common/Media.jsx';
import Reveal from '../common/Reveal.jsx';
import Countdown from '../course/Countdown.jsx';

export default function EnrollBanner() {
  const { t, num } = useLang();
  const { openEnrol, isEnrolled } = useApp();
  const [meterRef, meterIn] = useInView({ threshold: 0.25 });

  const c = getNextBatchCourse();
  const enrolled = isEnrolled(c.id);
  const startDate = dateParts(c.st).full;
  const filledPct = Math.min(100, Math.max(8, Math.round(((c.seats - c.left) / c.seats) * 100)));
  const saveAmt = c.o - c.p;
  const courseImg = IMAGES['course' + c.id] ? 'course' + c.id : 'cat_' + c.cat;
  const targetTs = new Date(c.st + 'T' + to24(c.time) + ':00+06:00').getTime();
  const hasCountdown = targetTs > Date.now();

  return (
    <section className="sec ecta-banner-sec" id="enroll-banner">
      <div className="wrap">
        <Reveal className="ecta-banner">
          <div className="ecta-banner-glow a" aria-hidden="true" />
          <div className="ecta-banner-glow b" aria-hidden="true" />

          <div className="ecta-banner-body">
            <div className="ecta-banner-top">
              <span className="pill live ecta-adm-pill">{t('ec_adm_pill')}</span>
              <span className="ecta-banner-time">
                <Icon name="clock" small />
                <span>{c.time}</span>
              </span>
            </div>

            <h2 className="ecta-banner-h2">
              {t('ec_adm_h1')} <span className="ecta-hl-saffron">{startDate}</span>
            </h2>

            <div className="ecta-banner-meta">
              <div className="ecta-banner-course">
                <div className="ecta-banner-ctitle">{c.t}</div>
                <div className="ecta-banner-mentor">
                  <span className="ecta-m-av">
                    <Media img={photoKey(c.m)} ini={initials(c.mn)} />
                  </span>
                  <span>
                    <b>{c.mn}</b>
                    <small> · {c.mr}</small>
                  </span>
                </div>
              </div>

              <div className="ecta-meter-wrap" ref={meterRef}>
                <div className="ecta-meter-head">
                  <span>
                    <b className="ecta-urg-num">{num(c.left)}</b> {t('ec_adm_of')} {num(c.seats)} {t('ec_seats_left')}
                  </span>
                  <span className="num">{num(filledPct)}%</span>
                </div>
                <div
                  className="ecta-meter-bar"
                  role="progressbar"
                  aria-valuenow={filledPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <i style={{ width: meterIn ? `${filledPct}%` : '0%' }} />
                </div>
              </div>
            </div>

            {hasCountdown && (
              <div className="ecta-cd-wrap">
                <Countdown target={targetTs} />
              </div>
            )}

            <div className="ecta-banner-foot">
              <div className="ecta-price-row">
                <div className="ecta-price-main num">
                  <b>{tk(c.p)}</b>
                  <s>{tk(c.o)}</s>
                  <span className="pill mint ecta-save-pill">{t('ec_adm_save')} {tk(saveAmt)}</span>
                </div>
                {c.inst && (
                  <div className="ecta-inst">
                    {t('ec_adm_inst')} {num(c.inst)} {t('ec_adm_inst2')} ({tk(Math.ceil(c.p / c.inst))}/mo)
                  </div>
                )}
              </div>

              <div className="ecta-banner-cta">
                {enrolled ? (
                  <Link to={coursePath(c)} className="btn ecta-btn-lg ecta-btn-mint magnet">
                    <span>{t('ec_continue')}</span>
                    <Arrow />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="btn btn-yellow ecta-btn-lg ecta-btn-saffron ecta-shimmer magnet"
                    onClick={(e) => openEnrol(c, e.currentTarget)}
                  >
                    <span>{t('ec_enroll')}</span>
                    <Arrow />
                  </button>
                )}
              </div>
            </div>

            <div className="ecta-safe-line">
              <Icon name="lock" small />
              <span>{t('ec_adm_safe')}</span>
            </div>
          </div>

          <div className="ecta-banner-art">
            <div className="ecta-art-frame">
              <Media img={courseImg} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
