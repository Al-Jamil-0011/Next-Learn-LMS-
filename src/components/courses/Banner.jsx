import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { initials, photoKey } from '../../utils/format.js';
import { IMAGES } from '../../data/images.js';
import { BannerMark } from '../common/Logo.jsx';
import Media from '../common/Media.jsx';

/** Designed course banner: gradient, short title, mentor arch photo and batch pill. */
export default function Banner({ course: c }) {
  const { lang, ui, x } = useLang();
  const { isEnrolled } = useApp();
  const w = c.s.split(' ');
  const head = w.length > 1 ? w.slice(0, -1).join(' ') : w[0];
  const tail = w.length > 1 ? w[w.length - 1] : '';
  const courseImgKey = 'course' + c.id;
  const courseImgSrc = IMAGES[courseImgKey]?.src || IMAGES['bg_cat_' + c.cat]?.src;

  return (
    <div className="ban" style={{ '--bg1': c.k.tb }}>
      {courseImgSrc && (
        <div className="ban-bg" aria-hidden="true">
          <img src={courseImgSrc} alt="" decoding="async" />
        </div>
      )}
      <span className="bf">
        {c.f === 'live' ? (
          <span className="pill live" style={{ background: '#fff' }}>{x.liveB(c.b)}</span>
        ) : (
          <span className="pill glass">{x.rec}</span>
        )}
      </span>
      <span className="bl">
        <BannerMark />
        NextLearn
      </span>
      <div className="bt">
        {head}
        {tail && <em>{tail}</em>}
        <small>{c.k[lang]}</small>
      </div>
      <div className="bm-corner">
        <span className="bn">
          {x.with} {c.mn.split(' ')[0]}
        </span>
        <div className="bp" title={`${x.with} ${c.mn}`}>
          <Media img={photoKey(c.m)} ini={initials(c.mn)} />
        </div>
      </div>
      <span className="shine" />
      {isEnrolled(c.id) && <span className="enr">✓ {ui.enrolled}</span>}
    </div>
  );
}
