import { Link, useLocation } from 'react-router';
import { Home, History } from 'lucide-react';
import { clsx } from 'clsx';

export function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/history', label: 'Riwayat', icon: History },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-xl pb-8 pt-4 px-6 flex justify-around items-center z-20 border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.path}
            to={item.path}
            className="group flex flex-col items-center gap-1.5 w-20"
          >
            <div className={clsx(
              "flex items-center justify-center w-16 h-10 rounded-2xl transition-all duration-300",
              isActive ? "bg-emerald-50 shadow-[0_4px_15px_rgba(16,185,129,0.1)]" : "group-hover:bg-gray-50"
            )}>
              <Icon 
                className={clsx(
                  "w-5 h-5 transition-colors duration-300",
                  isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span className={clsx(
              "text-[11px] tracking-wide transition-colors duration-300",
              isActive ? "font-bold text-emerald-700" : "font-semibold text-gray-400 group-hover:text-gray-600"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
