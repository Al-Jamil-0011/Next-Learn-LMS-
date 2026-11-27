import { bnDigits } from '../../../utils/format.js';
import Icon from '../../common/Icon.jsx';
import Media from '../../common/Media.jsx';

const BAR_COLORS = [
  'var(--cobalt)',
  'var(--saffron)',
  'var(--cobalt)',
  'var(--cobalt)',
  'var(--saffron)',
  'var(--cobalt)',
  'var(--saffron)',
  'var(--cobalt)',
  'var(--saffron)',
];

const QR_GAPS = new Set([2, 6, 10, 14, 18, 22]);

/** 1. Live class video-call window with mentor photo, LIVE pill & bouncing equaliser */
function LiveClassViz({ bn }) {
  return (
    <div className="viz-live">
      <div className="viz-call">
        <div className="viz-call-top">
          <span className="viz-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="viz-live-pill">
            <i />
            <span>LIVE</span>
          </span>
        </div>
        <div className="viz-call-mid">
          <span className="viz-av">
            <Media img="mFarhana" ini="FA" />
          </span>
          <div className="viz-eq">
            {BAR_COLORS.map((c, idx) => (
              <i
                key={idx}
                style={{
                  background: c,
                  animationDelay: `${idx * 0.08}s`,
                  animationDuration: `${idx % 2 === 0 ? 0.72 : 0.98}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="viz-call-cap">
          {bn ? 'রাত ৮:০০ · ১২৪ জন দেখছেন' : '8:00 pm · 124 watching'}
        </div>
      </div>
    </div>
  );
}

/** 2. Design-canvas wireframe with comment pins, feedback bubble & Approved stamp */
function ProjectReviewViz({ bn }) {
  return (
    <div className="viz-review">
      <div className="viz-canvas">
        <div className="viz-wf-head" />
        <div className="viz-wf-body">
          <div className="viz-wf-img" />
          <div className="viz-wf-lines">
            <span />
            <span />
          </div>
        </div>
        <span className="viz-pin p1">1</span>
        <span className="viz-pin p2">2</span>
        <span className="viz-cbubble">
          {bn ? 'স্পেসিং ঠিক আছে' : 'Spacing looks good'}
        </span>
        <span className="viz-approved">
          <Icon name="check" small />
          <span>Approved</span>
        </span>
      </div>
    </div>
  );
}

/** 3. Mini video player with play button, progress bar loop & infinity badge */
function RecordingViz({ bn }) {
  return (
    <div className="viz-rec">
      <div className="viz-player">
        <span className="viz-play">
          <Icon name="play" small />
        </span>
        <div className="viz-pmeta">
          <span className="viz-ptitle">
            {bn ? 'ক্লাস ১২ · অটো লেআউট' : 'Class 12 · Auto layout'}
          </span>
          <span className="viz-pbar">
            <i />
          </span>
          <span className="viz-ptime">
            {bn ? '১২:৪০ / ৫৮:১০' : '12:40 / 58:10'}
          </span>
        </div>
        <span className="viz-inf">∞</span>
      </div>
    </div>
  );
}

/** 4. Mini checkout card with bKash/Nagad/EMI chips & 5-segment instalment bar */
function PaymentViz({ bn }) {
  const chips = bn
    ? [
        ['বিকাশ', '#D9442A'],
        ['নগদ', '#E8681A'],
        ['কিস্তি', 'var(--ink)'],
      ]
    : [
        ['bKash', '#D9442A'],
        ['Nagad', '#E8681A'],
        ['EMI', 'var(--ink)'],
      ];

  return (
    <div className="viz-pay">
      <div className="viz-pay-card">
        <div className="viz-pchips">
          {chips.map(([label, color]) => (
            <span key={label} style={{ color }}>
              {label}
            </span>
          ))}
        </div>
        <div className="viz-pamt">
          {bn ? '৳৩,০০০ × ৫ কিস্তি' : '৳3,000 × 5 parts'}
        </div>
        <div className="viz-segs">
          {[0, 1, 2, 3, 4].map((n) => (
            <span key={n} className="viz-seg">
              <i style={{ '--seg-d': `${n * 0.4}s` }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 5. Mini 5x5 QR with sweeping violet scan line, ID chip & Valid badge */
function CertScanViz({ bn }) {
  return (
    <div className="viz-cert">
      <div className="viz-qr-card">
        <div className="viz-qr">
          {Array.from({ length: 25 }, (_, i) => (
            <i key={i} className={QR_GAPS.has(i) ? 'gap' : undefined} />
          ))}
          <span className="viz-scan" />
        </div>
        <div className="viz-qr-meta">
          <span className="viz-idchip">NL-24-08812</span>
          <span className="viz-valid">
            <Icon name="check" small />
            <span>{bn ? 'বৈধ' : 'Valid'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** 6. Analogue clock (11 pm) + two-message support chat with typing indicator */
function SupportViz({ bn }) {
  return (
    <div className="viz-sup">
      <div className="viz-clock">
        <span className="viz-chour" />
        <span className="viz-cmin" />
        <span className="viz-cdot" />
      </div>
      <div className="viz-chat">
        <span className="viz-msg in">
          {bn ? 'পেমেন্টে সমস্যা হচ্ছে' : 'Payment issue?'}
        </span>
        <span className="viz-msg out">
          <span className="viz-typing">
            <i />
            <i />
            <i />
          </span>
          <span className="viz-reply">
            {bn ? 'এখনই দেখছি' : 'Checking now'}
          </span>
        </span>
      </div>
    </div>
  );
}

const PREVIEWS = [
  LiveClassViz,
  ProjectReviewViz,
  RecordingViz,
  PaymentViz,
  CertScanViz,
  SupportViz,
];

export default function FeatureViz({ index, lang }) {
  const bn = lang === 'bn';
  const Comp = PREVIEWS[index] || LiveClassViz;
  // Keep helper reference available if needed for dynamic numbers
  void bnDigits;
  return (
    <div className="viz" aria-hidden="true">
      <Comp bn={bn} />
    </div>
  );
}
