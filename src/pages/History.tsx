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
        if (isCompleted) return "bg-[#006C4C]"; // Green for completed
        if (isPastDay) return "bg-red-500"; // Red for missed past days
        return "bg-gray-300"; // Gray for today not yet completed
      };

      return (
        <div className="flex gap-1 mt-1">
          <div className={clsx("w-1.5 h-1.5 rounded-full", getDotColor(pagi))} />
          <div className={clsx("w-1.5 h-1.5 rounded-full", getDotColor(petang))} />
        </div>
      );
    }
    return <div className="h-1.5 mt-1" />;
  };

  return (
    <div className="flex-1 overflow-y-auto pb-[88px] px-4 space-y-6">
      <div className="flex items-center justify-between h-16">
        <h1 className="text-3xl text-[#191C1A] font-normal">Riwayat Saya</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowCalendar(true)}
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer"
          >
            <Calendar className="w-6 h-6 text-[#191C1A]" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 py-2 overflow-x-auto no-scrollbar scroll-pl-4">
        <button 
          onClick={() => setActiveTab('minggu')}
          className={clsx(
            "flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-all",
            activeTab === 'minggu' 
              ? "bg-[#89F8C7] text-[#002114] border border-transparent hover:shadow-sm" 
              : "border border-[#707973] text-[#404943] bg-transparent hover:bg-black/5"
          )}
        >
          {activeTab === 'minggu' && <Check className="w-[18px] h-[18px]" strokeWidth={3} />}
          <span className="text-sm font-medium tracking-wide">Minggu Ini</span>
        </button>
        <button 
          onClick={() => setActiveTab('bulan')}
          className={clsx(
            "flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-all",
            activeTab === 'bulan' 
              ? "bg-[#89F8C7] text-[#002114] border border-transparent hover:shadow-sm" 
              : "border border-[#707973] text-[#404943] bg-transparent hover:bg-black/5"
          )}
        >
          {activeTab === 'bulan' && <Check className="w-[18px] h-[18px]" strokeWidth={3} />}
          <span className="text-sm font-medium tracking-wide">Bulan Ini</span>
        </button>
      </div>

      <div className="bg-[#F0F5F1] rounded-[20px] p-4 flex flex-col gap-1">
        <h3 className="text-lg font-medium text-[#191C1A]">
          {activeTab === 'minggu' ? '7 Hari Terakhir' : 'Bulan Ini'}
        </h3>
        <p className="text-base text-[#404943]">
          Anda telah menyelesaikan {percentage}% target {activeTab === 'minggu' ? 'minggu' : 'bulan'} ini.
        </p>
      </div>

      <div className="flex flex-col">
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
            statusColor = 'text-[#2E7D32]';
            bgColor = 'bg-[#B9F6CA]';
            iconColor = 'text-[#2E7D32]';
            Icon = Check;
            percentageText = '100%';
          } else if (isPartial) {
            statusText = `Partial: Hanya ${entry.pagiCompleted ? 'Pagi' : 'Petang'}`;
            statusColor = 'text-[#ED6C02]';
            bgColor = 'bg-[#FFE0B2]';
            iconColor = 'text-[#ED6C02]';
            Icon = Clock;
            percentageText = '50%';
          } else {
            statusText = 'Missed: Tidak ada catatan';
            statusColor = 'text-[#B00020]';
            bgColor = 'bg-[#F9DEDC]';
            iconColor = 'text-[#B00020]';
            Icon = X;
            percentageText = '0%';
          }

          return (
            <div key={index} className="flex items-center min-h-[72px] py-2 border-b border-[#BFC9C2]/30 last:border-0 hover:bg-black/5 active:bg-black/10 rounded-xl px-2 -mx-2 transition-colors">
              <div className={clsx("flex w-10 h-10 shrink-0 items-center justify-center rounded-full mr-4", bgColor, iconColor)}>
                <Icon className="w-5 h-5" strokeWidth={isCompleted ? 3 : 2} />
              </div>
              <div className="flex flex-col flex-1 gap-0.5">
                <p className="text-base text-[#191C1A] font-normal">
                  {format(date, 'EEEE, dd MMM', { locale: id })}
                </p>
                <p className="text-sm text-[#404943]">{statusText}</p>
              </div>
              <span className={clsx("text-sm font-medium px-2 py-0.5 rounded-md", statusColor, bgColor.replace('bg-', 'bg-').replace(']', ']/50'))}>
                {percentageText}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[1px] transition-opacity duration-200">
          <div className="w-full max-w-md bg-[#F5FBF7] rounded-[28px] shadow-lg overflow-hidden flex flex-col">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-[#191C1A] capitalize">
                  {format(calendarMonth, 'MMMM yyyy', { locale: id })}
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))} className="p-2 rounded-full hover:bg-black/5">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))} className="p-2 rounded-full hover:bg-black/5">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-y-4 mb-2">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-[#404943]">
                    {day}
                  </div>
                ))}
                {calendarDays.map((date, i) => {
                  const isCurrentMonth = isSameMonth(date, calendarMonth);
                  const isToday = isSameDay(date, new Date());
                  
                  return (
                    <div key={i} className="flex flex-col items-center justify-center h-10">
                      <span className={clsx(
                        "text-sm w-7 h-7 flex items-center justify-center rounded-full",
                        !isCurrentMonth && "text-gray-400",
                        isCurrentMonth && !isToday && "text-[#191C1A]",
                        isToday && "bg-[#006C4C] text-white font-medium"
                      )}>
                        {format(date, 'd')}
                      </span>
                      {renderDots(date)}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="flex gap-3 text-xs text-[#404943]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#006C4C]" />
                    <span>Selesai</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    <span>Belum</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Terlewat</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowCalendar(false)}
                  className="px-4 py-2 rounded-full text-[#006C4C] text-sm font-medium hover:bg-[#006C4C]/10 transition-colors"
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
