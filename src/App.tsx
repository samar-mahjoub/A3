import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AgentDetail from './pages/AgentDetail';
import AgentsPage from './pages/Agents';
import PluginsPage from './pages/Plugins';
import LeaderboardPage from './pages/Leaderboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import MCPs from './pages/MCPs';
import Integrations from './pages/Integrations';
import Lab from './pages/Lab';
import HowToPublish from './pages/HowToPublish';
import Collective from './pages/Collective';

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/agent/:id" element={<AgentDetail />} />
        <Route path="/plugins" element={<PluginsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/mcps" element={<MCPs />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/how-to-publish" element={<HowToPublish />} />
        <Route path="/collective" element={<Collective />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
