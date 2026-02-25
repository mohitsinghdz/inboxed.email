import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ComparisonPage from './pages/ComparisonPage';
import UseCasePage from './pages/UseCasePage';
import AlternativesPage from './pages/AlternativesPage';
import BestPrivateAI from './pages/BestPrivateAI';
import BlogIndex from './pages/BlogIndex';
import PostLocalAI from './pages/blog/PostLocalAI';
import PostBestAIEmailClients from './pages/blog/PostBestAIEmailClients';
import PostEmailPrivacyGuide from './pages/blog/PostEmailPrivacyGuide';
import PostInboxZeroAI from './pages/blog/PostInboxZeroAI';
import PostBestMacEmailClients from './pages/blog/PostBestMacEmailClients';
import PostSuperhumanAlternatives from './pages/blog/PostSuperhumanAlternatives';
import PostDeveloperWorkflow from './pages/blog/PostDeveloperWorkflow';
import PostZeroDataExit from './pages/blog/PostZeroDataExit';
import PostBlockTrackers from './pages/blog/PostBlockTrackers';
import PostAppleMailSlow from './pages/blog/PostAppleMailSlow';
import PostLLMTutorial from './pages/blog/PostLLMTutorial';
import PostGmailPrivacy from './pages/blog/PostGmailPrivacy';
import PostOnDeviceAI from './pages/blog/PostOnDeviceAI';
import PostEmailPrivacyAudit from './pages/blog/PostEmailPrivacyAudit';
import PostOfflineEmail from './pages/blog/PostOfflineEmail';
import DownloadPopup from './components/DownloadPopup';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false);

  useEffect(() => {
    const handleDownloadClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const trigger = target.closest('a, button') as HTMLElement | null;
      if (!trigger) return;
      if (trigger.closest('[data-download-modal]')) return;

      const label = (trigger.textContent ?? '').toLowerCase();
      const isDownloadTrigger = /\bdownload\b/.test(label);

      if (!isDownloadTrigger) return;

      event.preventDefault();
      setIsDownloadPopupOpen(true);
    };

    document.addEventListener('click', handleDownloadClick);

    return () => {
      document.removeEventListener('click', handleDownloadClick);
    };
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-black selection:text-white flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/compare/:slug" element={<ComparisonPage />} />
          <Route path="/best-email-for/:slug" element={<UseCasePage />} />
          <Route path="/alternatives/:slug" element={<AlternativesPage />} />
          <Route path="/best-private-ai-email" element={<BestPrivateAI />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/local-ai-email" element={<PostLocalAI />} />
          <Route path="/blog/best-ai-email-clients" element={<PostBestAIEmailClients />} />
          <Route path="/blog/email-privacy-guide" element={<PostEmailPrivacyGuide />} />
          <Route path="/blog/inbox-zero-ai" element={<PostInboxZeroAI />} />
          <Route path="/blog/best-mac-email-clients" element={<PostBestMacEmailClients />} />
          <Route path="/blog/superhuman-alternatives" element={<PostSuperhumanAlternatives />} />
          <Route path="/blog/developer-mac-email-workflow" element={<PostDeveloperWorkflow />} />
          <Route path="/blog/zero-data-exit-framework" element={<PostZeroDataExit />} />
          <Route path="/blog/block-email-trackers-mac" element={<PostBlockTrackers />} />
          <Route path="/blog/apple-mail-slow-vs-rust-native" element={<PostAppleMailSlow />} />
          <Route path="/blog/local-llm-email-drafting-tutorial" element={<PostLLMTutorial />} />
          <Route path="/blog/gmail-privacy-truth" element={<PostGmailPrivacy />} />
          <Route path="/blog/on-device-ai-email" element={<PostOnDeviceAI />} />
          <Route path="/blog/email-privacy-audit" element={<PostEmailPrivacyAudit />} />
          <Route path="/blog/offline-email-clients" element={<PostOfflineEmail />} />
        </Routes>
      </main>
      <Footer />
      <DownloadPopup
        isOpen={isDownloadPopupOpen}
        onClose={() => setIsDownloadPopupOpen(false)}
      />
    </div>
  )
}

export default App
