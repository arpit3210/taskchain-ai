// import React from 'react';
import CTA from "./CTA";
// FooterLink component for consistent link styling
const FooterLink = ({ href = "#", children, className = "" }) => (
  <a 
    href={href}
    className={`text-gray-200 hover:text-white transition-colors duration-200 ${className}`}
  >
    {children}
  </a>
);

// SocialIcon component for consistent social media icons
const SocialIcon = ({ href, ariaLabel, children }) => (
  <FooterLink 
    href={href} 
    className="hover:scale-110 transform transition-transform duration-200"
    aria-label={ariaLabel}
  >
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      {children}
    </svg>
  </FooterLink>
);

const SocialLinks = () => (
  <div className="flex gap-6 mt-6" aria-label="Social media links">
    <SocialIcon href="#" ariaLabel="Twitter">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
    </SocialIcon>
    <SocialIcon href="#" ariaLabel="YouTube">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
    </SocialIcon>
    <SocialIcon href="#" ariaLabel="Facebook">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
    </SocialIcon>
    <SocialIcon href="#" ariaLabel="Instagram">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </SocialIcon>
  </div>
);

const FooterSection = ({ title, items }) => (
  <div className="flex flex-col gap-4">
    <h3 className="font-medium text-lg text-white mb-2">{title}</h3>
    <ul className="flex flex-col gap-3">
      {items.map((item, index) => (
        <li key={index}>
          {typeof item === 'object' ? (
            <div className="flex items-center gap-2">
              <FooterLink href="#">{item.text}</FooterLink>
              <span className="bg-green-400 text-gray-900 text-xs px-2 py-1 rounded-full font-medium">
                {item.badge}
              </span>
            </div>
          ) : (
            <FooterLink href="#">{item}</FooterLink>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const TodoistFooter = () => {
  const featuresItems = ['How It Works', 'For Teams', 'Pricing', 'Templates'];
  const resourcesItems = [
    'Download Apps',
    'Help Center',
    'Productivity Methods',
    'Integrations',
    'Channel Partners',
    'Developer API',
    'Status'
  ];
  const companyItems = [
    'About Us',
    { text: 'Careers', badge: "We're hiring!" },
    'Inspiration Hub',
    'Press',
    'Twist'
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#7E69AB] via-[#33C3F0] to-[#0EA5E9] py-16 px-4 md:px-8">

<CTA></CTA>

      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo and Description Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 group">
              <svg 
                className="w-8 h-8 text-white transform transition-transform group-hover:scale-110" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M3 0h18c1.7 0 3 1.3 3 3v18c0 1.7-1.3 3-3 3H3c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3z"/>
              </svg>
              <span className="text-xl font-bold text-white">DecentralizedToDo</span>
            </div>
            <p className="text-gray-200 mb-6 leading-relaxed">
              Join millions of people who organize work and life with Todoist.
            </p>
            <SocialLinks />
          </div>

          {/* Footer Sections */}
          <FooterSection title="Features" items={featuresItems} />
          <FooterSection title="Resources" items={resourcesItems} />
          <FooterSection title="Company" items={companyItems} />
        </div>
        
        {/* Bottom Footer */}
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-200">
            <FooterLink href="#">Security</FooterLink>
            <span className="text-gray-400">|</span>
            <FooterLink href="#">Privacy</FooterLink>
            <span className="text-gray-400">|</span>
            <FooterLink href="#">Terms</FooterLink>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-200 order-3 sm:order-2">
            © {new Date().getFullYear()} Doist Inc.
          </div>

          {/* Language Selector */}
          <div className="order-2 sm:order-3">
            <button 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-105"
              aria-label="Select language"
            >
              <span>English</span>
              <svg 
                className="w-4 h-4 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TodoistFooter;