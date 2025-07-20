import { useState } from 'react';
import TrailerModal from './TrailerModal';

function TrailerButton({ movieId, movieTitle, className = '' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // Empêche la navigation si c'est dans un Link
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`
          flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-medium
          transition-all duration-200 cursor-pointer hover:scale-105 shadow-lg shadow-red-500/25
          ${className}
        `}
        title="Voir la bande-annonce"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
        Bande-annonce
      </button>

      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieId={movieId}
        movieTitle={movieTitle}
      />
    </>
  );
}

export default TrailerButton;