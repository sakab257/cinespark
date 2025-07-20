import { useState, useEffect } from 'react';

function TrailerModal({ isOpen, onClose, movieId, movieTitle }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  useEffect(() => {
    if (isOpen && movieId) {
      fetchTrailer();
    }
  }, [isOpen, movieId]);

  const fetchTrailer = async () => {
    setLoading(true);
    setError('');
    setTrailerKey(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${movieId}/videos?language=fr`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error('Failed to fetch trailer');
      }

      const data = await response.json();
      
      // Chercher une bande-annonce YouTube
      const trailer = data.results?.find(
        video => video.site === 'YouTube' && 
                (video.type === 'Trailer' || video.type === 'Teaser')
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        // Essayer en anglais si pas de trailer en français
        const responseEn = await fetch(
          `${API_BASE_URL}/movie/${movieId}/videos?language=en`,
          API_OPTIONS
        );
        
        if (responseEn.ok) {
          const dataEn = await responseEn.json();
          const trailerEn = dataEn.results?.find(
            video => video.site === 'YouTube' && 
                    (video.type === 'Trailer' || video.type === 'Teaser')
          );
          
          if (trailerEn) {
            setTrailerKey(trailerEn.key);
          } else {
            setError('Aucune bande-annonce disponible pour ce film.');
          }
        } else {
          setError('Aucune bande-annonce disponible pour ce film.');
        }
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      setError('Impossible de charger la bande-annonce.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTrailerKey(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            Bande-annonce - {movieTitle}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-white">Chargement de la bande-annonce...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-red-500 mb-2">⚠️</div>
                <div className="text-gray-300">{error}</div>
              </div>
            </div>
          ) : trailerKey ? (
            <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                title={`Bande-annonce de ${movieTitle}`}
                className="absolute inset-0 w-full h-full rounded"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;