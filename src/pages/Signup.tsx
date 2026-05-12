import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signup(name, email, password);
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20 mb-4">
            <Bot size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-slate-400 text-sm mt-1">Join AgentMarket</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#16161e] border border-white/8 rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-slate-400 text-sm block mb-1.5">Full name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm"
              placeholder="Ada Lovelace"
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm"
              placeholder="ada@example.com"
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm block mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm"
                placeholder="Min. 6 characters"
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
            Create account
          </button>

          <p className="text-center text-slate-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
