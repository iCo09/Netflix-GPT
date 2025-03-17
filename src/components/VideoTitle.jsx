import React from 'react'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className='w-screen aspect-video pt-36 px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div>
        <button
          className='py-2 px-6 bg-white text-lg text-black rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-300'
        >
          ▶️ Play
        </button>
        <button
          className='mx-2 py-2 px-6 bg-gray-500/50 text-lg text-white rounded-md cursor-pointer hover:bg-gray-600 transition-all duration-300'
        >
          ℹ️ More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle
