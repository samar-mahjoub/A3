import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

type Step = 'billing' | 'payment' | 'confirm';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user, installAgent } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('billing');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', company: '', card: '', expiry: '', cvv: '' });
  const update = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }));
  const formatCard = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => v.replace(/\D/g, '').slice(0, 4).replace(/^(.{2})(.+)/, '$1/$2');

  const handleOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    items.forEach(({ agent }) => installAgent(agent.id));
    clearCart();
    setStep('confirm');
    setLoading(false);
  };

  if (step === 'confirm') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 text-center py-24">
        <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center">
          <Check size={28} className="text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">You're all set!</h2>
          <p className="text-sm text-gray-500">Your agents are installed. Check your profile to manage them.</p>
        </div>
        <button onClick={() => navigate('/profile')} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
          View my agents
        </button>
      </div>
    );
  }

  if (items.length === 0) { navigate('/cart'); return null; }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => step === 'billing' ? navigate('/cart') : setStep('billing')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors group">
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        {step === 'billing' ? 'Back to cart' : 'Back to billing'}
      </button>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {(['billing', 'payment'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step === s || (step === 'payment' && s === 'billing') ? 'bg-red-600 text-white' : 'bg-gray-100 border border-gray-200 text-gray-400'
            }`}>
              {step === 'payment' && s === 'billing' ? <Check size={12} /> : i + 1}
            </div>
            <span className={`text-sm font-medium capitalize ${step === s ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
            {i < 1 && <div className="w-10 h-px bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {step === 'billing' ? (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-5">Billing information</h2>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Full name', field: 'name', type: 'text', placeholder: 'Ada Lovelace' },
                  { label: 'Email', field: 'email', type: 'email', placeholder: 'ada@company.com' },
                  { label: 'Company (optional)', field: 'company', type: 'text', placeholder: 'Acme Corp' },
                ].map(({ label, field, type, placeholder }) => (
                  <div key={field}>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">{label}</label>
                    <input type={type} value={form[field as keyof typeof form]} onChange={(e) => update(field, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-all"
                      placeholder={placeholder} />
                  </div>
                ))}
              </div>
              <button onClick={() => setStep('payment')} disabled={!form.name || !form.email}
                className="mt-5 w-full bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                Continue to payment
              </button>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-1">Payment details</h2>
              <p className="text-xs text-gray-400 flex items-center gap-1 mb-5"><Lock size={11} /> Demo only — no real charges</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5">Card number</label>
                  <input value={form.card} onChange={(e) => update('card', formatCard(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono tracking-wider text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-all"
                    placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">Expiry</label>
                    <input value={form.expiry} onChange={(e) => update('expiry', formatExpiry(e.target.value))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-all"
                      placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">CVV</label>
                    <input value={form.cvv} onChange={(e) => update('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-400 transition-all"
                      placeholder="123" />
                  </div>
                </div>
              </div>
              <button onClick={handleOrder} disabled={loading || !form.card || !form.expiry || !form.cvv}
                className="mt-5 w-full bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                {loading ? <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> : <><Lock size={14} /> Confirm order — ${total}/mo</>}
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-20">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Order summary</h3>
            <div className="flex flex-col gap-3 mb-4">
              {items.map(({ agent }) => (
                <div key={agent.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg text-white text-[10px] font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: agent.logoColor }}>
                    {agent.logoText}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{agent.name}</p>
                  </div>
                  <span className="text-sm text-gray-700">${agent.price}/mo</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-sm">
              <span>Total</span><span>${total}/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
