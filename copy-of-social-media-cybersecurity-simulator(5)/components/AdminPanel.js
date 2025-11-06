import React from 'react';
import { SimulationStatus } from '../types.js';

const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const SPEED_OPTIONS = [1, 10, 60, 100];

const AdminPanel = ({ status, elapsedTime, speed, onStart, onPause, onResume, onReset, onSpeedChange }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 flex flex-wrap justify-between items-center gap-4">
      <div className="flex items-center space-x-4">
        <span className="text-gray-400 font-semibold hidden sm:inline">Temps:</span>
        <span className="text-2xl font-mono bg-gray-900 px-3 py-1 rounded-md text-cyan-400 tracking-wider">
          {formatTime(elapsedTime)}
        </span>
      </div>

      <div className="flex items-center space-x-2">
         <span className="text-gray-400 text-sm mr-2 hidden sm:inline">Vitesse:</span>
         {SPEED_OPTIONS.map(s => (
            <button 
                key={s} 
                onClick={() => onSpeedChange(s)} 
                className={`px-3 py-1 text-sm font-bold rounded-md transition-colors duration-200 ${speed === s ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                aria-pressed={speed === s}
            >
                x{s}
            </button>
         ))}
      </div>

      <div className="flex items-center space-x-2">
        {status === SimulationStatus.Stopped && (
          <button
            onClick={onStart}
            className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors duration-200"
          >
            Démarrer
          </button>
        )}
        {status === SimulationStatus.Finished && (
          <button
            disabled
            className="px-4 py-2 bg-gray-600 text-white font-bold rounded-md cursor-not-allowed"
          >
            Terminé
          </button>
        )}
        {status === SimulationStatus.Running && (
          <button
            onClick={onPause}
            className="px-4 py-2 bg-yellow-600 text-white font-bold rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            Pause
          </button>
        )}
        {status === SimulationStatus.Paused && (
          <button
            onClick={onResume}
            className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors duration-200"
          >
            Reprendre
          </button>
        )}
        {(status !== SimulationStatus.Stopped) && (
          <button
            onClick={onReset}
            className="px-4 py-2 bg-red-700 text-white font-bold rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;