import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon, { Arrow } from '../components/common/Icon.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Reveal from '../components/common/Reveal.jsx';
import SectionHead from '../components/home/SectionHead.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useCatalogue } from '../context/CatalogueContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { ABOUT_DATA, CAREER_DATA } from '../data/company.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { isValidBdMobile, isValidEmail } from '../utils/format.js';

const DEPTS = [
  { id: 'all', en: 'All roles', bn: 'সকল পদ' },
  { id: 'academics', en: 'Academics & Career', bn: 'অ্যাকাডেমিক্স ও ক্যারিয়ার' },
  { id: 'engineering', en: 'Engineering', bn: 'ইঞ্জিনিয়ারিং' },
  { id: 'growth', en: 'Growth & Media', bn: 'গ্রোথ ও মিডিয়া' },
];

export default function CareerPage() {
  const { lang, num } = useLang();
  const { onlyCategory } = useCatalogue();
  const { toast, confetti } = useApp();
  const navigate = useNavigate();
  const bn = lang === 'bn';

  useDocumentTitle(bn ? 'ক্যারিয়ার · NextLearn' : 'Career · NextLearn');

  const [dept, setDept] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', link: '', note: '' });
  const [err, setErr] = useState('');
  const [submittedJob, setSubmittedJob] = useState(null);
  const formBoxRef = useRef(null);

  const visibleJobs =
    dept === 'all' ? CAREER_DATA.openings : CAREER_DATA.openings.filter((j) => j.dept === dept);

  const openTrack = (cat) => {
    onlyCategory(cat);
    navigate('/courses');
  };

  const startApply = (job) => {
    setSelectedJob(job);
    setSubmittedJob(null);
    setErr('');
    setTimeout(() => {
      formBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const submitApplication = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setErr(bn ? 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।' : 'Please enter your full name.');
      return;
    }
    if (!isValidEmail(form.email.trim())) {
      setErr(bn ? 'সঠিক ইমেইল ঠিকানা দিন।' : 'Please enter a valid email address.');
      return;
    }
    if (!isValidBdMobile(form.phone.replace(/\D/g, ''))) {
      setErr(bn ? 'সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।' : 'Enter a valid 11-digit mobile number.');
      return;
    }
    if (!/^https?:\/\/.+/i.test(form.link.trim())) {
      setErr(
        bn
          ? 'সিভি বা পোর্টফোলিওর একটি সঠিক লিংক দিন (https://...)।'
          : 'Enter a valid CV or portfolio URL starting with https://',
      );
      return;
    }
    setErr('');
    setSubmittedJob(selectedJob);
    setForm({ name: '', email: '', phone: '', link: '', note: '' });
    toast(bn ? 'আপনার আবেদন সফলভাবে জমা হয়েছে!' : 'Your application has been submitted!');
    confetti();
  };

  return (
    <div className="cr-page">
      <PageHero
        bg="bg_stories"
        crumb={bn ? 'ক্যারিয়ার' : 'Career'}
        title={bn ? 'দক্ষতা থেকে স্বপ্নের ক্যারিয়ারে।' : 'Turn practical skills into a real career.'}
        sub={
          bn
            ? 'কোর্স শেষে পোর্টফোলিও রিভিউ, মক ইন্টারভিউ ও হায়ারিং পার্টনার রেফারেল — পাশাপাশি NextLearn টিমে যুক্ত হওয়ার সুযোগ।'
            : 'Dedicated job placement support for learners — portfolio reviews, mock interviews & hiring partner referrals — plus open roles on the NextLearn team.'
        }
      >
        <div className="co-teach-hero-actions">
          <a href="#career-tracks" className="btn btn-yellow magnet">
            <span>{bn ? 'ক্যারিয়ার ট্র্যাক দেখুন' : 'Explore Career Tracks'}</span>
            <Arrow />
          </a>
          <a
            href="#open-roles"
            className="btn btn-line"
            style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            <span>{bn ? 'NextLearn-এ চাকরির সুযোগ' : 'Open Roles at NextLearn'}</span>
          </a>
        </div>
      </PageHero>

      {/* Career Placement Support Pillars */}
      <section className="sec" id="placement-support">
        <div className="wrap">
          <SectionHead
            eyebrow={bn ? 'ক্যারিয়ার সেল সাপোর্ট' : 'Career placement cell'}
            title={bn ? 'শুধু কোর্স নয়, চাকরি প্রস্তুতিতেও পাশে আছি।' : 'Built to get you hired, not just certified.'}
            sub={
              bn
                ? 'আমাদের ৮৬% গ্র্যাজুয়েট কোর্স শেষ করার পর চাকরি বা প্রথম ফ্রিল্যান্স ক্লায়েন্ট পেয়েছেন।'
                : '86% of our active graduates land a job or their first freelance client with structured career support.'
            }
          />

          <div className="cr-pillars">
            {CAREER_DATA.supportPillars.map((p, idx) => (
              <Reveal key={idx} className="co-card cr-pillar" style={{ transitionDelay: `${idx * 65}ms` }}>
                <span className="cr-pillar-ic" style={{ background: p.bg, color: p.fg }}>
                  <Icon name={p.icon} />
                </span>
                <h3>{p[lang].title}</h3>
                <p>{p[lang].desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guided Career Tracks */}
      <section className="sec soft" id="career-tracks">
        <div className="wrap">
          <SectionHead
            eyebrow={bn ? 'লক্ষ্যভিত্তিক পথ' : 'Career tracks'}
            title={bn ? 'আপনার পছন্দের ক্যারিয়ার রোডম্যাপ বেছে নিন।' : 'Pick a high-growth career path.'}
            sub={
              bn
                ? 'দেশের টেক ইন্ডাস্ট্রি ও গ্লোবাল ফ্রিল্যান্স মার্কেটের চাহিদা অনুযায়ী সাজানো ক্যারিয়ার ট্র্যাক।'
                : 'Structured learning tracks mapped to what Bangladesh tech teams and global freelance clients actually hire for.'
            }
          />

          <div className="cr-tracks">
            {CAREER_DATA.tracks.map((tr, idx) => (
              <Reveal key={tr.id} className="cr-track" style={{ transitionDelay: `${idx * 70}ms` }}>
                <div className="cr-track-top" style={{ background: tr.accent }}>
                  <span className="pill glass">{tr[lang].badge}</span>
                  <span className="cr-track-ic">
                    <Icon name={tr.icon} />
                  </span>
                </div>
                <div className="cr-track-body">
                  <h3>{tr[lang].title}</h3>
                  <div className="cr-track-meta">
                    <span>
                      <Icon name="brief" small />
                      {tr[lang].salary}
                    </span>
                    <span>
                      <Icon name="clock" small />
                      {tr[lang].duration}
                    </span>
                  </div>
                  <p>{tr[lang].desc}</p>
                  <button type="button" className="btn btn-sm" onClick={() => openTrack(tr.cat)}>
                    <span>{bn ? 'এই ট্র্যাকের কোর্স দেখুন' : 'Browse Track Courses'}</span>
                    <Arrow />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles at NextLearn */}
      <section className="sec" id="open-roles">
        <div className="wrap">
          <SectionHead
            eyebrow={bn ? 'আমাদের টিমে যোগ দিন' : 'Work at NextLearn'}
            title={bn ? 'NextLearn-এর বর্তমান চাকরির সুযোগ।' : 'Help us build the future of learning.'}
            sub={
              bn
                ? '৬৪ জেলার শিক্ষার্থীদের জন্য মানসম্মত শিক্ষা সহজলভ্য করতে আমাদের টিমের অংশ হোন।'
                : 'Join a focused team of engineers, educators, and creators empowering learners across all 64 districts.'
            }
          />

          <div className="cr-dept-tabs" role="tablist" aria-label={bn ? 'বিভাগ' : 'Departments'}>
            {DEPTS.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={dept === d.id}
                className={`cr-dept-btn${dept === d.id ? ' on' : ''}`}
                onClick={() => setDept(d.id)}
              >
                {d[lang]}
              </button>
            ))}
          </div>

          <div className="cr-jobs">
            {visibleJobs.map((job, idx) => {
              const active = selectedJob?.id === job.id;
              return (
                <Reveal
                  key={job.id}
                  className={`cr-job${active ? ' active' : ''}`}
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  <div className="cr-job-main">
                    <div className="cr-job-tags">
                      <span className="pill">{job[lang].deptLabel}</span>
                      <span className="pill plain">{job[lang].type}</span>
                      <span className="pill mint">{job[lang].loc}</span>
                    </div>
                    <h3>{job[lang].title}</h3>
                    <p>{job[lang].desc}</p>
                    <div className="cr-job-sal">
                      <Icon name="pay" small />
                      <span>{job[lang].salary}</span>
                    </div>
                  </div>
                  <div className="cr-job-act">
                    <button
                      type="button"
                      className={`btn btn-sm${active ? ' btn-ink' : ''}`}
                      onClick={() => startApply(job)}
                    >
                      <span>{bn ? 'আবেদন করুন' : 'Apply Now'}</span>
                      <Arrow />
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Inline Quick Application Box */}
          {(selectedJob || submittedJob) && (
            <div ref={formBoxRef} className="cr-apply-wrap">
              {submittedJob ? (
                <div className="co-success-card" style={{ maxWidth: 680, margin: '0 auto' }}>
                  <div className="co-success-icon">
                    <Icon name="checkc" />
                  </div>
                  <h3>{bn ? 'আবেদন গৃহীত হয়েছে!' : 'Application Received!'}</h3>
                  <p style={{ color: 'var(--muted)' }}>
                    {bn
                      ? `আপনি "${submittedJob.bn.title}" পদের জন্য আবেদন করেছেন। আমাদের টিম ৪৮ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।`
                      : `You applied for "${submittedJob.en.title}". Our talent team will review your profile within 48 hours.`}
                  </p>
                  <button
                    type="button"
                    className="btn btn-line btn-sm"
                    onClick={() => {
                      setSelectedJob(null);
                      setSubmittedJob(null);
                    }}
                  >
                    <span>{bn ? 'অন্য পদ দেখুন' : 'View Other Roles'}</span>
                  </button>
                </div>
              ) : (
                <div className="cr-apply-card">
                  <div className="cr-apply-head">
                    <div>
                      <span className="eyebrow" style={{ marginBottom: 6 }}>
                        <i />
                        <span>{bn ? 'দ্রুত আবেদন' : 'Quick Application'}</span>
                      </span>
                      <h3>{selectedJob[lang].title}</h3>
                      <p>
                        {selectedJob[lang].deptLabel} · {selectedJob[lang].loc}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mx"
                      aria-label="Close"
                      onClick={() => setSelectedJob(null)}
                    >
                      <Icon name="x" small />
                    </button>
                  </div>

                  <form onSubmit={submitApplication} noValidate className="cr-apply-form">
                    <div className="row2">
                      <label>
                        <span>{bn ? 'পূর্ণ নাম *' : 'Full name *'}</span>
                        <input
                          type="text"
                          placeholder={bn ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </label>
                      <label>
                        <span>{bn ? 'ইমেইল ঠিকানা *' : 'Email address *'}</span>
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </label>
                    </div>
                    <div className="row2">
                      <label>
                        <span>{bn ? 'মোবাইল নম্বর *' : 'Mobile number *'}</span>
                        <input
                          type="tel"
                          maxLength={11}
                          placeholder="017XXXXXXXX"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </label>
                      <label>
                        <span>{bn ? 'সিভি / লিংকডইন / পোর্টফোলিও লিংক *' : 'CV / LinkedIn / Portfolio URL *'}</span>
                        <input
                          type="url"
                          placeholder="https://linkedin.com/in/..."
                          value={form.link}
                          onChange={(e) => setForm({ ...form, link: e.target.value })}
                        />
                      </label>
                    </div>
                    <label>
                      <span>{bn ? 'সংক্ষিপ্ত পরিচিতি (ঐচ্ছিক)' : 'Short note (optional)'}</span>
                      <textarea
                        rows={3}
                        placeholder={
                          bn
                            ? 'আপনার পূর্ববর্তী অভিজ্ঞতা সম্পর্কে সংক্ষেপে লিখুন...'
                            : 'Tell us briefly about your relevant experience...'
                        }
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                      />
                    </label>
                    {err && (
                      <div className="ferr" role="alert">
                        {err}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <button type="submit" className="btn btn-yellow magnet">
                        <span>{bn ? 'আবেদন জমা দিন' : 'Submit Application'}</span>
                        <Arrow />
                      </button>
                      <button
                        type="button"
                        className="btn btn-line"
                        onClick={() => setSelectedJob(null)}
                      >
                        <span>{bn ? 'বাতিল' : 'Cancel'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Hiring Partners Marquee */}
      <section className="sec soft" style={{ paddingBlock: '56px' }}>
        <div className="wrap" style={{ textAlign: 'center', marginBottom: 20 }}>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            <i />
            {bn ? 'হায়ারিং নেটওয়ার্ক' : 'Hiring network'}
          </span>
          <h2 className="h2" style={{ fontSize: '1.45rem', color: 'var(--muted)' }}>
            {bn
              ? `আমাদের ${num(48000)}+ শিক্ষার্থী দেশ-বিদেশের যেসব প্রতিষ্ঠানে কাজ করছেন (নমুনা)`
              : 'Teams where NextLearn alumni work (sample partners)'}
          </h2>
        </div>
        <div className="mq" aria-label="Hiring Partners">
          <div className="mq-in" style={{ gap: '20px' }}>
            {[...ABOUT_DATA.partners, ...ABOUT_DATA.partners].map((name, i) => (
              <span key={i} className="co-partner-tag">
                <Icon name="brief" small />
                <span>{name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="sec" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <Reveal className="co-cta-band">
            <h2>{bn ? 'ক্যারিয়ার গড়তে আজই প্রথম ধাপ নিন।' : 'Take the first step toward your next role.'}</h2>
            <p>
              {bn
                ? 'আমাদের লাইভ কোর্সগুলো দেখুন অথবা আগে একটি ফ্রি ক্লাসে অংশ নিয়ে নিজেই যাচাই করুন।'
                : 'Explore our live mentor-led courses or sit in on a free live class before you decide.'}
            </p>
            <div className="co-cta-btns">
              <Link to="/courses" className="btn btn-yellow magnet">
                <span>{bn ? 'কোর্সগুলো দেখুন' : 'Browse Courses'}</span>
              </Link>
              <Link
                to="/free"
                className="btn btn-line"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                <span>{bn ? 'ফ্রি ক্লাস করুন' : 'Try a Free Class'}</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
