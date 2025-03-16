import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-36 px-12' >
      <h1 className='text-6xl font-bold' >{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div className=''>
        <button className = 'p-4 bg-gray-500/50 px-12 text-xl text-white rounded-lg cursor-pointer'>▶️ Play</button>
        <button className = ' mx-2 p-4 bg-gray-500/50 px-12 text-xl text-white rounded-lg cursor-pointer' >ℹ️ More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle
