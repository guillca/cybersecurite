import React, { useState } from 'react';
import type { Post } from '../types';
import PostForm from './PostForm';

interface PostManagerProps {
  posts: Post[];
  onAddPost: (data: Omit<Post, 'id' | 'avatar' | 'likes' | 'retweets' | 'views'>) => void;
  onUpdatePost: (post: Post) => void;
  onDeletePost: (id: number) => void;
}

const PostManager: React.FC<PostManagerProps> = ({ posts, onAddPost, onUpdatePost, onDeletePost }) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    setEditingPost(null);
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
    setEditingPost(null);
  };

  const handleSubmitForm = (data: Post | Omit<Post, 'id' | 'avatar' | 'likes' | 'retweets' | 'views'>) => {
    if ('id' in data) {
      onUpdatePost(data);
    } else {
      onAddPost(data);
    }
    setIsFormVisible(false);
    setEditingPost(null);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-b-lg shadow-lg border border-t-0 border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-300">Messages Programmés</h2>
        {!isFormVisible && (
          <button 
            onClick={handleAddNew} 
            className="px-3 py-1 bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-500 transition-colors duration-200 text-sm"
          >
            Ajouter
          </button>
        )}
      </div>

      {isFormVisible ? (
        <PostForm post={editingPost} onSubmit={handleSubmitForm} onCancel={handleCancelForm} />
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-700/50 p-3 rounded-md flex justify-between items-start gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white">{post.emitter} <span className="text-gray-400 font-normal">{post.handle}</span></p>
                <p className="text-sm text-gray-300 break-words">{post.message}</p>
                <p className="text-xs text-cyan-400 mt-1">Minute: {post.time}</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0">
                <button onClick={() => handleEdit(post)} className="px-3 py-1 text-xs bg-yellow-600 text-white font-bold rounded hover:bg-yellow-500 transition-colors">Éditer</button>
                <button onClick={() => onDeletePost(post.id)} className="px-3 py-1 text-xs bg-red-700 text-white font-bold rounded hover:bg-red-600 transition-colors">Supprimer</button>
              </div>
            </div>
          ))}
           {posts.length === 0 && (
            <p className="text-center text-gray-500 py-4">Aucun message programmé.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostManager;
