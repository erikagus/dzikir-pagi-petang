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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#F0F5F1] pb-6 pt-3 px-2 flex justify-around items-center z-20">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.path}
            to={item.path}
            className="group flex flex-col items-center gap-1 w-16"
          >
            <div className={clsx(
              "flex items-center justify-center w-16 h-8 rounded-full transition-colors",
              isActive ? "bg-[#89F8C7]" : "group-hover:bg-black/10"
            )}>
              <Icon 
                className={clsx(
                  "w-6 h-6",
                  isActive ? "text-[#002114]" : "text-[#404943] group-hover:text-[#191C1A]"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
            </div>
            <span className={clsx(
              "text-xs",
              isActive ? "font-bold text-[#191C1A]" : "font-medium text-[#404943] group-hover:text-[#191C1A]"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
