import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext.jsx';
import { ABOUT_DATA } from '../data/company.js';
import { IMAGES } from '../data/images.js';
import useCountUp from '../hooks/useCountUp.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import Icon from '../components/common/Icon.jsx';
import Lines from '../components/common/Lines.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Reveal from '../components/common/Reveal.jsx';
import Soon from '../components/common/Soon.jsx';
import SectionHead from '../components/home/SectionHead.jsx';

function StatBlock({ item }) {
  const { lang, num } = useLang();
  const [ref, val] = useCountUp(item.num);
  const displayVal = lang === 'bn' ? num(val) : val;

  return (
    <div className="co-stat-item">
      <div className="co-stat-num">
        <span ref={ref}>{displayVal}</span>{item.suffix}
      </div>
      <div className="co-stat-lbl">{item[lang]}</div>
    </div>
  );
}

export default function AboutPage() {
  const { t, lang } = useLang();
  useDocumentTitle(lang === 'bn' ? 'আমাদের সম্পর্কে · NextLearn' : 'About us · NextLearn');

  return (
    <div className="co-about-page">
      <PageHero
        crumb={t('ab_p')}
        title={t('ab_hero_t')}
        sub={t('ab_hero_s')}
      />

      {/* Story Section */}
      <section className="sec" id="story">
        <div className="wrap">
          <div className="co-story-grid">
            <Reveal className="co-story-media">
              {IMAGES.ab_story?.src && (
                <img
                  src={IMAGES.ab_story.src}
                  alt={IMAGES.ab_story.alt}
                  loading="lazy"
                  width="720"
                  height="900"
                />
              )}
            </Reveal>

            <Reveal className="co-story-text" style={{ transitionDelay: '80ms' }}>
              <span className="eyebrow">
                <i />
                {t('ab_story_e')}
              </span>
              <Lines as="h2">{t('ab_story_h')}</Lines>
              <p>{t('ab_story_p1')}</p>
              <p>{t('ab_story_p2')}</p>
              <div className="co-story-sig">{t('ab_story_sig')}</div>
            </Reveal>
          </div>

          {/* Overlapping Stats Strip */}
          <Reveal className="co-stats-strip" style={{ transitionDelay: '140ms' }}>
            {ABOUT_DATA.stats.map((item, idx) => (
              <StatBlock key={idx} item={item} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="sec soft" id="mission-vision">
        <div className="wrap">
          <SectionHead
            eyebrow={t('ab_mv_e')}
            title={t('ab_mv_t')}
          />

          <div className="co-mv-grid">
            <Reveal className="co-mv-card co-mv-navy">
              <span className="co-mv-icon">
                <Icon name={ABOUT_DATA.missionVision.mission.icon} />
              </span>
              <h3>{ABOUT_DATA.missionVision.mission[lang].title}</h3>
              <p>{ABOUT_DATA.missionVision.mission[lang].desc}</p>
            </Reveal>

            <Reveal className="co-mv-card co-mv-saffron" style={{ transitionDelay: '80ms' }}>
              <span className="co-mv-icon">
                <Icon name={ABOUT_DATA.missionVision.vision.icon} />
              </span>
              <h3>{ABOUT_DATA.missionVision.vision[lang].title}</h3>
              <p>{ABOUT_DATA.missionVision.vision[lang].desc}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values Grid (6) */}
      <section className="sec" id="values">
        <div className="wrap">
          <SectionHead
            eyebrow={t('ab_val_e')}
            title={t('ab_val_t')}
          />

          <div className="co-val-grid">
            {ABOUT_DATA.values.map((val, idx) => (
              <Reveal
                key={idx}
                className="co-val-card"
                style={{ transitionDelay: `${(idx % 3) * 70}ms` }}
              >
                <span className="fi" style={{ background: 'var(--cobalt-50)', color: 'var(--cobalt)' }}>
                  <Icon name={val.icon} />
                </span>
                <h3>{val[lang].title}</h3>
                <p>{val[lang].desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="sec soft" id="timeline">
        <div className="wrap">
          <SectionHead
            eyebrow={t('ab_time_e')}
            title={t('ab_time_t')}
          />

          <div className="co-timeline-wrap">
            <div className="co-timeline-track">
              <div className="co-timeline-line">
                <div className="co-timeline-fill" />
              </div>
              {ABOUT_DATA.timeline.map((mile, idx) => (
                <div key={idx} className="co-timeline-item">
                  <div className="co-timeline-node">
                    {mile.year}
                  </div>
                  <div className="co-timeline-content">
                    <b>{mile[lang].title}</b>
                    <p>{mile[lang].desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="sec" id="team">
        <div className="wrap">
          <SectionHead
            eyebrow={t('ab_team_e')}
            title={t('ab_team_t')}
          />

          <div className="co-team-grid">
            {ABOUT_DATA.team.map((member, idx) => {
              const imgObj = IMAGES[member.img];
              return (
                <Reveal
                  key={member.id}
                  className="co-team-card"
                  style={{ transitionDelay: `${idx * 70}ms` }}
                >
                  <div className="co-team-photo">
                    {imgObj?.src && (
                      <img
                        src={imgObj.src}
                        alt={imgObj.alt || member[lang].name}
                        loading="lazy"
                        width="400"
                        height="430"
                      />
                    )}
                  </div>
                  <div className="co-team-info">
                    <b className="co-team-name">{member[lang].name}</b>
                    <span className="co-team-role">{member[lang].role}</span>
                    <p className="co-team-bio">{member[lang].bio}</p>
                    <Soon className="co-team-link">
                      <Icon name="share" small />
                      <span>{t('ab_team_soon')}</span>
                    </Soon>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bento Gallery */}
      <section className="sec soft" id="gallery">
        <div className="wrap">
          <SectionHead
            eyebrow={t('ab_gal_e')}
            title={t('ab_gal_t')}
          />

          <div className="co-bento-grid">
            {ABOUT_DATA.gallery.map((g, idx) => {
              const imgObj = IMAGES[g.img];
              return (
                <div key={idx} className={`co-bento-item co-bento-${idx + 1}`}>
                  {imgObj?.src && (
                    <img
                      src={imgObj.src}
                      alt={imgObj.alt || g[lang]}
                      loading="lazy"
                    />
                  )}
                  <div className="co-bento-caption">{g[lang]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recognition / Partners Marquee */}
      <section className="sec" id="partners">
        <div className="wrap" style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            <i />
            {t('ab_part_e')}
          </span>
          <h2 className="h2" style={{ fontSize: '1.4rem', color: 'var(--muted)' }}>
            {t('ab_part_t')}
          </h2>
        </div>
        <div className="mq" aria-label="Hiring Partners">
          <div className="mq-in" style={{ gap: '20px' }}>
            {[...ABOUT_DATA.partners, ...ABOUT_DATA.partners].map((name, i) => (
              <span key={i} className="co-partner-tag">
                <Icon name="brief" small />
                <span>{name}</span>
                <small style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                  ({lang === 'bn' ? 'নমুনা' : 'sample'})
                </small>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="co-cta-band">
            <h2>{t('ab_cta_t')}</h2>
            <p>{t('ab_cta_s')}</p>
            <div className="co-cta-btns">
              <Link to="/courses" className="btn btn-yellow magnet">
                <span>{t('ab_cta_b1')}</span>
              </Link>
              <Link to="/teach" className="btn btn-line" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                <span>{t('ab_cta_b2')}</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
