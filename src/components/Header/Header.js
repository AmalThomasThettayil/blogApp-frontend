import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"

const Header = () => {
  return (
    <>
      <section className="videosection flex justify-center">
        <div className="videodiv relative ">
          <iframe
            className="video object-cover"
            width="921" height="518"
            src="https://www.youtube.com/embed/CXOnu9_f98I?playlist=CXOnu9_f98I&loop=1&autoplay=1&mute=1&controls=0"
            title="VooDoo Blue G82 M4 Comp [4K]"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </div>
        <div className="text relative container">
          <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
            <div className="w-full lg: ml-20 mb-16 lg:mb-0">
              {/* <span className="text-lg font-bold text-yellow-400">
                Create posts to educate
              </span> */}
              <h2 className="max-w-2xl mt-40 mb-12 text-8xl 2xl:text-8xl text-white font-bold font-heading">
                Stay Curious.{" "}
                {/* <span className="text-black">By creating a post</span> */}
              </h2>
              <p className="mb-12 lg:mb-16 2xl:mb-24 text-xl text-white font-bold">
                Discover stories, thinking, and expertise from writers on automobiles.
              </p>
              <Link className="inline-block px-3 py-3 text-lg text-white font-bold bg-black rounded-full hover:bg-yellow-500 hover:text-black "
                to="/posts">
                Start reading
              </Link>
            </div>
            {/* <div className="w-full lg:w-1/2 px-4">
              <img className="w-full" src={poster} alt={poster} />
            </div> */}
          </div>
        </div>
      </section>
    </>

  )
}

export default Header