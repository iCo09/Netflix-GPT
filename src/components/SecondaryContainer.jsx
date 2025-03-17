import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && movies.popularMovies &&
    <div className='bg-black'>
      <div className='-mt-66 relative z-20 pl-12'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies.popularMovies} />
        <MovieList title={"Popular"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.popularMovies} />
      </div>
    </div>
  )
}

export default SecondaryContainer
