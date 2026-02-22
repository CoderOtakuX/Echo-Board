import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import Layout from './Layout';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import FeaturesPage from './FeaturesPage';
import PricingPage from './PricingPage';
import LoginPage from './LoginPage';
import LanguageSetup from './onboarding/LanguageSetup';
import ProfileSetup from './onboarding/ProfileSetup';
import NotificationsPage from './NotificationsPage';
import SavedPostsPage from './SavedPostsPage';
import SettingsPage from './SettingsPage';
import { supabase } from './lib/supabase';
import InterestSetup from './onboarding/InterestSetup';
import FeedPage from './FeedPage';
import PostThreadPage from './PostThreadPage';
import TrendingPage from './TrendingPage';
import CommunitiesPage from './CommunitiesPage';
import CommunityDetailPage from './CommunityDetailPage';

import { useTranslation } from 'react-i18next';

// Protected Route Wrapper - Just requires auth
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><Navigate to="/login" replace /></SignedOut>
    </>
  );
};

// Protected App Route Wrapper - Requires auth AND onboarding
const AppProtectedRoute = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C63FF]"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  const onboardingComplete = user?.publicMetadata?.onboardingComplete || user?.unsafeMetadata?.onboardingComplete;

  console.log('[AppProtectedRoute] Trace:', {
    isSignedIn,
    isLoaded,
    userId: user?.id,
    onboardingComplete,
    publicMetadata: user?.publicMetadata,
    unsafeMetadata: user?.unsafeMetadata
  });

  if (!onboardingComplete) {
    console.log('[AppProtectedRoute] Redirecting to onboarding/start');
    return <Navigate to="/onboarding/start" replace />;
  }

  return children;
};

const AuthRedirect = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C63FF]"></div>
      </div>
    );
  }

  if (user) {
    const onboardingComplete = user.publicMetadata?.onboardingComplete || user.unsafeMetadata?.onboardingComplete;
    return onboardingComplete ? <Navigate to="/feed" replace /> : <Navigate to="/onboarding/start" replace />;
  }

  return <Navigate to="/login" replace />;
};

function App() {
  const { i18n } = useTranslation();
  const { user, isLoaded } = useUser();

  React.useEffect(() => {
    if (isLoaded && user) {
      const preferredLanguage = user.unsafeMetadata?.preferredLanguage;
      // Get current language details
      const currentLangCode = (i18n.language || 'en').split('-')[0];
      console.log('[App] i18n sync check:', {
        preferredLanguage,
        currentLang: i18n.language, // Keep full code for comparison
        currentLangBase: currentLangCode, // Add base code for comparison
        userId: user.id
      });
      if (preferredLanguage && currentLangCode !== preferredLanguage) {
        console.log('[App] Switching language to:', preferredLanguage);
        i18n.changeLanguage(preferredLanguage);
      }
    }
  }, [isLoaded, user, i18n]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Onboarding Routes */}
        <Route path="/onboarding/start" element={
          <ProtectedRoute>
            <LanguageSetup />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileSetup />
          </ProtectedRoute>
        } />
        <Route path="/interests" element={
          <ProtectedRoute>
            <InterestSetup />
          </ProtectedRoute>
        } />

        {/* Protected App Routes */}
        <Route path="/feed" element={
          <AppProtectedRoute>
            <FeedPage />
          </AppProtectedRoute>
        } />
        <Route path="/post/:id" element={
          <AppProtectedRoute>
            <PostThreadPage />
          </AppProtectedRoute>
        } />
        <Route path="/trending" element={
          <AppProtectedRoute>
            <TrendingPage />
          </AppProtectedRoute>
        } />
        <Route path="/communities" element={
          <AppProtectedRoute>
            <CommunitiesPage />
          </AppProtectedRoute>
        } />
        <Route path="/community/:id" element={
          <AppProtectedRoute>
            <CommunityDetailPage />
          </AppProtectedRoute>
        } />

        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="auth-redirect" element={<AuthRedirect />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/saved" element={<SavedPostsPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
