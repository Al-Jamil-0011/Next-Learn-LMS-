import { useState } from 'react';
import Icon, { Arrow } from '../components/common/Icon.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Reveal from '../components/common/Reveal.jsx';
import { useApp } from '../context/AppContext.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import { CONTACT_BG, CONTACT_FG } from '../data/courses.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { isValidBdMobile } from '../utils/format.js';

const EMPTY = { name: '', phone: '', topic: 'cf_o1', msg: '' };

export default function ContactPage() {
  const { t, x } = useLang();
  const { toast, confetti } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [err, setErr] = useState('');
  useDocumentTitle('Contact · NextLearn');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !isValidBdMobile(form.phone.replace(/\D/g, '')) || !form.msg.trim()) {
      setErr(x.cfErr);
      return;
    }
    setErr('');
    setForm(EMPTY);
    toast(x.cfOk);
    confetti();
  };

  const soon = (e) => {
    e.preventDefault();
    toast(x.soon);
  };

  return (
    <>
      <PageHero bg="bg_contact" crumb={t('nc')} title={t('cp_t')} sub={t('cp_s')} />
      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap contact">
          <div className="cinfo">
            {x.contacts.map(([icon, title, sub], i) => (
              <Reveal
                as="a"
                key={icon}
                className="cic"
                href={i === 0 ? 'tel:09610000000' : '#'}
                onClick={i === 0 ? undefined : soon}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="fi" style={{ background: CONTACT_BG[i], color: CONTACT_FG[i] }}><Icon name={icon} /></span>
                <span><b>{title}</b><small>{sub}</small></span>
              </Reveal>
            ))}
            <Reveal className="cmap">
              <span className="pinm"><svg viewBox="0 0 24 24"><use href="#i-pin" /></svg></span>
            </Reveal>
          </div>
          <Reveal as="form" className="cform" noValidate onSubmit={submit}>
            <h3>{t('cf_t')}</h3>
            <div className="row2">
              <label><span>{t('cf_n')}</span><input autoComplete="name" value={form.name} onChange={set('name')} /></label>
              <label><span>{t('cf_p')}</span><input inputMode="numeric" maxLength={11} placeholder="01XXX XXXXXX" value={form.phone} onChange={set('phone')} /></label>
            </div>
            <label>
              <span>{t('cf_s')}</span>
              <select className="sel" value={form.topic} onChange={set('topic')}>
                {['cf_o1', 'cf_o2', 'cf_o3', 'cf_o4'].map((k) => <option key={k} value={k}>{t(k)}</option>)}
              </select>
            </label>
            <label><span>{t('cf_m')}</span><textarea rows={5} value={form.msg} onChange={set('msg')} /></label>
            <div className="ferr" role="alert">{err}</div>
            <button type="submit" className="btn"><span>{t('cf_b')}</span><Arrow /></button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
