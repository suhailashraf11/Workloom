
import AuthLayout from '../../layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function Login() {
  return (
    <AuthLayout>

      <div className="w-full max-w-md">

        <h1 className="text-3xl font-bold text-[#0F172A]">
          Welcome back
        </h1>

        <p className="mt-3 text-gray-500">
          Sign in to your Workload account
        </p>

        <Button
          type="button"
          className="mt-8 h-12 w-full rounded-xl bg-[#4F46E5] text-white hover:bg-[#4338CA]"
        >
          Sign In
          <ArrowRight size={18} />
        </Button>

      </div>

    </AuthLayout>
  );
}

export default Login;
