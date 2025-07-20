import { useState, useEffect, useRef } from 'react'
import Search from '../components/Search'
import MovieCard from '../components/MovieCard'
import MovieCardSkeleton from '../components/ui/MovieCardSkeleton'
import MovieCategories from '../components/MovieCategories'
import Navigation from '../components/Navigation'
import { useDebounce } from 'react-use'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const resultsRef = useRef(null);

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 750, [searchTerm]);
  
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchMovies = async (query = '') => {
    setLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=fr`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&language=fr`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if(data.Response === 'False'){
        setErrorMessage(data.Error || "Aucun film trouvé pour cette recherche.");
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
      
      // Scroll vers les résultats si on fait une recherche
      if (query && resultsRef.current) {
        setTimeout(() => {
          resultsRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      }
    } catch (error) {
      console.error('Erreur pendant le fetching :', error);
      setErrorMessage("Impossible d'acceder aux films. Réessayer plus tard.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='wrapper'>
      <Navigation />
      <header>
        <img src='./hero-img.png' />
        <h1>Trouvez <span className='text-gradient'>Tous Les Films</span> Que Vous Aimez Sans Prise De Tête</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>

      {/* Show search results only when searching */}
      {searchTerm && (
        <section ref={resultsRef} className='all-movies'>
          <h2 className='mt-[40px]'>Résultats de recherche pour "{searchTerm}"</h2>
          {loading ? 
          (
            <ul>
              {Array.from({ length: 8 }, (_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
            </ul>
          ): errorMessage ? (
            <p className='error'>{errorMessage}</p>
          ) :(
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )
          }
        </section>
      )}

      {/* Show categories when not searching */}
      {!searchTerm && <MovieCategories />}
    </div>
  )
}

export default Home