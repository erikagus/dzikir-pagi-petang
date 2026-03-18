import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { DzikirDetail } from './pages/DzikirDetail';
import { BottomNav } from './components/BottomNav';
import { useStore } from './store/useStore';

function Layout() {
  return (
    <div className="text-gray-800 font-sans min-h-screen flex flex-col antialiased bg-white max-w-md mx-auto relative shadow-2xl overflow-hidden">
      <Outlet />
      <BottomNav />
    </div>
  );
}

export default function App() {
  const fetchHistoryFromSupabase = useStore(state => state.fetchHistoryFromSupabase);

  useEffect(() => {
    fetchHistoryFromSupabase();
  }, [fetchHistoryFromSupabase]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="history" element={<History />} />
        </Route>
        <Route path="/dzikir/:type" element={<DzikirDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
