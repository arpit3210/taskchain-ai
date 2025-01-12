import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7E69AB] via-[#33C3F0] to-[#0EA5E9] p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10"></div>
      <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {description && (
            <p className="mt-2 text-white/80">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;