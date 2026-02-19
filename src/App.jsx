import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import FeaturesPage from './FeaturesPage';
import PricingPage from './PricingPage';
import LoginPage from './LoginPage';
import LanguageSetup from './onboarding/LanguageSetup';
import ProfileSetup from './onboarding/ProfileSetup';
import InterestSetup from './onboarding/InterestSetup';
import FeedPage from './FeedPage';
import PostThreadPage from './PostThreadPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding/start" element={<LanguageSetup />} />
        <Route path="/onboarding/profile" element={<ProfileSetup />} />
        <Route path="/onboarding/interests" element={<InterestSetup />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/post" element={<PostThreadPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="pricing" element={<PricingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
