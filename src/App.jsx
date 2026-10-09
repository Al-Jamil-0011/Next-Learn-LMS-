import { BrowserRouter, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import { AppProvider } from './context/AppContext.jsx';
import { CatalogueProvider } from './context/CatalogueContext.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CoursePage from './pages/CoursePage.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import FreeClassPage from './pages/FreeClassPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RefundPage from './pages/RefundPage.jsx';
import StoriesPage from './pages/StoriesPage.jsx';
import TeachPage from './pages/TeachPage.jsx';
import VerifyPage from './pages/VerifyPage.jsx';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LanguageProvider>
        <AppProvider>
          <CatalogueProvider>
            <Layout>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/course/:slug" element={<CoursePage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/free" element={<FreeClassPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/teach" element={<TeachPage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/refund-policy" element={<RefundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Layout>
          </CatalogueProvider>
        </AppProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
