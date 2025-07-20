import { useState, useEffect, useCallback } from 'react'
import MovieCard from './MovieCard'
import MovieCardSkeleton from './ui/MovieCardSkeleton'
import FiltersPanel from './FiltersPanel'
import Pagination from './ui/Pagination'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const categories = [
  { id: 'popular', name: 'Populaires', endpoint: 'movie/popular' },
  { id: 'top_rated', name: 'Mieux Notés', endpoint: 'movie/top_rated' },
  { id: 'upcoming', name: 'À Venir', endpoint: 'movie/upcoming' },
  { id: 'now_playing', name: 'En Salle', endpoint: 'movie/now_playing' },
  { id: 'discover', name: 'Découvrir', endpoint: 'discover/movie' }
]

function MovieCategories() {
  const [activeCategory, setActiveCategory] = useState('popular')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchMovies(activeCategory, filters, 1)
    setCurrentPage(1)
  }, [activeCategory])

  const fetchMovies = async (categoryId, currentFilters = {}, page = 1) => {
    setLoading(true)
    setError('')

    try {
      const category = categories.find(cat => cat.id === categoryId)
      let url = `${API_BASE_URL}/${category.endpoint}?language=fr&page=${page}`

      // Ajouter les filtres pour la catégorie "Découvrir"
      if (categoryId === 'discover') {
        const params = new URLSearchParams({
          language: 'fr',
          page: page.toString(),
          sort_by: currentFilters.sortBy || 'popularity.desc'
        })

        if (currentFilters.genre) {
          params.append('with_genres', currentFilters.genre)
        }
        if (currentFilters.year) {
          params.append('year', currentFilters.year)
        }
        if (currentFilters.minRating) {
          params.append('vote_average.gte', currentFilters.minRating)
        }
        if (currentFilters.maxRating) {
          params.append('vote_average.lte', currentFilters.maxRating)
        }

        url = `${API_BASE_URL}/${category.endpoint}?${params.toString()}`
      }

      const response = await fetch(url, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()
      setMovies(data.results || [])
      setTotalPages(Math.min(data.total_pages || 1, 500)) // TMDB limite à 500 pages
    } catch (error) {
      console.error('Error fetching movies:', error)
      setError('Impossible de charger les films.')
    } finally {
      setLoading(false)
    }
  }

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    if (activeCategory === 'discover') {
      fetchMovies('discover', newFilters, 1)
    }
  }, [activeCategory])

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setCurrentPage(1)
    if (categoryId === 'discover') {
      fetchMovies(categoryId, filters, 1)
    } else {
      fetchMovies(categoryId, {}, 1)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    fetchMovies(activeCategory, filters, page)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="movie-categories mt-16">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 cursor-pointer hover:scale-105 ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-gray-800/60 text-gray-300 hover:text-white hover:bg-gray-700/80 backdrop-blur-sm border border-gray-600/50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Filters Panel - Only show for "Découvrir" category */}
      {activeCategory === 'discover' && (
        <FiltersPanel 
          onFiltersChange={handleFiltersChange}
          isVisible={showFilters}
          onToggle={() => setShowFilters(!showFilters)}
        />
      )}

      {/* Active category title */}
      <h2 className="text-2xl font-bold text-white mb-6">
        {categories.find(cat => cat.id === activeCategory)?.name}
      </h2>

      {/* Movies grid */}
      {loading ? (
        <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 20 }, (_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </ul>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
          
          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  )
}

export default MovieCategories