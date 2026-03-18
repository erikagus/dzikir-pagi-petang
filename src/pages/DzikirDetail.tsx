import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Info, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { useStore, DzikirType } from '../store/useStore';
import { dzikirData } from '../data/dzikir';
import { clsx } from 'clsx';

export function DzikirDetail() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  const { currentSession, startSession, incrementProgress, resetProgress, nextDzikir, prevDzikir, completeSession } = useStore();

  useEffect(() => {
    if (type === 'pagi' || type === 'petang') {
      startSession(type as DzikirType);
    }
  }, [type, startSession]);

  const filteredDzikir = dzikirData.filter(d => d.type === 'both' || d.type === type);
  const currentItem = filteredDzikir[currentSession.currentIndex];
  
  if (!currentItem) {
    return null;
  }

  const currentProgress = currentSession.progress[currentItem.id] || 0;
  const isTargetReached = currentProgress >= currentItem.target;

  const handleTap = () => {
    if (!isTargetReached) {
      const isFinalTap = currentProgress + 1 === currentItem.target;
      incrementProgress(currentItem.id, currentItem.target);
      
      if (navigator.vibrate) {
        if (isFinalTap) {
          // Double vibration for completion
          navigator.vibrate([100, 50, 100]);
        } else {
          // Single vibration for normal tap
          navigator.vibrate(50);
        }
      }
    }
  };

  const handleNext = () => {
    if (currentSession.currentIndex < filteredDzikir.length - 1) {
      nextDzikir();
    } else {
      // Check if all dzikir are completed
      const allCompleted = filteredDzikir.every(d => (currentSession.progress[d.id] || 0) >= d.target);
      
      if (allCompleted) {
        completeSession();
        navigate('/history');
      }
    }
  };

  const handlePrev = () => {
    if (currentSession.currentIndex > 0) {
      prevDzikir();
    }
  };

  return (
    <div className="relative flex flex-col h-screen max-w-md mx-auto overflow-hidden bg-[#F5FBF7]">
      <div className="flex items-center px-4 py-3 bg-[#F5FBF7] sticky top-0 z-10">
        <button 
          onClick={() => navigate('/')}
          className="flex w-12 h-12 items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#171D1A]" />
        </button>
        <h2 className="text-[#171D1A] text-[22px] font-normal leading-7 flex-1 text-center truncate px-2">
          Dzikir {type === 'pagi' ? 'Pagi' : 'Petang'}
        </h2>
        <button className="flex w-12 h-12 items-center justify-center rounded-full hover:bg-black/5 active:bg-black/10 transition-colors">
          <Info className="w-6 h-6 text-[#404944]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-2 space-y-6">
        <div className="bg-[#DBE5DE]/30 rounded-2xl p-6 space-y-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#CFE9D9] text-[#0A1F16]">
              <span className="text-xs font-medium mr-2">Dibaca:</span>
              <span className="text-sm font-bold">{currentItem.target} kali</span>
            </div>
          </div>
          <h3 className="font-arabic text-[#171D1A] text-2xl leading-[3.5rem] text-right font-bold tracking-wider" dir="rtl">
            {currentItem.arabic}
          </h3>
          <div className="space-y-4">
            <p className="text-[#006C4C] font-medium text-left text-sm italic leading-relaxed">
              {currentItem.transliteration}
            </p>
            <p className="text-[#404944] text-xs leading-6 text-left tracking-wide">
              {currentItem.translation}
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Block */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-[#F5FBF7] border-t border-gray-200 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-center gap-8 mb-6">
          <button 
            onClick={() => resetProgress(currentItem.id)}
            className="w-12 h-12 rounded-full bg-[#E8F5EE] text-[#006C4C] flex items-center justify-center hover:bg-[#CFE9D9] transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-[#006C4C]"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - Math.min(currentProgress / currentItem.target, 1))}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
            </svg>
            <button 
              onClick={handleTap}
              disabled={isTargetReached}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <span className="text-[10px] font-bold text-[#404944]">TAP</span>
            </button>
          </div>

          <div className="w-12 h-12 rounded-full bg-[#CFE9D9] text-[#0A1F16] flex items-center justify-center font-bold text-lg">
            {currentProgress}
          </div>
        </div>
        
        <div className="flex items-center justify-between px-4">
          <button 
            onClick={handlePrev}
            disabled={currentSession.currentIndex === 0}
            className={clsx(
              "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
              currentSession.currentIndex === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#E8F5EE] text-[#0A1F16] hover:bg-[#E8F5EE]/80 active:bg-[#E8F5EE]/70"
            )}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <span className="text-sm font-medium text-[#404944]">
            {currentSession.currentIndex + 1} / {filteredDzikir.length}
          </span>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-[#CFE9D9] text-[#0A1F16] hover:bg-[#CFE9D9]/80 active:bg-[#CFE9D9]/70"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Sheet Modal */}
    </div>
  );
}
