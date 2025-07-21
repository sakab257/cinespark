import { Link, useLocation } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

function Navigation() {
  const { favoritesCount } = useFavorites();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between w-full mb-8">
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="CineSpark" className="w-6 h-6 xs:w-8 xs:h-8" />
        <span className="text-lg xs:text-xl sm:text-2xl font-bold text-white">CineSpark</span>
      </Link>

      <div className="flex items-center gap-1 xs:gap-2 sm:gap-3">
        <Link 
          to="/" 
          className={`px-3 py-2 xs:px-4 xs:py-2 sm:px-6 sm:py-3 rounded-full font-medium text-sm xs:text-base transition-all duration-200 cursor-pointer hover:scale-105 ${
            location.pathname === '/' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
              : 'bg-gray-800/60 text-gray-300 hover:text-white hover:bg-gray-700/80 backdrop-blur-sm border border-gray-600/50'
          }`}
        >
          Accueil
        </Link>
        
        <Link 
          to="/favorites" 
          className={`flex items-center gap-1 xs:gap-2 px-3 py-2 xs:px-4 xs:py-2 sm:px-6 sm:py-3 rounded-full font-medium text-sm xs:text-base transition-all duration-200 cursor-pointer hover:scale-105 ${
            location.pathname === '/favorites' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
              : 'bg-gray-800/60 text-gray-300 hover:text-white hover:bg-gray-700/80 backdrop-blur-sm border border-gray-600/50'
          }`}
        >
          <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="hidden xs:inline">Favoris</span>
          <span className="xs:hidden"></span>
          {favoritesCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 xs:px-2 xs:py-1 rounded-full min-w-[16px] xs:min-w-[20px] h-4 xs:h-5 flex items-center justify-center text-[10px] xs:text-xs">
              {favoritesCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;