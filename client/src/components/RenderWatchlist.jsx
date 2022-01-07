import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { RenderMovie } from '../modules'

function usePrevious(value){
  const ref = useRef()
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function RenderWatchlist({ promise, user, go_Set_User_Movie_ID}){
  const[userID, setUserID] = useState(user)
  const[movies, setMovies] = useState(promise)
  const[movie, setMovie] = useState({
    title: '',
    date: '',
    description: '',
    creator: '',
    genre: '',
    image: '',
    movieID: '',
  })

  useEffect(() => {
    setUserID(user);
    setMovies(promise)
  })

  useEffect(() => {
    setMovie({
      title: '',
      date: '',
      description: '',
      creator: '',
      genre: '',
      image: '',
      movieID: '',
    })
    go_Set_User_Movie_ID(null)
  },[userID])
  
  function handleClick(props){
    go_Set_User_Movie_ID(props.movieID);
    setMovie({ title: props.title, 
                date: props.date, 
                description: props.description, 
                creator: props.creator,
                genre: props.genre, 
                image: props.image,
                movieID: props.movieID });
  }

  if(movie.title == ''){
    return(
        <ul className="main__watch-list">
          {movies.map(movie => (
            <li className="main__watch-list--item" onClick={() => handleClick(movie)} key={movie}>{movie.title}</li>
          ))}
        </ul>
    )
  } else {
    return(
      <RenderMovie movie={movie} />
    )
  }
}


export default RenderWatchlist