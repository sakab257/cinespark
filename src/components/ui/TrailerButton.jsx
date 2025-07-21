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
          flex items-center gap-1 xs:gap-2 px-3 py-2 xs:px-4 xs:py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-medium text-sm xs:text-base
          transition-all duration-200 cursor-pointer hover:scale-105 shadow-lg shadow-red-500/25
          ${className}
        `}
        title="Voir la bande-annonce"
      >
        <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <span className="hidden xs:inline">Bande-annonce</span>
        <span className="xs:hidden">Trailer</span>
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