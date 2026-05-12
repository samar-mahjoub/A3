import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

type Step = 'billing' | 'payment' | 'confirm';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user, installAgent } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('billing');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    company: '',
    card: '',
    expiry: '',
    cvv: '',
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const formatCard = (v: string) =>
    v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) =>
    v.replace(/\D/g, '').slice(0, 4).replace(/^(.{2})(.+)/, '$1/$2');

  const handleOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    items.forEach(({ agent }) => installAgent(agent.id));
    clearCart();
    setStep('confirm');
    setLoading(false);
  };

  if (step === 'confirm') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center">
          <Check size={36} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">You're all set!</h2>
          <p className="text-slate-400">
            Your agents are ready. Check your profile to manage them.
          </p>
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          View my agents
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="flex-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => (step === 'billing' ? navigate('/cart') : setStep('billing'))}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          {step === 'billing' ? 'Back to cart' : 'Back to billing'}
        </button>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {(['billing', 'payment'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s || (step === 'payment' && s === 'billing')
                    ? 'bg-violet-600 text-white'
                    : 'bg-white/5 border border-white/10 text-slate-500'
                }`}
              >
                {step === 'payment' && s === 'billing' ? <Check size={13} /> : i + 1}
              </div>
              <span
                className={`text-sm font-medium capitalize ${
                  step === s ? 'text-white' : 'text-slate-500'
                }`}
              >
                {s}
              </span>
              {i < 1 && <div className="w-12 h-px bg-white/10 mx-1" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 'billing' ? (
              <div className="bg-[#16161e] border border-white/8 rounded-2xl p-6">
                <h2 className="text-white font-semibold text-lg mb-5">Billing information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-slate-400 text-sm block mb-1.5">Full name</label>
                    <input
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm"
                      placeholder="Ada Lovelace"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-slate-400 text-sm block mb-1.5">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm"
                      placeholder="ada@example.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-slate-400 text-sm block mb-1.5">Company (optional)</label>
                    <input
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setStep('payment')}
                  disabled={!form.name || !form.email}
                  className="mt-6 w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  Continue to payment
                </button>
              </div>
            ) : (
              <div className="bg-[#16161e] border border-white/8 rounded-2xl p-6">
                <h2 className="text-white font-semibold text-lg mb-1 flex items-center gap-2">
                  <CreditCard size={18} className="text-violet-400" /> Payment details
                </h2>
                <p className="text-slate-500 text-xs flex items-center gap-1 mb-5">
                  <Lock size={11} /> Demo only — no real charges
                </p>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-slate-400 text-sm block mb-1.5">Card number</label>
                    <input
                      value={form.card}
                      onChange={(e) => update('card', formatCard(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm font-mono tracking-wider"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 text-sm block mb-1.5">Expiry</label>
                      <input
                        value={form.expiry}
                        onChange={(e) => update('expiry', formatExpiry(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm font-mono"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm block mb-1.5">CVV</label>
                      <input
                        value={form.cvv}
                        onChange={(e) => update('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/60 text-sm font-mono"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleOrder}
                  disabled={loading || !form.card || !form.expiry || !form.cvv}
                  className="mt-6 w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <><Lock size={15} /> Confirm order — ${total}/mo</>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-[#16161e] border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-semibold text-sm mb-4">Order summary</h3>
              <div className="flex flex-col gap-3 mb-4">
                {items.map(({ agent }) => (
                  <div key={agent.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-base shrink-0`}>
                      {agent.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{agent.name}</p>
                    </div>
                    <span className="text-slate-300 text-sm">${agent.price}/mo</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/8 pt-4 flex justify-between font-semibold">
                <span className="text-white">Total</span>
                <span className="text-white">${total}/mo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
