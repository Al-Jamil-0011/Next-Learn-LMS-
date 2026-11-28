import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { COURSES } from '../../data/courses.js';
import { bnDigits, coursePath, tk } from '../../utils/format.js';
import Reveal from '../common/Reveal.jsx';

const FEATURED_OFFER_IDS = [8, 2, 10, 1, 5, 6, 4, 9, 11, 3];

const OFFER_COURSES = FEATURED_OFFER_IDS
  .map((id) => COURSES.find((c) => c.id === id))
  .filter(Boolean);

const TONES = ['saffron', 'cobalt', 'mint', 'coral'];

const buildItems = (bn) => {
  const fmt = (val) => (bn ? bnDigits(tk(val)) : tk(val));
  const num = (n) => (bn ? bnDigits(n) : String(n));

  const courseItems = OFFER_COURSES.map((c, idx) => {
    const pct = Math.round((1 - c.p / c.o) * 100);
    let note = '';
    if (c.left && c.left <= 12) {
      note = bn ? `মাত্র ${num(c.left)} আসন বাকি` : `${c.left} seats left`;
    } else if (c.inst) {
      note = bn ? `${num(c.inst)} কিস্তি সুবিধা` : `${c.inst} instalments`;
    }
    return {
      key: `c-${c.id}`,
      to: coursePath(c),
      tone: TONES[idx % TONES.length],
      badge: bn ? `${num(pct)}% ছাড়` : `${pct}% OFF`,
      title: c.s,
      price: fmt(c.p),
      oldPrice: fmt(c.o),
      note,
    };
  });

  const promoItem = {
    key: 'promo-next10',
    action: 'copy',
    tone: 'cobalt',
    badge: bn ? 'বাড়তি ১০% ছাড়' : 'Extra 10% OFF',
    title: bn ? 'কুপন: NEXT10' : 'Code: NEXT10',
    note: bn ? 'সব কোর্সে প্রযোজ্য' : 'Click to copy',
  };

  const freeItem = {
    key: 'free-demo',
    to: '/free',
    tone: 'mint',
    badge: bn ? '১০০% ফ্রি' : '100% FREE',
    title: bn ? 'ফ্রি লাইভ ডেমো ক্লাস ও ৭ দিনের রিফান্ড গ্যারান্টি' : 'Free Live Demo Class · 7-Day Refund Guarantee',
  };

  return [
    courseItems[0],
    promoItem,
    courseItems[1],
    courseItems[2],
    courseItems[3],
    freeItem,
    ...courseItems.slice(4),
  ];
};

/** Left-to-right headline ticker displaying live course discount offers & Technofy Bangladesh perks. */
export default function Logos() {
  const { lang } = useLang();
  const { toast } = useApp();
  const bn = lang === 'bn';
  const items = buildItems(bn);

  const copyPromo = () => {
    navigator.clipboard?.writeText('NEXT10').catch(() => {});
    toast(
      bn
        ? 'কুপন কোড NEXT10 কপি হয়েছে — চেকআউটে আরও ১০% ছাড়!'
        : 'Coupon NEXT10 copied — enjoy an extra 10% off at checkout!',
    );
  };

  return (
    <section
      className="offer-band"
      aria-label={bn ? 'চলমান কোর্স ডিসকাউন্ট ও অফারসমূহ' : 'Current course discounts and offers'}
    >
      <div className="wrap">
        <Reveal className="offer-head">
          <span className="offer-live">
            <i aria-hidden="true" />
            <span>
              {bn
                ? 'অক্টোবর ব্যাচ স্পেশাল · চলমান কোর্স ডিসকাউন্ট ও অফার'
                : 'October Batch Specials · Live Course Discounts & Offers'}
            </span>
          </span>
          <button type="button" className="offer-code-btn" onClick={copyPromo}>
            <span>{bn ? 'কুপন:' : 'Code:'}</span>
            <b>NEXT10</b>
            <small>{bn ? 'আরও ১০% ছাড়' : '+10% off'}</small>
          </button>
        </Reveal>
      </div>

      <div className="offer-mq">
        <div className="offer-track">
          {[...items, ...items].map((item, idx) => {
            const dup = idx >= items.length;
            const inner = (
              <>
                <span className={`of-tag of-${item.tone}`}>{item.badge}</span>
                <span className="of-name">{item.title}</span>
                {item.price && <b className="of-price">{item.price}</b>}
                {item.oldPrice && <del className="of-old">{item.oldPrice}</del>}
                {item.note && <span className="of-note">{item.note}</span>}
              </>
            );

            if (item.action === 'copy') {
              return (
                <button
                  key={`${item.key}-${idx}`}
                  type="button"
                  className={`of-pill${dup ? ' of-dup' : ''}`}
                  aria-hidden={dup || undefined}
                  tabIndex={dup ? -1 : undefined}
                  onClick={copyPromo}
                >
                  {inner}
                </button>
              );
            }

            return (
              <Link
                key={`${item.key}-${idx}`}
                to={item.to}
                className={`of-pill${dup ? ' of-dup' : ''}`}
                aria-hidden={dup || undefined}
                tabIndex={dup ? -1 : undefined}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
