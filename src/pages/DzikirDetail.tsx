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

  // Calculate progress and rotation
  const radius = 40;
  const progressRatio = Math.min(currentProgress / currentItem.target, 1);
  const rotationDegrees = progressRatio * 360;

  return (
    <div className="relative flex flex-col h-screen max-w-md mx-auto overflow-hidden bg-white">
      <div className="flex items-center px-4 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <button 
          onClick={() => navigate('/')}
          className="flex w-12 h-12 items-center justify-center rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all border border-gray-50"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-gray-800 text-xl font-bold leading-7 flex-1 text-center truncate px-2 capitalize">
          Dzikir {type === 'pagi' ? 'Pagi' : 'Petang'}
        </h2>
        <button 
          onClick={() => resetProgress(currentItem.id)}
          className="flex w-12 h-12 items-center justify-center rounded-2xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all border border-gray-50"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-[240px] space-y-6">
        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-[2rem] p-8 space-y-8 relative overflow-hidden">
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-50/50 rounded-full blur-3xl"></div>
          <div className="flex justify-center relative z-10">
            <div className="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-emerald-50 text-emerald-700 shadow-[0_2px_10px_rgba(16,185,129,0.1)]">
              <span className="text-xs font-semibold mr-2 uppercase tracking-wider">Dibaca:</span>
              <span className="text-sm font-bold">{currentItem.target} kali</span>
            </div>
          </div>
          <h3 className="font-arabic text-gray-800 text-3xl leading-[4rem] text-right font-bold tracking-wider relative z-10" dir="rtl">
            {currentItem.arabic}
          </h3>
          <div className="space-y-5 relative z-10">
            <p className="text-emerald-600 font-semibold text-left text-sm italic leading-relaxed">
              {currentItem.transliteration}
            </p>
            <p className="text-gray-500 text-sm leading-relaxed text-left">
              {currentItem.translation}
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Block */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-xl border-t border-gray-100 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20">
        <div className="flex items-center justify-center mb-8 -mt-16">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Background Circle with Shading */}
            <div className="absolute inset-0 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-50"></div>
            
            {/* Progress Arc */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Track */}
              <circle
                className="text-gray-100"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50"
              />
              {/* Progress */}
              <circle
                className="text-emerald-500"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * radius}
                strokeDashoffset={2 * Math.PI * radius * (1 - progressRatio)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50"
                style={{ 
                  transition: 'stroke-dashoffset 0.5s ease-in-out',
                  transformOrigin: '50px 50px',
                  transform: 'rotate(-90deg)'
                }}
              />
              {/* Handle/Knob Container */}
              <g
                style={{
                  transformOrigin: '50px 50px',
                  transform: `rotate(${rotationDegrees}deg)`,
                  transition: 'transform 0.5s ease-in-out'
                }}
              >
                {/* Knob positioned at 12 o'clock (cy = 50 - radius = 10) */}
                <circle
                  className="fill-white stroke-emerald-500"
                  strokeWidth="3"
                  r="6"
                  cx="50"
                  cy="10"
                  style={{
                    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))'
                  }}
                />
              </g>
            </svg>

            {/* Center Content */}
            <button 
              onClick={handleTap}
              disabled={isTargetReached}
              className="relative z-10 flex flex-col items-center justify-center w-[116px] h-[116px] rounded-full bg-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] active:scale-95 transition-transform border border-gray-50"
            >
              <span className="text-4xl font-bold text-gray-800 tracking-tight">{currentProgress}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">DARI {currentItem.target}</span>
              <span className="text-[9px] font-bold text-emerald-500 uppercase mt-2 tracking-wider">TAP DI SINI</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-2">
          <button 
            onClick={handlePrev}
            disabled={currentSession.currentIndex === 0}
            className={clsx(
              "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300",
              currentSession.currentIndex === 0
                ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                : "bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] text-gray-600 hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] active:scale-95"
            )}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <span className="text-sm font-bold text-gray-500 tracking-widest">
            {currentSession.currentIndex + 1} / {filteredDzikir.length}
          </span>

          <button 
            onClick={handleNext}
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 bg-emerald-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
