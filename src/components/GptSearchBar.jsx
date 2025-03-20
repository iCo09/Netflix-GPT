import React, { useRef, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { Netflix_logo } from '../utils/constants';

const GptSearchBar = () => {
  const searchText = useRef(null);
  const [error, setError] = useState('');
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGptSearchClick = async () => {
    const query = searchText.current.value.trim();

    if (!query) {
      setError('Please enter a movie name');
      setMovieData([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
        API_OPTIONS
      );

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovieData(data.results);
      } else {
        setError('No movie found');
        setMovieData([]);
      }
    } catch (error) {
      setError('Failed to fetch movie data');
      setMovieData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pt-20 flex flex-col items-center bg-black min-h-screen text-gray-100'>
      {/* Search Bar Section */}
      <div className='w-full max-w-2xl px-4'>
        <form
          className='bg-gray-900 w-full flex items-stretch rounded-lg border border-gray-800 shadow-lg'
          onSubmit={(e) => {
            e.preventDefault();
            handleGptSearchClick();
          }}
        >
          <input
            ref={searchText}
            type='text'
            className='px-4 w-full bg-gray-800 text-white rounded-l-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12'
            placeholder='Search for a movie...'
          />
          <button
            type='submit'
            className='px-6 bg-blue-600 text-white rounded-r-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 cursor-pointer transition-colors duration-200'
          >
            Search
          </button>
        </form>
      </div>

      {/* Loading Indicator */}
      {loading && <p className='text-blue-400 mt-4'>Loading...</p>}

      {/* Error Display */}
      {error && <p className='text-red-400 mt-4'>{error}</p>}

      {/* Movie Display Section */}
      <div className='w-full max-w-2xl mt-6 px-4'>
        {movieData.map((movie) => (
          <div
            key={movie.id}
            className='bg-gray-900 p-4 rounded-lg shadow-lg flex gap-4 mb-4 border border-gray-800
                       transform transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-blue-500/40'
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className='w-40 rounded-lg'
              />
            ) : (
              <img
                src={Netflix_logo} // Netflix logo for missing posters
                alt='Netflix Logo'
                className='w-40 rounded-lg bg-gray-700 p-2'
              />
            )}

            <div className='flex-grow'>
              <h2 className='text-xl font-bold text-white'>{movie.title}</h2>
              <p className='text-gray-300 text-sm mt-2'>
                {movie.overview || 'No description available.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GptSearchBar;
