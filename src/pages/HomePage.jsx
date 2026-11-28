import Categories from '../components/home/Categories.jsx';
import EnrollBanner from '../components/home/EnrollBanner.jsx';
import EnrollProof from '../components/home/EnrollProof.jsx';
import Featured from '../components/home/Featured.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import Hero from '../components/home/Hero.jsx';
import HomeFaq from '../components/home/HomeFaq.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import Logos from '../components/home/Logos.jsx';
import Mentors from '../components/home/Mentors.jsx';
import Stats from '../components/home/Stats.jsx';
import Stories from '../components/home/Stories.jsx';
import WhyCertificate from '../components/home/WhyCertificate.jsx';
import StickyEnroll from '../components/layout/StickyEnroll.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function HomePage() {
  useDocumentTitle('Technofy Bangladesh — Learn practical skills in Bangla');
  return (
    <>
      <Hero />
      <Stats />
      <Logos />
      <Categories />
      <Featured />
      <EnrollBanner />
      <HowItWorks />
      <WhyCertificate />
      <Mentors />
      <Stories />
      <EnrollProof />
      <HomeFaq />
      <FinalCta />
      <StickyEnroll />
    </>
  );
}
