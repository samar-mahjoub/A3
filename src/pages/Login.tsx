import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Bot, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') ?? '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(next);
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 mb-4">
            <Bot size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to AgentMarket</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#16161e] border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2.5 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="text-slate-400 text-sm block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-slate-400 text-sm">Password</label>
              <button type="button" className="text-violet-400 text-xs hover:text-violet-300 transition-colors">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors mt-1 flex items-center justify-center gap-2"
          >
            {loading && <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />}
            Sign in
          </button>

          <p className="text-center text-slate-500 text-sm">
            No account?{' '}
            <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </form>

        <p className="text-center text-slate-600 text-xs mt-6">
          Demo: enter any email + password to sign in
        </p>
      </div>
    </div>
  );
}
