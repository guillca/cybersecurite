import React, { useState, useEffect } from 'react';

const PostForm = ({ post, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        emitter: '',
        handle: '',
        message: '',
        time: 1,
    });

    useEffect(() => {
        if (post) {
            setFormData({
                emitter: post.emitter,
                handle: post.handle,
                message: post.message,
                time: post.time,
            });
        } else {
            // Reset for new post
            setFormData({ emitter: '', handle: '', message: '', time: 1 });
        }
    }, [post]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'time' ? parseInt(value, 10) || 0 : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.emitter.trim() || !formData.handle.trim() || !formData.message.trim() || formData.time <= 0) {
            alert('Veuillez remplir tous les champs. Le temps doit être un nombre supérieur à 0.');
            return;
        }
        
        if (post) {
            onSubmit({ ...post, ...formData });
        } else {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded-lg space-y-4 animate-fade-in">
             <h3 className="text-md font-semibold text-white">{post ? 'Modifier le message' : 'Ajouter un nouveau message'}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="emitter" className="block text-sm font-medium text-gray-300 mb-1">Émetteur</label>
                    <input type="text" name="emitter" id="emitter" value={formData.emitter} onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"/>
                </div>
                 <div>
                    <label htmlFor="handle" className="block text-sm font-medium text-gray-300 mb-1">Handle</label>
                    <input type="text" name="handle" id="handle" value={formData.handle} onChange={handleChange} required placeholder="@username" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"/>
                </div>
             </div>
             <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-1">Moment (minutes)</label>
                <input type="number" name="time" id="time" value={formData.time} onChange={handleChange} required min="1" className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"/>
             </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea name="message" id="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-white focus:ring-cyan-500 focus:border-cyan-500"></textarea>
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white font-bold rounded-md hover:bg-gray-500 transition-colors duration-200">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-500 transition-colors duration-200">Enregistrer</button>
            </div>
        </form>
    );
};

export default PostForm;