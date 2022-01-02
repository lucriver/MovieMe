import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios, { Axios } from 'axios'

function usePrevious(value){
  const ref = useRef()
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function RenderWatchlist({ promise, user, listBool, setMovieID, setUserMovieID }){
  const[userState, setUserState] = useState(user)
  const[promiseState, setPromiseState] = useState(promise)
  const[listState, setListState] = useState(listBool)
  const[titlesState, setTitlesState] = useState([])
  const[titleState, setTitleState] = useState([])

  const prevUser = usePrevious(userState);

  useEffect(() => {
    setUserState(user);
    setPromiseState(promise)
  })

  function deleteTitle(movie){
    axios.delete("http://localhost:5000/User/"+userState+"/movie/delete/"+movie._id)
      .then((res) => {
        alert("Movie has been deleted from your watchlist.");
        window.location.reload(false);
      })
      .catch((err) => { console.log(err) });
  }


  function handleClick(movie){
    setListState(false)
    setTitleState(movie)
    setUserMovieID(movie._id)
    setMovieID(movie.movieID)
  }

  if(listState){
    promiseState.then((res) => { setTitlesState(res.data.movies)})
    if(titlesState[0] === undefined){
      return(
          <h1 style={{backgroundColor: 'white', 
                    fontFamily: 'Poppins',
                    marginLeft: '25px',
                    marginTop: '25px'}}>
            Your list is empty!
          </h1>
      )
    } else {
      return(
        <ul className="main__watch-list">
          {titlesState.map(title => (
            <li className="main__watch-list--item" onClick={() => handleClick(title)} key={title}>{title.title}</li>
          ))}
        </ul>
      )  
      
    }
  } else {
    if(userState !== prevUser){
      setUserState(userState);
      setPromiseState(promiseState);
      setListState(true);
      setMovieID('')
      setUserMovieID('');
    }
    if(titlesState[0] === undefined){
      return(
        <h1>
          Loading...
        </h1>
      )
    } else {
      return(
        <div className="main__body">
        <div className="main__body-left">
        <div className="main__body-left--title">{titleState.title}</div>
        <div className="main__body-left--date">{titleState.date}</div>
        <div className="main__body-left--description">{titleState.description}</div>
        <br/>
        <div className="main__body-left--creator">{titleState.creator}</div>
        <div className="main__body-left--genre">{titleState.genre}</div>
        </div>
        <div className="main__body-right">
        <img className="main__body-right--image" src={titleState.image}/>
        </div>
        </div>
      )  
    }
  }
}
export default RenderWatchlist