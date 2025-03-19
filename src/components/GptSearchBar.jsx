import React from 'react';
import { useRef } from 'react';
import openai from '../openai';

const GptSearchBar = () => {

  const searchText = useRef(null);
  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    //make an api call to openai and get movie results

    const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query" + searchText.current.value + ". only give me the top 5 movies, comma separated like the example result given ahead. Example Result: The Shawshank Redemption, The Godfather, The Dark Knight, Pulp Fiction, Schindler's List";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo"
    });
    console.log(gptResults.choices);
  }

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='bg-black w-1/2 grid grid-cols-12 rounded-lg border border-gray-600' onSubmit={(e) => e.preventDefault()}>
        <input
          ref={searchText}
          type="text"
          className='p-4 m-4 col-span-8 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
          placeholder='What would you like to watch today?'
        />
        <button
          className='col-span-4 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;