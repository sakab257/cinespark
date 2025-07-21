import { useState, useEffect } from 'react';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const sortOptions = [
  { value: 'popularity.desc', label: 'Popularité (décroissant)' },
  { value: 'popularity.asc', label: 'Popularité (croissant)' },
  { value: 'vote_average.desc', label: 'Note (décroissant)' },
  { value: 'vote_average.asc', label: 'Note (croissant)' },
  { value: 'release_date.desc', label: 'Date de sortie (récent)' },
  { value: 'release_date.asc', label: 'Date de sortie (ancien)' },
  { value: 'title.asc', label: 'Titre (A-Z)' },
  { value: 'title.desc', label: 'Titre (Z-A)' }
];

function FiltersPanel({ onFiltersChange, isVisible, onToggle }) {
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    minRating: '',
    maxRating: '',
    sortBy: 'popularity.desc'
  });

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/genre/movie/list?language=fr`, API_OPTIONS);
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      genre: '',
      year: '',
      minRating: '',
      maxRating: '',
      sortBy: 'popularity.desc'
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="mb-8">
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-1 xs:gap-2 px-3 py-2 xs:px-4 xs:py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium text-sm xs:text-base transition-all duration-200 cursor-pointer hover:scale-105 shadow-lg shadow-blue-500/25 mb-6"
      >
        <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {isVisible ? 'Masquer les filtres' : 'Afficher les filtres'}
      </button>

      {/* Filters Panel */}
      {isVisible && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {/* Genre */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Genre
              </label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Tous les genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Année
              </label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">Toutes les années</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Rating */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Note min.
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Max Rating */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Note max.
              </label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={filters.maxRating}
                onChange={(e) => handleFilterChange('maxRating', e.target.value)}
                placeholder="10"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Trier par
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 bg-gray-600/80 text-white rounded-lg hover:bg-gray-500 transition-all duration-200 cursor-pointer hover:scale-105 backdrop-blur-sm border border-gray-500/50"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FiltersPanel;