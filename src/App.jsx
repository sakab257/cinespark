import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import { FavoritesProvider } from './contexts/FavoritesContext'

function AppContent() {
  const location = useLocation();
  
  const getMainClass = () => {
    if (location.pathname === '/') return 'home-page';
    if (location.pathname.startsWith('/movie/')) return 'detail-page';
    return 'detail-page'; // Pour favorites et autres pages
  };

  return (
    <main className={getMainClass()}>
      <div className='pattern'></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <AppContent />
      </Router>
    </FavoritesProvider>
  )
}

export default App