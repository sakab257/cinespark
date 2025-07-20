import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';

const FavoriteButton = ({ movie, className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isMovieFavorite = isFavorite(movie.id);

  const handleClick = (e) => {
    e.preventDefault(); // Empêche la navigation si c'est dans un Link
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        p-3 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer
        ${isMovieFavorite 
          ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25' 
          : 'bg-gray-800/60 text-gray-400 hover:bg-gray-700/80 hover:text-red-400 backdrop-blur-sm border border-gray-600/50'
        }
        ${className}
      `}
      title={isMovieFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <svg 
        className="w-5 h-5" 
        fill={isMovieFavorite ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;