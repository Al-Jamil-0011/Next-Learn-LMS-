import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { dateParts, tk, to24 } from '../../utils/format.js';
import Icon, { Arrow } from '../common/Icon.jsx';
import Banner from '../courses/Banner.jsx';
import Countdown from './Countdown.jsx';

const INC_ICONS = ['video', 'proj', 'award', 'users', 'infinity'];

/** Price, countdown, seats and the enrol button. Sticky beside the course content. */
const BuyCard = forwardRef(function BuyCard({ course: c }, ref) {
  const { ui, x, y, num, lang } = useLang();
  const { isEnrolled, openEnrol, toast } = useApp();
  const live = c.f === 'live';
  const enrolled = isEnrolled(c.id);
  const [seatW, setSeatW] = useState(0);
  const seatPct = live ? Math.round((1 - c.left / c.seats) * 100) : 0;

  useEffect(() => {
    const id = setTimeout(() => setSeatW(seatPct), 60);
    return () => clearTimeout(id);
  }, [seatPct]);

  const copy = () => {
    try {
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
    } catch {
      /* ignore */
    }
    toast(y.copied);
  };

  return (
    <div className="cd-buy" id="cdBuy" ref={ref}>
      <div
        className="cd-prev"
        role="button"
        tabIndex={0}
        onClick={() => toast(lang === 'bn' ? 'কোর্সের প্রিভিউ ভিডিও আসল সাইটে চলবে' : 'The course preview video will play on the live site')}
      >
        <Banner course={c} />
        <span className="play"><svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" /></svg></span>
        <span className="pl">{y.watch}</span>
      </div>
      <div className="cd-bb">
        <div className="price">
          <b>{tk(c.p)}</b>
          <s>{tk(c.o)}</s>
          <span className="pill sun">{num(Math.round((1 - c.p / c.o) * 100))}% off</span>
        </div>
        {c.inst && (
          <span className="inst" style={{ marginTop: -8 }}>
            {ui.inst(c.inst)}
            {tk(Math.ceil(c.p / c.inst))}
          </span>
        )}
        {live ? (
          <>
            <div className="cd-cdl"><span>{y.cdL}</span><span>{dateParts(c.st).full}, {c.time}</span></div>
            <Countdown target={new Date(c.st + 'T' + to24(c.time) + ':00+06:00').getTime()} />
            <div className="cd-cdl">
              <span>{y.seats(c.seats - c.left, c.seats)}</span>
              <span style={{ color: '#C93A1F', fontWeight: 600 }}>{num(c.left)} {ui.left}</span>
            </div>
            <div className="cd-seat"><i style={{ width: seatW + '%' }} /></div>
          </>
        ) : (
          <div className="cd-cdl">
            <span><Icon name="infinity" small style={{ display: 'inline', verticalAlign: -3 }} /> {y.selfStart}</span>
            <span>{y.flex}</span>
          </div>
        )}
        <button
          type="button"
          className="btn magnet"
          disabled={enrolled}
          style={enrolled ? { '--bg': 'var(--mint)', '--fg': 'var(--ink)' } : undefined}
          onClick={(e) => openEnrol(c, e.currentTarget)}
        >
          <span>{enrolled ? ui.enrolled : x.enroll}</span>
          {!enrolled && <Arrow />}
        </button>
        <Link to="/free" className="btn btn-line"><span>{y.free}</span></Link>
        <ul className="cd-inc">
          <li style={{ fontWeight: 600, color: 'var(--ink)' }}>{y.incl}</li>
          {y.inc.map((text, i) => (
            <li key={i}>
              <Icon name={INC_ICONS[i]} small />
              {i === 0 && !live ? (lang === 'bn' ? 'রেকর্ডেড ভিডিও লেসন' : 'Recorded video lessons') : text}
            </li>
          ))}
        </ul>
        <div className="cd-share">
          <span>{y.share}</span>
          <button type="button" onClick={copy}><Icon name="share" small />{y.copy}</button>
        </div>
      </div>
    </div>
  );
});

export default BuyCard;
