import React from 'react'

const MovieCardSkeleton = () => {
  return (
    <div className="movie-card animate-pulse">
      {/* Image skeleton */}
      <div className="bg-gray-700 rounded-lg h-64 w-full"></div>
      
      {/* Content skeleton */}
      <div className="mt-4 space-y-3">
        {/* Title skeleton */}
        <div className="bg-gray-700 h-6 rounded w-3/4"></div>
        
        {/* Rating and year skeleton */}
        <div className="flex items-center gap-2">
          <div className="bg-gray-700 h-4 w-4 rounded"></div>
          <div className="bg-gray-700 h-4 w-12 rounded"></div>
          <span className="text-gray-600">•</span>
          <div className="bg-gray-700 h-4 w-16 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default MovieCardSkeleton