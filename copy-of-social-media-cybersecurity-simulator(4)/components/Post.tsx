
import React, { useState, useEffect } from 'react';
import type { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return String(num);
};

const Post: React.FC<PostProps> = ({ post }) => {
  const [engagement, setEngagement] = useState({
    likes: post.likes,
    retweets: post.retweets,
    views: post.views,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setEngagement(prev => ({
        likes: prev.likes + Math.floor(Math.random() * 3),
        retweets: prev.retweets + (Math.random() > 0.5 ? 1 : 0),
        views: prev.views + Math.floor(Math.random() * 25) + 5,
      }));
    }, 2000 + Math.random() * 1000); // Random interval per post

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors duration-200 flex space-x-4">
      <div className="flex-shrink-0">
        <img
          src={post.avatar}
          alt={`Avatar for ${post.handle}`}
          className="w-12 h-12 rounded-full bg-gray-600"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline space-x-2">
          <span className="font-bold text-white">{post.emitter}</span>
          <span className="text-sm text-gray-400">{post.handle}</span>
          <span className="text-sm text-gray-500">·</span>
          <span className="text-sm text-gray-500">Minute {post.time}</span>
        </div>
        <p className="mt-1 text-gray-200 whitespace-pre-wrap">
          {post.message}
        </p>
        <div className="mt-3 flex items-center space-x-6 text-gray-500">
          <div className="flex items-center space-x-2 group cursor-pointer">
             <svg className="w-5 h-5 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
             <span className="text-sm group-hover:text-red-500 transition-colors">{formatNumber(engagement.likes)}</span>
          </div>
           <div className="flex items-center space-x-2 group cursor-pointer">
            <svg className="w-5 h-5 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
            <span className="text-sm group-hover:text-green-500 transition-colors">{formatNumber(engagement.retweets)}</span>
          </div>
          <div className="flex items-center space-x-2 group cursor-pointer">
            <svg className="w-5 h-5 group-hover:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <span className="text-sm group-hover:text-cyan-500 transition-colors">{formatNumber(engagement.views)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;