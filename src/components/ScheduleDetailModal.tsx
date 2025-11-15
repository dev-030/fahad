'use client';

import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Schedule } from '@/lib/schedule';
import { Coach } from '@/lib/types';
import { format, parseISO } from 'date-fns';

interface ScheduleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Schedule | null;
  coach: Coach | null;
}

const ScheduleDetailModal: React.FC<ScheduleDetailModalProps> = ({
  isOpen,
  onClose,
  session,
  coach,
}) => {
  if (!isOpen || !session) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-8 max-w-lg w-full relative text-white animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-red-600 transition-colors"
          aria-label="Close modal"
        >
          <FaTimes size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-black uppercase text-red-600">{session.discipline}</h2>
          <p className="text-neutral-400 mt-2 max-w-lg mx-auto">
            with {coach ? coach.name : 'Unknown Coach'}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="font-bold text-neutral-400">Date & Time</p>
            <p>{format(parseISO(session.datetime), "EEEE, MMMM d, yyyy 'at' p")}</p>
          </div>
          <div>
            <p className="font-bold text-neutral-400">Duration</p>
            <p>{session.duration}</p>
          </div>
          {coach && (
            <div>
              <p className="font-bold text-neutral-400">Coach</p>
              <p>{coach.title}</p>
            </div>
          )}
        </div>

        <div className="text-center pt-6">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-12 uppercase rounded-full transition-all hover:shadow-lg hover:shadow-red-600/50 hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ScheduleDetailModal;
