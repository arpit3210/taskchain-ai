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

// Provide a fallback key for development
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_dummy-key-for-development';

const queryClient = new QueryClient();

const App = () => (
  <ClerkProvider publishableKey={publishableKey}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
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
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;