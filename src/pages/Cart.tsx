import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?next=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <ShoppingCart size={32} className="text-slate-500" />
        </div>
        <div>
          <p className="text-white font-semibold text-xl mb-2">Your cart is empty</p>
          <p className="text-slate-400 text-sm">Browse agents and add them to your cart.</p>
        </div>
        <Link
          to="/"
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Browse agents
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map(({ agent }) => (
              <div
                key={agent.id}
                className="bg-[#16161e] border border-white/8 rounded-2xl p-5 flex items-center gap-4"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center text-2xl shrink-0`}>
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/agent/${agent.id}`}
                    className="text-white font-semibold hover:text-violet-300 transition-colors"
                  >
                    {agent.name}
                  </Link>
                  <p className="text-slate-400 text-sm">{agent.tagline}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{agent.category} · {agent.modelPowered}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-white font-bold">${agent.price}<span className="text-slate-400 text-xs font-normal">/mo</span></p>
                  <button
                    onClick={() => removeFromCart(agent.id)}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                    title="Remove"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-slate-500 hover:text-red-400 text-sm self-start mt-1 transition-colors"
            >
              Clear cart
            </button>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-[#16161e] border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-white font-semibold mb-5">Order Summary</h2>

              <div className="flex flex-col gap-3 text-sm mb-5">
                {items.map(({ agent }) => (
                  <div key={agent.id} className="flex justify-between text-slate-400">
                    <span className="truncate mr-2">{agent.name}</span>
                    <span className="text-white shrink-0">${agent.price}/mo</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/8 pt-4 mb-5">
                <div className="flex justify-between text-sm text-slate-400 mb-1">
                  <span>Subtotal</span>
                  <span className="text-white">${total}/mo</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Trial period</span>
                  <span className="text-emerald-400">14 days free</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg mb-6">
                <span className="text-white">Total</span>
                <span className="text-white">${total}<span className="text-slate-400 text-sm font-normal">/mo</span></span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-violet-600/20"
              >
                Checkout <ArrowRight size={16} />
              </button>

              <p className="text-xs text-slate-500 text-center mt-3">
                Secure checkout · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
