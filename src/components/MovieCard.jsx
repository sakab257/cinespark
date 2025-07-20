import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteButton from './ui/FavoriteButton'

const MovieCard = ({movie}) => {
  const { id, title, vote_average, poster_path, release_date, original_language } = movie;
  
  return (
    <div className='movie-card relative hover:scale-105 transition-transform duration-200'>
        {/* Bouton favoris en position absolue */}
        <FavoriteButton 
          movie={movie} 
          className="absolute top-2 right-2 z-10" 
        />
        
        <Link to={`/movie/${id}`} className='block'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'No-Poster.png'} alt={title} />
            <div className='mt-4'>
                <h3>{title}</h3>
                <div className='content'>
                    <div className='rating'>    
                        <img src="star.svg" alt="rating" />
                        <p>{vote_average ? vote_average.toFixed(2) : 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </Link>
    </div>
    
  )
}

export default MovieCard