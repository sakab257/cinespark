import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import MovieCard from '../components/MovieCard';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="wrapper">
      <Navigation />
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Mes Favoris
          <span className="text-xl text-gray-400 ml-3">
            ({favorites.length} film{favorites.length > 1 ? 's' : ''})
          </span>
        </h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Aucun film dans vos favoris
          </h2>
          <p className="text-gray-400 mb-8">
            Commencez à ajouter des films à votre liste de favoris en cliquant sur le cœur
          </p>
          <Link 
            to="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Découvrir des films
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default Favorites;