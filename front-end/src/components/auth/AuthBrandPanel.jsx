
import {
  Layers3,
  UsersRound,
  ListChecks,
  CheckCircle2,
} from 'lucide-react';

function AuthBrandPanel() {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#EEF2FF] via-[#E0E7FF] to-[#C7D2FE] p-12">

      {/* Decorative background */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/30 blur-3xl" />

      {/* Logo */}
      <div className="relative flex items-center gap-3">
        <div className="rounded-xl bg-[#4F46E5] p-3 text-white">
          <Layers3 size={26} />
        </div>

        <span className="text-2xl font-bold text-[#312E81]">
          Workload
        </span>
      </div>

      {/* Main content */}
      <div className="relative space-y-6">

        <h1 className="max-w-lg text-5xl font-bold leading-tight tracking-tight text-[#312E81]">
          People. Projects.
          <span className="block text-[#4F46E5]">
            Progress.
          </span>
        </h1>

        <p className="max-w-md text-lg leading-relaxed text-[#6366F1]">
          One workspace to organize your team,
          manage projects, and keep everything
          moving forward.
        </p>

        {/* Feature card */}
        <div className="max-w-sm space-y-4 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur-sm">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UsersRound className="text-[#4F46E5]" size={22} />
              <span className="font-medium text-[#0F172A]">
                Team Workspace
              </span>
            </div>
            <CheckCircle2 className="text-green-600" size={20} />
          </div>

          <div className="h-px bg-[#E0E7FF]" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ListChecks className="text-[#4F46E5]" size={22} />
              <span className="font-medium text-[#0F172A]">
                Project Management
              </span>
            </div>
            <CheckCircle2 className="text-green-600" size={20} />
          </div>

        </div>
      </div>

      {/* Footer */}
      <p className="relative text-sm text-[#6366F1]">
        Built for better collaboration.
      </p>

    </div>
  );
}

export default AuthBrandPanel;
