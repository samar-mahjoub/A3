import { useState } from 'react';
import { Search, Bell, ShoppingCart, LogOut, User, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center gap-4 px-6 shrink-0 sticky top-0 z-40">
      {/* Welcome text */}
      <div className="min-w-0 hidden lg:block">
        <p className="text-sm font-semibold text-gray-900 truncate">
          Welcome back, {user ? user.name.split(' ')[0] : 'Guest'}!
        </p>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search agents, skills, MCPs, plugins..."
          className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-10 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-300 focus:bg-white transition-all"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 bg-gray-100 border border-gray-200 rounded px-1 py-0.5 font-mono">
          /
        </kbd>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Cart */}
        <Link to="/cart" className="relative text-gray-500 hover:text-gray-800 transition-colors">
          <ShoppingCart size={18} />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>

        {/* Notifications */}
        <button className="relative text-gray-500 hover:text-gray-800 transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
            2
          </span>
        </button>

        {/* User */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center">
                {user.avatar}
              </div>
              <ChevronDown size={13} className="text-gray-400" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={14} /> Profile
                </Link>
                <button
                  onClick={() => { logout(); setDropdownOpen(false); navigate('/'); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-sm bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
