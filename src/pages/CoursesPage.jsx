import PageHero from '../components/common/PageHero.jsx';
import Reveal from '../components/common/Reveal.jsx';
import Catalogue from '../components/courses/Catalogue.jsx';
import TypeTiles from '../components/courses/TypeTiles.jsx';
import SectionHead from '../components/home/SectionHead.jsx';
import { useLang } from '../context/LanguageContext.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function CoursesPage() {
  const { t } = useLang();
  useDocumentTitle('All courses · NextLearn');
  return (
    <>
      <PageHero bg="bg_courses" crumb={t('nav1')} title={t('pc_t')} sub={t('pc_s')}>
        <Reveal className="ph-stats">
          <span><b>14</b> <span>{t('pc1')}</span></span>
          <span><b>8</b> <span>{t('pc2')}</span></span>
          <span><b>6</b> <span>{t('pc3')}</span></span>
        </Reveal>
      </PageHero>
      <section className="sec" id="types" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <SectionHead eyebrow={t('ty_e')} title={t('ty_t')} sub={t('ty_s')} />
          <TypeTiles />
        </div>
      </section>
      <Catalogue />
    </>
  );
}
