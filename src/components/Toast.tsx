import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const bgClasses = {
    success: 'bg-emerald-900/90 text-emerald-100 border-emerald-500/50',
    error: 'bg-rose-900/90 text-rose-100 border-rose-500/50',
    info: 'bg-slate-900/90 text-slate-100 border-indigo-500/50'
  }[toast.type];

  const Icon = {
    success: CheckCircle2,
    error: AlertTriangle,
    info: Info
  }[toast.type];

  return (
    <div 
      id="toast-notification"
      className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md ${bgClasses}`}>
        <Icon className="w-5 h-5 shrink-0 text-emerald-400" />
        <p className="text-sm font-medium leading-snug">{toast.message}</p>
      </div>
    </div>
  );
}
