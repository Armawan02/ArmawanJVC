/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Terminal, 
  Clock, 
  Activity, 
  ChevronRight,
  Code2,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Data ---

type Duration = 1 | 5 | 10 | 15 | 20 | 30;

interface Routine {
  title: string;
  exercises: string[];
  description: string;
}

const ROUTINES: Record<Duration, Routine> = {
  1: {
    title: "Quick Sync: Neck & Shoulders",
    exercises: ["Neck Rotations (30s)", "Shoulder Rolls (30s)"],
    description: "Perfect for a quick CI/CD build break. Loosen up those typing muscles."
  },
  5: {
    title: "Arch Body Holds & Core",
    exercises: ["Arch Body Holds (3x45s)", "Plank (60s)", "Hollow Body Rocks (45s)"],
    description: "Focus on posterior chain and core stability. Essential for good sitting posture."
  },
  10: {
    title: "Ring Chest Flys & Push-ups",
    exercises: ["Ring Flys (3x10)", "Diamond Push-ups (3x12)", "Pseudo Planche Push-ups (2x8)"],
    description: "Upper body push volume. Re-energize your chest and triceps."
  },
  15: {
    title: "Scapular Pulls & Active Hangs",
    exercises: ["Active Hangs (3x45s)", "Scapular Pull-ups (3x12)", "Chin-ups (3x8)"],
    description: "Decompress your spine and activate your lats. Great for counteracting slouching."
  },
  20: {
    title: "Handstand Practice & Tuck Front Levers",
    exercises: ["Wall Walk to HS (3x)", "Tuck Front Lever Holds (4x15s)", "Crow Pose (3x30s)"],
    description: "Advanced skill training. Focus and balance while your AI agent trains."
  },
  30: {
    title: "Full Muscle-Up Progressions",
    exercises: ["Explosive Pull-ups (3x5)", "Deep Dips (3x10)", "Transition Drills (5x3)", "Negative Muscle-ups (3x3)"],
    description: "Total power routine. High intensity session for deep focus intervals."
  }
};

// --- Components ---

export default function App() {
  const [selectedDuration, setSelectedDuration] = useState<Duration>(5);
  const [currentRoutine, setCurrentRoutine] = useState<Routine | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setShowSuccess(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    if (currentRoutine) {
      setTimeLeft(selectedDuration * 60);
    }
    setShowSuccess(false);
  };

  const generateRoutine = () => {
    const routine = ROUTINES[selectedDuration];
    setCurrentRoutine(routine);
    setTimeLeft(selectedDuration * 60);
    setIsActive(false);
    setShowSuccess(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const markAsDone = () => {
    setIsActive(false);
    setTimeLeft(0);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 lg:py-20">
        
        {/* Header */}
        <header className="mb-12 space-y-2">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-emerald-400 mb-2"
          >
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <Code2 size={24} />
            </div>
            <span className="font-mono text-sm tracking-widest uppercase font-bold">System.workout()</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black tracking-tight text-white"
          >
            Cali<span className="text-emerald-500">Code</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl"
          >
            Optimalkan waktu tunggu AI Agent dengan rutinitas kalistenik singkat. 
            Level up your physique while your code compiles.
          </motion.p>
        </header>

        {/* Configuration Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Duration Selector */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-6 text-slate-300">
              <Clock size={18} className="text-emerald-500" />
              <h2 className="font-bold tracking-tight uppercase text-xs">Set Duration (min)</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-8">
              {([1, 5, 10, 15, 20, 30] as Duration[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDuration(d)}
                  className={`
                    py-3 px-4 rounded-xl border font-mono font-bold transition-all
                    ${selectedDuration === d 
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]' 
                      : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500 active:scale-95'}
                  `}
                >
                  {d}
                </button>
              ))}
            </div>

            <button
              onClick={generateRoutine}
              className="w-full py-4 bg-white hover:bg-emerald-50 transition-colors text-slate-950 rounded-xl font-bold flex items-center justify-center gap-2 group"
            >
              <Zap size={18} className="group-hover:fill-emerald-500" />
              Generate Routine
              <ChevronRight size={18} className="opacity-50 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Main Display Area */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {currentRoutine ? (
                <motion.div
                  key={currentRoutine.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden"
                >
                  {/* Decorative terminal garnish */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-right from-emerald-500 via-emerald-400 to-transparent opacity-30" />
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-emerald-500 font-mono text-[10px] uppercase font-bold tracking-widest block mb-1">Active Routine</span>
                        <h3 className="text-2xl font-bold text-white">{currentRoutine.title}</h3>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                        <Terminal size={20} className="text-emerald-400" />
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {currentRoutine.description}
                    </p>

                    <div className="space-y-3">
                      {currentRoutine.exercises.map((ex, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-sm font-medium">{ex}</span>
                        </div>
                      ))}
                    </div>

                    {/* Timer UI */}
                    <div className="pt-8 border-t border-slate-800">
                      <div className="flex flex-col items-center gap-6">
                        <div className="font-mono text-7xl font-black tracking-tighter text-white tabular-nums drop-shadow-[0_4px_10px_rgba(255,255,255,0.1)]">
                          {formatTime(timeLeft)}
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <button
                            onClick={toggleTimer}
                            disabled={timeLeft === 0}
                            className={`
                              p-5 rounded-full transition-all
                              ${isActive 
                                ? 'bg-slate-800 text-slate-400 border border-slate-700' 
                                : 'bg-emerald-500 text-slate-950 hover:scale-110 active:scale-95 shadow-lg shadow-emerald-500/20'}
                              disabled:opacity-30 disabled:pointer-events-none
                            `}
                          >
                            {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                          </button>
                          
                          <button
                            onClick={resetTimer}
                            className="p-4 bg-slate-800 text-slate-400 rounded-full border border-slate-700 hover:border-slate-500 transition-colors"
                          >
                            <RotateCcw size={20} />
                          </button>

                          <button
                            onClick={markAsDone}
                            className="pl-6 pr-8 py-4 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-full border border-slate-700 transition-all flex items-center gap-2 group font-bold text-sm"
                          >
                            <CheckCircle size={18} className="group-hover:scale-110 transition-transform" />
                            Mark as Done
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-800 rounded-2xl text-center space-y-4"
                >
                  <Activity size={48} className="text-slate-700" />
                  <div className="space-y-1">
                    <p className="text-slate-400 font-bold">No routine loaded</p>
                    <p className="text-slate-500 text-sm italic">Select duration and click Generate Routine to begin.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl shadow-emerald-500/10"
              >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Build Success!</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Workout routine completed. Level up confirmed. Time to get back to the code.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 transition-colors text-slate-950 rounded-xl font-bold"
                >
                  Continue Coding
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Footer Meta */}
        <footer className="mt-20 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span>Status: Stable</span>
            <span>Version: 1.0.4-LTS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500/50">Inspired by Sandhika Galih & Calisthenics Logic</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
