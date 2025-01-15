import React from 'react';
import { SignUp } from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blockchain-primary via-ai-primary to-blockchain-secondary flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-2xl space-y-6">
            <h2 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-[#FEF7CD] to-[#F97316] bg-clip-text text-transparent">
              Create Your Account
            </h2>
            
            <SignUp 
              appearance={{
                layout: {
                  socialButtonsVariant: "iconButton",
                  logoImageUrl: "/logo.svg",
                  logoLinkUrl: "/",
                },
                elements: {
                  footer: "hidden",
                  formButtonPrimary: `
                    w-full 
                    bg-gradient-to-r from-[#FEF7CD] to-[#F97316] 
                    text-blockchain-dark 
                    hover:opacity-90 
                    transition-opacity 
                    py-3 
                    rounded-xl 
                    text-lg 
                    font-semibold
                  `,
                  card: "bg-transparent shadow-none w-full",
                  headerTitle: "text-white hidden",
                  headerSubtitle: "text-gray-300 hidden",
                  socialButtonsBlockButton: `
                    border-2 border-white/20 
                    text-white 
                    hover:bg-white/10 
                    rounded-xl 
                    transition-all 
                    duration-300 
                    flex 
                    items-center 
                    justify-center 
                    space-x-2 
                    py-3
                  `,
                  socialButtonsBlockButtonText: "text-white",
                  formFieldLabel: "text-gray-200 font-medium",
                  formFieldInput: `
                    bg-white/10 
                    border-2 border-white/20 
                    text-white 
                    focus:border-[#F97316] 
                    focus:ring-[#F97316] 
                    rounded-xl 
                    py-3 
                    px-4 
                    transition-all 
                    duration-300
                  `,
                  dividerLine: "bg-white/20",
                  dividerText: "text-gray-300 px-4",
                }
              }} 
            />
            
            {/* Custom Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-300">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-[#F97316] hover:underline font-semibold"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;