'use client';
import React, { useState, useEffect } from 'react';
import { Wrench } from 'lucide-react';

export default function UnderConstruction() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-emerald-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border-4 border-cyan-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 border-4 border-orange-500/20 rotate-45 animate-pulse" />
      </div>

      {/* Glowing dots */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const size = 4 + (i % 3) * 3;
          const colors = ['rgba(16, 185, 129, 0.8)', 'rgba(6, 182, 212, 0.8)', 'rgba(251, 146, 60, 0.8)'];
          return (
            <div
              key={i}
              className="absolute rounded-full animate-float-smooth"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                top: `${(i * 7) % 100}%`,
                left: `${(i * 13) % 100}%`,
                background: `radial-gradient(circle, ${colors[i % 3]}, transparent)`,
                animationDelay: `${(i * 0.3) % 5}s`,
                animationDuration: `${8 + (i % 4) * 2}s`,
                filter: 'blur(1px)',
                boxShadow: '0 0 20px currentColor'
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Main icon */}
        <div className="mb-8 inline-block relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-3xl opacity-50 animate-pulse" />
          <Wrench size={100} className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-orange-400" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter">
          <span className="inline-block bg-gradient-to-r from-emerald-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
            COMING
          </span>
          <br />
          <span className="inline-block bg-gradient-to-r from-orange-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-pulse" style={{ animationDelay: '0.5s' }}>
            SOON
          </span>
        </h1>

        {/* Clock */}
        <div className="flex justify-center gap-4">
          {[
            { val: time.hours, label: 'HRS' },
            { val: time.minutes, label: 'MIN' },
            { val: time.seconds, label: 'SEC' }
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-xl border border-cyan-400/30 rounded-xl p-6 min-w-[100px]">
              <div className="text-5xl font-bold text-cyan-400 mb-2">
                {String(item.val).padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400 tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-smooth {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(30px, -50px) scale(1.5);
            opacity: 0.8;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(0, -100px) scale(0.5);
            opacity: 0;
          }
        }
        .animate-float-smooth {
          animation: float-smooth ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}