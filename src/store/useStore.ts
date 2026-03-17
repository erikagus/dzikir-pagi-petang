import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format, isSameDay, subDays } from 'date-fns';
import { supabase, getGuestId } from '../lib/supabaseClient';

export type DzikirType = 'pagi' | 'petang';

export interface HistoryEntry {
  date: string; // YYYY-MM-DD
  pagiCompleted: boolean;
  petangCompleted: boolean;
}

interface AppState {
  currentStreak: number;
  totalDzikir: number;
  history: HistoryEntry[];
  lastCompleted: string | null;
  
  // Current session state
  currentSession: {
    type: DzikirType | null;
    currentIndex: number;
    progress: Record<string, number>; // id -> count
    date: string | null;
  };
  
  dailyProgress: {
    date: string | null;
    pagi: Record<string, number>;
    petang: Record<string, number>;
  };

  startSession: (type: DzikirType) => void;
  incrementProgress: (id: string, target: number) => void;
  resetProgress: (id: string) => void;
  nextDzikir: () => void;
  prevDzikir: () => void;
  completeSession: () => void;
  resetSession: () => void;
  
  getHistoryForDate: (date: Date) => HistoryEntry;
  
  // Supabase sync
  fetchHistoryFromSupabase: () => Promise<void>;
  syncHistoryToSupabase: (entry: HistoryEntry) => Promise<void>;
}

const getTodayString = () => format(new Date(), 'yyyy-MM-dd');

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      totalDzikir: 0,
      history: [],
      lastCompleted: null,
      
      currentSession: {
        type: null,
        currentIndex: 0,
        progress: {},
        date: null,
      },
      
      dailyProgress: {
        date: null,
        pagi: {},
        petang: {},
      },

      startSession: (type) => set((state) => {
        const todayStr = getTodayString();
        
        // Ensure dailyProgress is for today
        let currentDailyProgress = state.dailyProgress;
        if (!currentDailyProgress || currentDailyProgress.date !== todayStr) {
          currentDailyProgress = {
            date: todayStr,
            pagi: {},
            petang: {},
          };
        }

        // If resuming the same session from today, keep progress
        if (state.currentSession.type === type && state.currentSession.date === todayStr) {
          return { dailyProgress: currentDailyProgress };
        }
        
        // Otherwise start fresh, but load progress from dailyProgress
        return {
          dailyProgress: currentDailyProgress,
          currentSession: {
            type,
            currentIndex: 0,
            progress: currentDailyProgress[type] || {},
            date: todayStr,
          }
        };
      }),

      incrementProgress: (id, target) => set((state) => {
        const currentCount = state.currentSession.progress[id] || 0;
        if (currentCount >= target) return state;
        
        const newProgress = {
          ...state.currentSession.progress,
          [id]: currentCount + 1,
        };

        const type = state.currentSession.type;
        const newDailyProgress = state.dailyProgress 
          ? { ...state.dailyProgress } 
          : { date: getTodayString(), pagi: {}, petang: {} };
          
        if (type) {
          newDailyProgress[type] = newProgress;
        }

        return {
          currentSession: {
            ...state.currentSession,
            progress: newProgress
          },
          dailyProgress: newDailyProgress,
          totalDzikir: state.totalDzikir + 1,
        };
      }),

      resetProgress: (id) => set((state) => {
        const newProgress = {
          ...state.currentSession.progress,
          [id]: 0,
        };

        const type = state.currentSession.type;
        const newDailyProgress = state.dailyProgress 
          ? { ...state.dailyProgress } 
          : { date: getTodayString(), pagi: {}, petang: {} };
          
        if (type) {
          newDailyProgress[type] = newProgress;
        }

        return {
          currentSession: {
            ...state.currentSession,
            progress: newProgress
          },
          dailyProgress: newDailyProgress,
          totalDzikir: Math.max(0, state.totalDzikir - (state.currentSession.progress[id] || 0)),
        };
      }),

      nextDzikir: () => set((state) => ({
        currentSession: {
          ...state.currentSession,
          currentIndex: state.currentSession.currentIndex + 1,
        }
      })),

      prevDzikir: () => set((state) => ({
        currentSession: {
          ...state.currentSession,
          currentIndex: Math.max(0, state.currentSession.currentIndex - 1),
        }
      })),

      completeSession: () => set((state) => {
        const todayStr = getTodayString();
        const type = state.currentSession.type;
        if (!type) return state;

        const history = [...state.history];
        const todayEntryIndex = history.findIndex(h => h.date === todayStr);
        
        if (todayEntryIndex >= 0) {
          history[todayEntryIndex] = {
            ...history[todayEntryIndex],
            pagiCompleted: type === 'pagi' ? true : history[todayEntryIndex].pagiCompleted,
            petangCompleted: type === 'petang' ? true : history[todayEntryIndex].petangCompleted,
          };
        } else {
          history.push({
            date: todayStr,
            pagiCompleted: type === 'pagi',
            petangCompleted: type === 'petang',
          });
        }

        // Calculate streak
        let streak = 0;
        let currentDate = new Date();
        while (true) {
          const dateStr = format(currentDate, 'yyyy-MM-dd');
          const entry = history.find(h => h.date === dateStr);
          if (entry && (entry.pagiCompleted || entry.petangCompleted)) {
            streak++;
            currentDate = subDays(currentDate, 1);
          } else {
            break;
          }
        }

        // Trigger Supabase sync asynchronously
        const updatedEntry = history.find(h => h.date === todayStr);
        if (updatedEntry) {
          get().syncHistoryToSupabase(updatedEntry);
        }

        return {
          history,
          currentStreak: streak,
          lastCompleted: new Date().toISOString(),
          currentSession: {
            type: null,
            currentIndex: 0,
            progress: {},
            date: null,
          }
        };
      }),

      resetSession: () => set({
        currentSession: {
          type: null,
          currentIndex: 0,
          progress: {},
          date: null,
        }
      }),

      getHistoryForDate: (date) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return get().history.find(h => h.date === dateStr) || {
          date: dateStr,
          pagiCompleted: false,
          petangCompleted: false,
        };
      },

      fetchHistoryFromSupabase: async () => {
        if (!supabase) return; // Skip if Supabase is not configured
        try {
          const guestId = getGuestId();
          const { data, error } = await supabase
            .from('User_History')
            .select('*')
            .eq('guest_id', guestId);

          if (error) throw error;

          if (data && data.length > 0) {
            const history: HistoryEntry[] = data.map(item => ({
              date: item.date,
              pagiCompleted: item.pagi_completed,
              petangCompleted: item.petang_completed,
            }));

            // Calculate streak based on fetched history
            let streak = 0;
            let currentDate = new Date();
            while (true) {
              const dateStr = format(currentDate, 'yyyy-MM-dd');
              const entry = history.find(h => h.date === dateStr);
              if (entry && (entry.pagiCompleted || entry.petangCompleted)) {
                streak++;
                currentDate = subDays(currentDate, 1);
              } else {
                break;
              }
            }

            set({ history, currentStreak: streak });
          }
        } catch (error) {
          console.error('Error fetching history from Supabase:', error);
        }
      },

      syncHistoryToSupabase: async (entry: HistoryEntry) => {
        if (!supabase) return; // Skip if Supabase is not configured
        try {
          const guestId = getGuestId();
          const { error } = await supabase
            .from('User_History')
            .upsert({
              guest_id: guestId,
              date: entry.date,
              pagi_completed: entry.pagiCompleted,
              petang_completed: entry.petangCompleted,
              updated_at: new Date().toISOString(),
            }, {
              onConflict: 'guest_id, date'
            });

          if (error) throw error;
        } catch (error) {
          console.error('Error syncing history to Supabase:', error);
        }
      },
    }),
    {
      name: 'dzikir-storage-v2',
    }
  )
);
