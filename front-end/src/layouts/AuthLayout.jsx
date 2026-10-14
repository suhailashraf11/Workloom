
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* Left Side - Branding */}
      <div className="hidden lg:flex bg-brand-background items-center justify-center p-12">
        <h1 className="text-4xl font-bold text-brand-primary">
          Workload
        </h1>
      </div>

      {/* Right Side - Form Content */}
      <div className="flex items-center justify-center bg-white p-6">
        {children}
      </div>

    </div>
  );
}

export default AuthLayout;
