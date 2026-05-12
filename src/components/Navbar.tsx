import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Bot, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0f0f13]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Bot size={18} className="text-white" />
            </div>
            <span className="font-semibold text-white text-lg tracking-tight">
              Agent<span className="text-violet-400">Market</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
              Browse
            </Link>
            <Link to="/cart" className="relative text-slate-400 hover:text-white transition-colors">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-violet-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1.5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                    {user.avatar}
                  </div>
                  <span className="text-sm text-white font-medium">{user.name.split(' ')[0]}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1a1a24] border border-white/10 shadow-xl shadow-black/40 py-1 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <User size={15} /> Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm text-slate-300 hover:text-white font-medium transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm bg-violet-600 hover:bg-violet-500 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0f0f13] px-4 pb-4 pt-2 flex flex-col gap-3">
          <Link to="/" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white py-2 text-sm font-medium">
            Browse
          </Link>
          <Link to="/cart" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white py-2 text-sm font-medium flex items-center gap-2">
            Cart {itemCount > 0 && <span className="bg-violet-500 text-white text-xs px-1.5 py-0.5 rounded-full">{itemCount}</span>}
          </Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white py-2 text-sm font-medium">
                Profile
              </Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-red-400 text-sm font-medium text-left py-2">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white py-2 text-sm font-medium">
                Sign in
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="bg-violet-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center">
                Get started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
