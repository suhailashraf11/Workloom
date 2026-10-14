
import AuthBrandPanel from '../components/auth/AuthBrandPanel';

function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">

      {/* Left - Branding Panel */}
      <div className="hidden lg:block">
        <AuthBrandPanel />
      </div>

      {/* Right - Authentication Form */}
      <div className="flex items-center justify-center bg-white p-6">
        {children}
      </div>

    </div>
  );
}

export default AuthLayout;
