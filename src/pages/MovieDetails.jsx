import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import FavoriteButton from '../components/ui/FavoriteButton';
import TrailerButton from '../components/ui/TrailerButton';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    setError('');

    try {
      // Fetch movie details
      const movieResponse = await fetch(
        `${API_BASE_URL}/movie/${id}?language=fr`,
        API_OPTIONS
      );
      
      // Fetch movie credits
      const creditsResponse = await fetch(
        `${API_BASE_URL}/movie/${id}/credits?language=fr`,
        API_OPTIONS
      );

      if (!movieResponse.ok || !creditsResponse.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const movieData = await movieResponse.json();
      const creditsData = await creditsResponse.json();

      setMovie(movieData);
      setCredits(creditsData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError('Impossible de charger les détails du film.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="wrapper">
        <p className="text-white text-center">Chargement des détails...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wrapper">
        <p className="text-red-500 text-center">{error}</p>
        <Link to="/" className="text-blue-400 hover:underline block text-center mt-4">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="wrapper">
      <Navigation />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="lg:col-span-1">
          <img
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'No-Poster.png'}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
              <div className="flex items-center gap-3">
                <TrailerButton movieId={movie.id} movieTitle={movie.title} />
                <FavoriteButton movie={movie} />
              </div>
            </div>
            {movie.tagline && (
              <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
            )}
            
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2">
                <img src="/star.svg" alt="rating" className="w-5 h-5" />
                <span className="font-bold">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                <span className="text-gray-300">({movie.vote_count} votes)</span>
              </div>
              <span>•</span>
              <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
              <span>•</span>
              <span>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</span>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-blue-500/25 cursor-pointer hover:scale-105 transition-all duration-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Synopsis */}
          {movie.overview && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>
          )}

          {/* Cast */}
          {credits && credits.cast && credits.cast.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Casting</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {credits.cast.slice(0, 8).map((actor) => (
                  <div key={actor.id} className="text-center">
                    <img
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'No-Poster.png'}
                      alt={actor.name}
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <p className="text-white font-semibold text-sm">{actor.name}</p>
                    <p className="text-gray-400 text-xs">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;