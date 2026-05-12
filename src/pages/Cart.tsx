import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) navigate('/login?next=/checkout');
    else navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-5 text-center px-4 py-24">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 flex items-center justify-center">
          <ShoppingCart size={28} className="text-gray-400" />
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-1">Your cart is empty</p>
          <p className="text-sm text-gray-500">Browse agents and add them to your cart.</p>
        </div>
        <Link to="/agents" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
          Browse agents
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-3">
          {items.map(({ agent }) => (
            <div key={agent.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl text-white text-sm font-bold flex items-center justify-center shrink-0" style={{ backgroundColor: agent.logoColor }}>
                {agent.logoText}
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/agent/${agent.id}`} className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors">
                  {agent.name}
                </Link>
                <p className="text-xs text-gray-500">{agent.tagline}</p>
                <p className="text-xs text-gray-400 mt-0.5">{agent.source} · {agent.handle} {agent.version}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-gray-900">${agent.price}<span className="text-gray-400 text-xs font-normal">/mo</span></p>
                <button onClick={() => removeFromCart(agent.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-600 font-medium self-start mt-1">Clear cart</button>
        </div>

        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-20">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="flex flex-col gap-2 text-sm mb-4">
              {items.map(({ agent }) => (
                <div key={agent.id} className="flex justify-between text-gray-600">
                  <span className="truncate mr-2">{agent.name}</span>
                  <span className="text-gray-900 shrink-0">${agent.price}/mo</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 mb-4 flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="text-gray-900">${total}/mo</span></div>
              <div className="flex justify-between text-gray-600"><span>Trial period</span><span className="text-green-600 font-medium">14 days free</span></div>
            </div>
            <div className="flex justify-between font-bold text-base mb-5">
              <span>Total</span><span>${total}<span className="text-gray-400 text-xs font-normal">/mo</span></span>
            </div>
            <button onClick={handleCheckout} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
              Checkout <ArrowRight size={15} />
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">Secure checkout · Cancel anytime</p>
          </div>
        </div>
      </div>
    </div>
  );
}
