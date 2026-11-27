import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { coursePath, dateParts } from '../../utils/format.js';
import { getNextBatchCourse } from '../../utils/nextBatch.js';
import Icon, { Arrow } from '../common/Icon.jsx';
import Reveal from '../common/Reveal.jsx';

export default function FinalCta() {
  const { t } = useLang();
  const { openEnrol, isEnrolled } = useApp();

  const nextCourse = getNextBatchCourse();
  const enrolled = isEnrolled(nextCourse.id);
  const startDate = dateParts(nextCourse.st).full;

  return (
    <section className="sec ecta-final-sec" id="final-cta">
      <div className="wrap">
        <Reveal className="ecta-final">
          <div className="ecta-final-glow" aria-hidden="true" />

          <span className="pill glass ecta-final-pill">{t('ec_fin_pill')}</span>

          <h2 className="ecta-final-h2">
            {t('ec_fin_h1')} <span className="ecta-hl-saffron">{t('ec_fin_hl')}</span>?
          </h2>

          <p className="ecta-final-sub">
            {t('ec_fin_sub_pre')} {startDate}. {t('ec_fin_sub_post')}
          </p>

          <div className="ecta-final-actions">
            {enrolled ? (
              <Link to={coursePath(nextCourse)} className="btn ecta-btn-lg ecta-btn-mint magnet">
                <span>{t('ec_continue')}</span>
                <Arrow />
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-yellow ecta-btn-lg ecta-btn-saffron ecta-shimmer magnet"
                onClick={(e) => openEnrol(nextCourse, e.currentTarget)}
              >
                <span>{t('ec_enroll')}</span>
                <Arrow />
              </button>
            )}
            <Link to="/free" className="btn ecta-btn-ghost">
              <span>{t('ec_fin_free')}</span>
            </Link>
          </div>

          <div className="ecta-final-trust">
            <span>
              <Icon name="globe" small />
              <span>{t('ec_fin_t1')}</span>
            </span>
            <span>
              <Icon name="infinity" small />
              <span>{t('ec_fin_t2')}</span>
            </span>
            <span>
              <Icon name="award" small />
              <span>{t('ec_fin_t3')}</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
