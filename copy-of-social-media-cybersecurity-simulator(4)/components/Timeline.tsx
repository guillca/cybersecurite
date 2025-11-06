import React from 'react';
import type { Post as PostType } from '../types';
import Post from './Post';

interface TimelineProps {
  posts: PostType[];
}

const Timeline: React.FC<TimelineProps> = ({ posts }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-400 mb-4 px-2">Timeline des événements</h2>
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="flex flex-col-reverse">
          {[...posts].map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
