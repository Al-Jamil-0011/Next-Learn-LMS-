import { useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext.jsx';
import { useLang } from '../../context/LanguageContext.jsx';
import { CATIC, CATS, COURSES } from '../../data/courses.js';
import Icon from '../common/Icon.jsx';
import Reveal from '../common/Reveal.jsx';
import SectionHead from './SectionHead.jsx';

export default function Categories() {
  const { t, lang, x } = useLang();
  const { onlyCategory } = useCatalogue();
  const navigate = useNavigate();
  return (
    <section className="sec" id="cats">
      <div className="wrap">
        <SectionHead eyebrow={t('ct_e')} title={t('ct_t')} sub={t('ct_s')} />
        <div className="catgrid">
          {CATS.map((c, i) => (
            <Reveal
              as="button"
              type="button"
              key={c.id}
              className="catc"
              style={{ '--tb': c.tb, '--cb': c.bg, transitionDelay: `${(i % 4) * 70}ms` }}
              onClick={() => {
                onlyCategory(c.id);
                navigate('/courses');
              }}
            >
              <span className="ci"><Icon name={CATIC[c.id]} /></span>
              <span>
                <b>{c[lang]}</b>
                <small>{x.nc(COURSES.filter((k) => k.cat === c.id).length)}</small>
              </span>
              <span className="ca"><Icon name="arrow" small /></span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
