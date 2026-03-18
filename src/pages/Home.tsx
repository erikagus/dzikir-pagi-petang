import { Link } from 'react-router';
import { Flame, Sunrise, Sunset, Bell, Infinity, Trophy, Play, Menu, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format, subDays } from 'date-fns';
import { dzikirData } from '../data/dzikir';

export function Home() {
  const { totalDzikir, history, dailyProgress, getHistoryForDate } = useStore();

  const todayHistory = getHistoryForDate(new Date());
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  // Calculate Streak and Missed Days
  let streak = 0;
  let missedDays = 0;
  let currentDate = new Date();
  
  const currentTodayStr = format(currentDate, 'yyyy-MM-dd');
  const todayEntry = history.find(h => h.date === currentTodayStr);
  const todayCompleted = todayEntry?.pagiCompleted && todayEntry?.petangCompleted;
  
  if (todayCompleted) {
    streak++;
  }
  
  currentDate = subDays(currentDate, 1);
  let checkingStreak = true;
  
  while (true) {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const entry = history.find(h => h.date === dateStr);
    const isCompleted = entry?.pagiCompleted && entry?.petangCompleted;
    
    if (isCompleted) {
      if (checkingStreak) {
        streak++;
      } else {
        break;
      }
    } else {
      checkingStreak = false;
      if (streak > 0) {
        break;
      }
      missedDays++;
      if (missedDays > 3) {
        break;
      }
    }
    currentDate = subDays(currentDate, 1);
  }

  // Determine Streak State
  let streakTitle = `${streak} Hari Berturut-turut 🔥`;
  let streakSubtitle = "MasyaAllah, istiqomah terjaga";

  if (streak === 0) {
    if (missedDays === 1) {
      streakTitle = "Streak terputus 😔";
      streakSubtitle = "Kemarin terlewat, yuk mulai lagi hari ini";
    } else if (missedDays >= 2) {
      streakTitle = "Sudah beberapa hari terlewat";
      streakSubtitle = "Tidak apa-apa, mulai perlahan lagi hari ini 💛";
    } else {
      // missedDays === 0 (Brand new user or just started today but not finished)
      streakTitle = "Mulai Istiqomah 🔥";
      streakSubtitle = "Yuk mulai dzikir pertamamu hari ini";
    }
  }

  // Calculate Progress
  const pagiItems = dzikirData.filter(d => d.type === 'pagi' || d.type === 'both');
  const petangItems = dzikirData.filter(d => d.type === 'petang' || d.type === 'both');
  const totalItems = pagiItems.length + petangItems.length;
  
  let completedItems = 0;
  if (dailyProgress.date === todayStr) {
    pagiItems.forEach(item => {
      if ((dailyProgress.pagi[item.id] || 0) >= item.target) {
        completedItems++;
      }
    });
    petangItems.forEach(item => {
      if ((dailyProgress.petang[item.id] || 0) >= item.target) {
        completedItems++;
      }
    });
  }
  
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between px-4 py-3 bg-[#F5FBF7] sticky top-0 z-20">
        <button className="h-12 w-12 flex items-center justify-center rounded-full hover:bg-black/10 active:bg-black/10 transition-colors">
          <Menu className="w-6 h-6 text-[#171D1A]" />
        </button>
        <h1 className="text-[22px] leading-[28px] font-normal text-[#171D1A] text-center">Dzikir Tracker</h1>
        <button className="h-12 w-12 flex items-center justify-center rounded-full hover:bg-black/10 active:bg-black/10 transition-colors">
          <div className="h-8 w-8 rounded-full bg-[#89F8C6] text-[#002114] flex items-center justify-center text-sm font-medium">
            A
          </div>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-[88px] px-4 space-y-6">
        <section className="pt-2">
          <div className="bg-[#D0E8D9] rounded-xl p-4 flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-[#0A1F16] text-sm font-medium mb-1 opacity-80">Istiqomah Streak</p>
                <h2 className="text-xl font-semibold text-[#0A1F16]">{streakTitle}</h2>
                <p className="text-sm text-[#0A1F16]/80 mt-0.5">{streakSubtitle}</p>
              </div>
              <div className="bg-[#0A1F16] text-[#D0E8D9] h-10 w-10 rounded-full flex items-center justify-center shadow-sm shrink-0 ml-2">
                <Flame className="w-5 h-5 fill-current" />
              </div>
            </div>
            <div className="flex flex-col gap-1 relative z-10 mt-2">
              <div className="h-4 w-full bg-[#0A1F16]/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#006C4C] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-xs text-[#0A1F16]/70 mt-1 font-medium">
                <p>Progress Hari Ini</p>
                <p>{progressPercentage}% Goal</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium px-1 text-[#171D1A]">Daily Adhkar</h2>
          
          {/* Dzikir Pagi */}
          <Link to="/dzikir/pagi" className="group relative flex flex-col bg-[#EFF5F1] border border-[#BFC9C2] rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 block">
            <div className="flex items-stretch">
              <div className="flex-1 p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#3D6373]">
                  <Sunrise className="w-[18px] h-[18px]" />
                  <span className="text-xs font-medium tracking-wide">05:00 - 08:00</span>
                </div>
                <div>
                  <h3 className="text-xl text-[#171D1A] font-normal">Dzikir Pagi</h3>
                  <p className="text-[#404943] text-sm mt-1">Morning Supplications</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#C1E8FB] text-[#001F29] text-xs font-medium">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    15 mins
                  </div>
                </div>
              </div>
              <div className="w-28 bg-[#3D6373]/10 flex items-center justify-center relative overflow-hidden">
                <Sunrise className="w-16 h-16 text-[#3D6373] opacity-20 absolute -right-2 -bottom-2" />
                <Sunrise className="w-10 h-10 text-[#3D6373]" />
              </div>
            </div>
            <div className="border-t border-[#BFC9C2] p-2 flex justify-end bg-[#EFF5F1]">
              {todayHistory.pagiCompleted ? (
                <div className="h-10 px-6 rounded-full bg-[#E8F5EE] text-[#006C4C] text-sm font-medium flex items-center gap-2 hover:bg-[#D0E8D9] transition-colors">
                  <CheckCircle2 className="w-[18px] h-[18px]" />
                  Finished
                </div>
              ) : (
                <div className="h-10 px-6 rounded-full bg-[#006C4C] text-white text-sm font-medium hover:shadow-md active:shadow-none transition-shadow flex items-center gap-2">
                  <Play className="w-[18px] h-[18px] fill-current" />
                  Start
                </div>
              )}
            </div>
          </Link>

          {/* Dzikir Petang */}
          <Link to="/dzikir/petang" className="group relative flex flex-col bg-[#EFF5F1] border border-[#BFC9C2] rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 block">
            <div className="flex items-stretch">
              <div className="flex-1 p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#4D6357]">
                  <Sunset className="w-[18px] h-[18px]" />
                  <span className="text-xs font-medium tracking-wide">16:00 - 18:00</span>
                </div>
                <div>
                  <h3 className="text-xl text-[#171D1A] font-normal">Dzikir Petang</h3>
                  <p className="text-[#404943] text-sm mt-1">Evening Supplications</p>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#D0E8D9] text-[#0A1F16] text-xs font-medium">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    20 mins
                  </div>
                </div>
              </div>
              <div className="w-28 bg-[#4D6357]/10 flex items-center justify-center relative overflow-hidden">
                <Sunset className="w-16 h-16 text-[#4D6357] opacity-20 absolute -right-2 -bottom-2" />
                <Sunset className="w-10 h-10 text-[#4D6357]" />
              </div>
            </div>
            <div className="border-t border-[#BFC9C2] p-2 flex justify-end bg-[#EFF5F1]">
              {todayHistory.petangCompleted ? (
                <div className="h-10 px-6 rounded-full bg-[#E8F5EE] text-[#006C4C] text-sm font-medium flex items-center gap-2 hover:bg-[#D0E8D9] transition-colors">
                  <CheckCircle2 className="w-[18px] h-[18px]" />
                  Finished
                </div>
              ) : (
                <div className="h-10 px-6 rounded-full border border-[#707973] text-[#006C4C] text-sm font-medium hover:bg-[#006C4C]/5 active:bg-[#006C4C]/10 transition-colors flex items-center gap-2">
                  <Play className="w-[18px] h-[18px] fill-current" />
                  Start
                </div>
              )}
            </div>
          </Link>
        </section>

        <section className="grid grid-cols-2 gap-4 pb-4">
          <div className="bg-[#E9EFEC] p-4 rounded-xl flex flex-col items-start gap-1">
            <div className="mb-2 h-8 w-8 rounded-full bg-[#E3E9E6] flex items-center justify-center">
              <Infinity className="w-5 h-5 text-[#006C4C]" />
            </div>
            <p className="text-2xl font-normal text-[#171D1A]">{totalDzikir.toLocaleString()}</p>
            <p className="text-xs font-medium text-[#404943] tracking-wide">Total Dzikir</p>
          </div>
          <div className="bg-[#E9EFEC] p-4 rounded-xl flex flex-col items-start gap-1">
            <div className="mb-2 h-8 w-8 rounded-full bg-[#E3E9E6] flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[#3D6373]" />
            </div>
            <p className="text-2xl font-normal text-[#171D1A]">#12</p>
            <p className="text-xs font-medium text-[#404943] tracking-wide">Monthly Rank</p>
          </div>
        </section>
      </main>
    </div>
  );
}
