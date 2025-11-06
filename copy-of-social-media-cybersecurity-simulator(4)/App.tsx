import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SimulationStatus } from './types';
import type { Post } from './types';
import { INITIAL_SCHEDULED_POSTS } from './constants';
import AdminPanel from './components/AdminPanel';
import Timeline from './components/Timeline';
import PostManager from './components/PostManager';

// AudioContext for notification sound
let audioContext: AudioContext | null = null;
const playNotificationSound = () => {
    if (typeof window !== 'undefined' && !audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContext) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.5);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    }
};

const SIMULATION_DURATION_SECONDS = 90 * 60; // 90 minutes

function App() {
  const [simulationStatus, setSimulationStatus] = useState<SimulationStatus>(SimulationStatus.Stopped);
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>(INITIAL_SCHEDULED_POSTS);
  const [speed, setSpeed] = useState(1); // speed multiplier
  const [isManagerVisible, setIsManagerVisible] = useState(false);
  const prevPostCount = useRef(0);


  // Effect to handle the timer based on simulation status
  useEffect(() => {
    let timerId: number | undefined;

    if (simulationStatus === SimulationStatus.Running) {
      timerId = window.setInterval(() => {
        setElapsedTime(prevTime => {
            const newTime = prevTime + (1 * speed);
            if (newTime >= SIMULATION_DURATION_SECONDS) {
                setSimulationStatus(SimulationStatus.Finished);
                return SIMULATION_DURATION_SECONDS;
            }
            return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [simulationStatus, speed]);

  // Effect to update the visible posts based on elapsed time and play sound
  useEffect(() => {
    const postsToShow = scheduledPosts.filter(post => (post.time * 60) <= elapsedTime);
    
    if (postsToShow.length !== visiblePosts.length) {
      setVisiblePosts(postsToShow);
      if (postsToShow.length > prevPostCount.current && simulationStatus === SimulationStatus.Running) {
          playNotificationSound();
      }
      prevPostCount.current = postsToShow.length;
    }
  }, [elapsedTime, visiblePosts.length, scheduledPosts, simulationStatus]);

  const handleStart = useCallback(() => {
    setSimulationStatus(SimulationStatus.Running);
  }, []);

  const handlePause = useCallback(() => {
    setSimulationStatus(SimulationStatus.Paused);
  }, []);

  const handleResume = useCallback(() => {
    setSimulationStatus(SimulationStatus.Running);
  }, []);

  const handleReset = useCallback(() => {
    setSimulationStatus(SimulationStatus.Stopped);
    setElapsedTime(0);
    setVisiblePosts([]);
    setScheduledPosts(INITIAL_SCHEDULED_POSTS);
    setSpeed(1);
    prevPostCount.current = 0;
  }, []);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
  }, []);

  const handleAddPost = useCallback((postData: Omit<Post, 'id' | 'avatar' | 'likes' | 'retweets' | 'views'>) => {
    const newPost: Post = {
        ...postData,
        id: Date.now(),
        avatar: `https://picsum.photos/seed/${postData.handle}/48/48`,
        likes: 0,
        retweets: 0,
        views: 0
    };
    setScheduledPosts(prevPosts => [...prevPosts, newPost].sort((a,b) => a.time - b.time));
  }, []);
  
  const handleUpdatePost = useCallback((updatedPost: Post) => {
    setScheduledPosts(prevPosts => 
        prevPosts.map(p => p.id === updatedPost.id ? updatedPost : p).sort((a,b) => a.time - b.time)
    );
  }, []);

  const handleDeletePost = useCallback((postId: number) => {
    setScheduledPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-cyan-400">
            Cybersecurity Crisis Simulator
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6">
        <AdminPanel
          status={simulationStatus}
          elapsedTime={elapsedTime}
          speed={speed}
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onReset={handleReset}
          onSpeedChange={handleSpeedChange}
        />
        <div className="mt-6">
          <Timeline posts={visiblePosts} />
        </div>
        <div className="mt-6">
            <div className="max-w-4xl mx-auto">
                <button 
                    onClick={() => setIsManagerVisible(!isManagerVisible)}
                    className="w-full text-left p-3 bg-gray-800 border border-gray-700 rounded-t-lg hover:bg-gray-700 focus:outline-none flex justify-between items-center"
                    aria-expanded={isManagerVisible}
                    aria-controls="post-manager"
                >
                    <span className="font-semibold">Gestion des Messages</span>
                    <svg className={`w-5 h-5 transition-transform duration-300 ${isManagerVisible ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isManagerVisible && (
                     <div id="post-manager">
                        <PostManager
                            posts={scheduledPosts}
                            onAddPost={handleAddPost}
                            onUpdatePost={handleUpdatePost}
                            onDeletePost={handleDeletePost}
                        />
                     </div>
                )}
            </div>
        </div>
      </main>

      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Built for cybersecurity training purposes.</p>
      </footer>
    </div>
  );
}

export default App;
