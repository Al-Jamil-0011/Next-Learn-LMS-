import Categories from '../components/home/Categories.jsx';
import Featured from '../components/home/Featured.jsx';
import FreeTeaser from '../components/home/FreeTeaser.jsx';
import Hero from '../components/home/Hero.jsx';
import HomeFaq from '../components/home/HomeFaq.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import Logos from '../components/home/Logos.jsx';
import Mentors from '../components/home/Mentors.jsx';
import Stats from '../components/home/Stats.jsx';
import Stories from '../components/home/Stories.jsx';
import WhyCertificate from '../components/home/WhyCertificate.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function HomePage() {
  useDocumentTitle('NextLearn: learn practical skills in Bangla');
  return (
    <>
      <Hero />
      <Stats />
      <Logos />
      <Categories />
      <Featured />
      <HowItWorks />
      <WhyCertificate />
      <Mentors />
      <Stories />
      <FreeTeaser />
      <HomeFaq />
    </>
  );
}
