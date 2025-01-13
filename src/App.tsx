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
import { testConnection, testBackendConnection } from './lib/api';
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

  // useEffect(() => {
  //   let isMounted = true;

  //   const initConnections = async () => {
  //     try {
  //       // Database connection
  //       // const dbConnected = await connectDB();
        
  //       // Backend API connection
  //       await testConnection();
  //       await testBackendConnection();
  //       setIsBackendAPIConnected(true);

  //       if (isMounted) {
  //         setIsDBConnected(dbConnected);
  //         setIsBackendConnected(true);
  //       }
  //     } catch (error) {
  //       console.error('Connection Error:', error);
  //       if (isMounted) {
  //         setIsDBConnected(false);
  //         setIsBackendConnected(false);
  //         setIsBackendAPIConnected(false);
  //       }
  //     } finally {
  //       if (isMounted) {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   initConnections();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // Loading state
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <div role="status">
  //           <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  //             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
  //             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  //           </svg>
  //           <span className="sr-only">Loading...</span>
  //         </div>
  //         <p className="mt-4 text-gray-600">Connecting to services...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Connection failure state
  // if (!isDBConnected || !isBackendConnected || !isBackendAPIConnected) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-red-100">
  //       <div className="text-center">
  //         <h2 className="text-2xl text-red-600">Connection Failed</h2>
  //         <p className="text-gray-600 mt-2">
  //           {!isDBConnected && !isBackendConnected && !isBackendAPIConnected 
  //             ? "Database, Backend and Backend API services are unavailable" 
  //             : !isDBConnected 
  //               ? "Database connection failed" 
  //               : !isBackendConnected 
  //                 ? "Backend service connection failed" 
  //                 : "Backend API connection failed"}
  //         </p>
  //         <p className="text-gray-600 mt-2">Please check your network or contact support.</p>
  //       </div>
  //     </div>
  //   );
  // }




  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        await testBackendConnection();
        setIsDBConnected(true);
      } catch (error) {
        setIsDBConnected(false);
        console.error('Backend connection failed');
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
                    description="Sign in to continue to DecentralizedToDo"
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
                    description="Sign up to get started with DecentralizedToDo"
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