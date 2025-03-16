import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  useNowPlayingMovies();
  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
      {
        /*
        Main container
        -video background
        -video title
        Secondary container
        - movie list * n
        - card * n
         */
      }
    </div>
  )
}

export default Browse;
