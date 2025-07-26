import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignIn, SignUp } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import AIIntegration from "./pages/AIIntegration";
import Pricing from "./pages/Pricing";
import Documentation from "./pages/Documentation";
import AuthLayout from "./components/auth/AuthLayout";
import Dashboard from "./pages/Dashboard";
import DashboardCompleted from "./pages/Dashboard_Complted";
import DashboardInProgress from "./pages/Dashboard_InProgress";
import React, { useEffect, useState } from 'react';
// import { connectDB } from './lib/db';
import { testBackendConnection } from './lib/api';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useLocation } from 'react-router-dom';

// Provide a properly formatted fallback key for development
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_Y2xlcmsuZGVjZW50cmFsaXplZHRvZG8uY29t';

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const [isDBConnected, setIsDBConnected] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isBackendAPIConnected, setIsBackendAPIConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const result = await testBackendConnection();
        console.log('Backend Connection Result:', result);
        setIsDBConnected(true);
      } catch (error) {
        console.error('Backend connection failed:', error);
        setIsDBConnected(false);
      }
    };

    checkBackendConnection();
  }, []);

  // Main app rendering
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <ScrollToTop />
            <Routes>
              {/* Existing routes */}
              <Route
                path="/login"
                element={
                  <SignedOut>
                    <Login />
                  </SignedOut>
                }
              />
              <Route
                path="/signup"
                element={
                  <SignedOut>
                    <Signup />
                  </SignedOut>
                }
              />
              {/* Protected routes */}
              <Route
                path="/Dashboard"
                element={
                  <SignedIn>
                    {/* Your Dashboard component */}
                    <Dashboard />
                    {/* <DashboardCompleted />
                    <DashboardInProgress /> */}
                  </SignedIn>
                }
              />
              <Route
                path="/inprogress"
                element={
                  <SignedIn>
                    {/* Your Dashboard component */}
                    <DashboardInProgress />
                  </SignedIn>
                }
              />
              <Route
                path="/completed"
                element={
                  <SignedIn>
                    {/* Your Dashboard component */}
                    <DashboardCompleted /> 
                  </SignedIn>
                }
              />
              <Route
                path="*"
                element={
                  <SignedIn>
                    <RedirectToSignIn />
                  </SignedIn>
                }
              />


              {/* Route for dashboard    */}
              <Route path="/dashboard-completed" element={<DashboardCompleted />} />
              <Route path="/dashboard-in-progress" element={<DashboardInProgress />} />
              
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Index />} />
              <Route path="/features" element={<Features />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/ai-integration" element={<AIIntegration />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route
                path="/sign-in/*"
                element={
                  <AuthLayout
                    title="Welcome Back"
                    description="Sign in to continue to AuraTask"
                  >
                    <SignIn
                      appearance={{
                        elements: {
                          formButtonPrimary:
                            "bg-gradient-to-r from-[#FEF7CD] to-[#F97316] text-blockchain-dark hover:opacity-90 transition-opacity",
                          card: "bg-transparent shadow-none",
                          headerTitle: "text-white",
                          headerSubtitle: "text-white/80",
                          socialButtonsBlockButton: "bg-white/10 border border-white/20 text-white hover:bg-white/20",
                          formFieldInput: "bg-white/10 border border-white/20 text-white",
                          formFieldLabel: "text-white",
                          footerActionLink: "text-[#FEF7CD] hover:text-[#F97316]"
                        }
                      }}
                    />
                  </AuthLayout>
                }
              />
              <Route
                path="/sign-up/*"
                element={
                  <AuthLayout
                    title="Create Account"
                    description="Sign up to get started with AuraTask"
                  >
                    <SignUp
                      appearance={{
                        elements: {
                          formButtonPrimary:
                            "bg-gradient-to-r from-[#FEF7CD] to-[#F97316] text-blockchain-dark hover:opacity-90 transition-opacity",
                          card: "bg-transparent shadow-none",
                          headerTitle: "text-white",
                          headerSubtitle: "text-white/80",
                          socialButtonsBlockButton: "bg-white/10 border border-white/20 text-white hover:bg-white/20",
                          formFieldInput: "bg-white/10 border border-white/20 text-white",
                          formFieldLabel: "text-white",
                          footerActionLink: "text-[#FEF7CD] hover:text-[#F97316]"
                        }
                      }}
                    />
                  </AuthLayout>
                }
              />
            </Routes>
          </BrowserRouter>
          {/* <TodoistFooter /> */}
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;