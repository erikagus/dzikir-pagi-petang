import { useState } from 'react';
import { Calendar, Search, Check, X, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, isBefore, isSameDay, startOfWeek, endOfWeek, isSameMonth, addMonths, subMonths } from 'date-fns';
import { id } from 'date-fns/locale';
import { clsx } from 'clsx';

export function History() {
  const { history } = useStore();
  const [activeTab, setActiveTab] = useState<'minggu' | 'bulan'>('minggu');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  // Generate last 7 days
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = history.find(h => h.date === dateStr);
    
    return {
      date,
      dateStr,
      entry: entry || { date: dateStr, pagiCompleted: false, petangCompleted: false }
    };
  });

  // Generate this month
  const today = new Date();
  const startOfCurrentMonth = startOfMonth(today);
  const endOfCurrentMonth = endOfMonth(today);
  
  const thisMonthDays = eachDayOfInterval({
    start: startOfCurrentMonth,
    end: endOfCurrentMonth
  }).map((date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = history.find(h => h.date === dateStr);
    
    return {
      date,
      dateStr,
      entry: entry || { date: dateStr, pagiCompleted: false, petangCompleted: false },
      isFuture: isBefore(today, date) && !isSameDay(today, date)
    };
  }).reverse(); // Show newest first

  const displayDays = activeTab === 'minggu' ? last7Days : thisMonthDays.filter(d => !d.isFuture);
  
  const completedCount = displayDays.filter(d => d.entry.pagiCompleted && d.entry.petangCompleted).length;
  const percentage = displayDays.length > 0 ? Math.round((completedCount / displayDays.length) * 100) : 0;

  // Calendar logic
  const monthStart = startOfMonth(calendarMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const renderDots = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const entry = history.find(h => h.date === dateStr);
    const pagi = entry?.pagiCompleted;
    const petang = entry?.petangCompleted;
    
    // Only show dots for past dates or today
    if (isBefore(date, new Date()) || isSameDay(date, new Date())) {
      // If it's today, we show gray for not yet completed.
      // If it's a past day, we show red for missed.
      const isPastDay = isBefore(date, new Date()) && !isSameDay(date, new Date());
      
      const getDotColor = (isCompleted: boolean | undefined) => {
        if (isCompleted) return "bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"; // Green for completed
        if (isPastDay) return "bg-rose-400"; // Red for missed past days
        return "bg-gray-200"; // Gray for today not yet completed
      };

      return (
        <div className="flex gap-1 mt-1.5">
          <div className={clsx("w-1.5 h-1.5 rounded-full", getDotColor(pagi))} />
          <div className={clsx("w-1.5 h-1.5 rounded-full", getDotColor(petang))} />
        </div>
      );
    }
    return <div className="h-1.5 mt-1.5" />;
  };

  return (
    <div className="flex-1 overflow-y-auto pb-[100px] px-6 space-y-8 bg-white">
      <div className="flex items-center justify-between h-20 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <h1 className="text-2xl text-gray-800 font-bold tracking-tight">Riwayat Saya</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowCalendar(true)}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all border border-gray-50 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 py-2 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('minggu')}
          className={clsx(
            "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 transition-all duration-300",
            activeTab === 'minggu' 
              ? "bg-emerald-50 text-emerald-700 shadow-[0_4px_15px_rgba(16,185,129,0.1)] font-bold" 
              : "bg-gray-50 text-gray-500 hover:bg-gray-100 font-semibold"
          )}
        >
          {activeTab === 'minggu' && <Check className="w-[18px] h-[18px]" strokeWidth={3} />}
          <span className="text-sm tracking-wide">Minggu Ini</span>
        </button>
        <button 
          onClick={() => setActiveTab('bulan')}
          className={clsx(
            "flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-5 transition-all duration-300",
            activeTab === 'bulan' 
              ? "bg-emerald-50 text-emerald-700 shadow-[0_4px_15px_rgba(16,185,129,0.1)] font-bold" 
              : "bg-gray-50 text-gray-500 hover:bg-gray-100 font-semibold"
          )}
        >
          {activeTab === 'bulan' && <Check className="w-[18px] h-[18px]" strokeWidth={3} />}
          <span className="text-sm tracking-wide">Bulan Ini</span>
        </button>
      </div>

      <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2rem] p-6 flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl"></div>
        <h3 className="text-lg font-bold text-gray-800 relative z-10">
          {activeTab === 'minggu' ? '7 Hari Terakhir' : 'Bulan Ini'}
        </h3>
        <p className="text-sm text-gray-500 font-medium leading-relaxed relative z-10">
          Anda telah menyelesaikan <span className="text-emerald-600 font-bold">{percentage}%</span> target {activeTab === 'minggu' ? 'minggu' : 'bulan'} ini.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {displayDays.map(({ date, entry }, index) => {
          const isCompleted = entry.pagiCompleted && entry.petangCompleted;
          const isPartial = entry.pagiCompleted || entry.petangCompleted;
          const isMissed = !entry.pagiCompleted && !entry.petangCompleted;
          
          let statusText = '';
          let statusColor = '';
          let bgColor = '';
          let iconColor = '';
          let Icon = Check;
          let percentageText = '0%';

          if (isCompleted) {
            statusText = 'Completed: Pagi & Petang';
            statusColor = 'text-emerald-700';
            bgColor = 'bg-emerald-50';
            iconColor = 'text-emerald-600';
            Icon = Check;
            percentageText = '100%';
          } else if (isPartial) {
            statusText = `Partial: Hanya ${entry.pagiCompleted ? 'Pagi' : 'Petang'}`;
            statusColor = 'text-amber-700';
            bgColor = 'bg-amber-50';
            iconColor = 'text-amber-600';
            Icon = Clock;
            percentageText = '50%';
          } else {
            statusText = 'Missed: Tidak ada catatan';
            statusColor = 'text-rose-700';
            bgColor = 'bg-rose-50';
            iconColor = 'text-rose-500';
            Icon = X;
            percentageText = '0%';
          }

          return (
            <div key={index} className="flex items-center min-h-[80px] p-4 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)] rounded-2xl transition-all duration-300">
              <div className={clsx("flex w-12 h-12 shrink-0 items-center justify-center rounded-2xl mr-4", bgColor, iconColor)}>
                <Icon className="w-6 h-6" strokeWidth={isCompleted ? 3 : 2} />
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <p className="text-base text-gray-800 font-bold">
                  {format(date, 'EEEE, dd MMM', { locale: id })}
                </p>
                <p className="text-xs font-semibold text-gray-400">{statusText}</p>
              </div>
              <span className={clsx("text-xs font-bold px-3 py-1.5 rounded-xl", statusColor, bgColor)}>
                {percentageText}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-800 capitalize tracking-tight">
                  {format(calendarMonth, 'MMMM yyyy', { locale: id })}
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))} className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))} className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-y-6 gap-x-2 mb-4">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(day => (
                  <div key={day} className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
                {calendarDays.map((date, i) => {
                  const isCurrentMonth = isSameMonth(date, calendarMonth);
                  const isToday = isSameDay(date, new Date());
                  
                  return (
                    <div key={i} className="flex flex-col items-center justify-center h-12">
                      <span className={clsx(
                        "text-sm w-8 h-8 flex items-center justify-center rounded-xl transition-all",
                        !isCurrentMonth && "text-gray-300 font-medium",
                        isCurrentMonth && !isToday && "text-gray-700 font-semibold hover:bg-gray-50",
                        isToday && "bg-emerald-500 text-white font-bold shadow-[0_4px_10px_rgba(16,185,129,0.3)]"
                      )}>
                        {format(date, 'd')}
                      </span>
                      {renderDots(date)}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <div className="flex gap-4 text-xs font-semibold text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                    <span>Selesai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                    <span>Belum</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span>Terlewat</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCalendar(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-50 text-gray-700 text-sm font-bold hover:bg-gray-100 transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
