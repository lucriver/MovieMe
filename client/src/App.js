import React, { Component, useEffect } from 'react'
import { useState } from 'react'
import { default as logo} from './tmdblogo.svg'
import './index.css';
import { FilterButton, WatchlistButton, DeleteButton, AddToButton, SearchButton, BodyData }  from './modules'

export default function App(){
  const[movie, setMovie] = useState({
    title: '',
    date: '',
    description: '',
    creator: '',
    genre: '',
    image: '',
    movieID: '',
  })
  const[filter, setFilter] = useState('Popular');
  const[watchList, setWatchList] = useState(false); 
  const[user, setUser] = useState(null);
  const[userMovieID, setUserMovieID] = useState(null);
  const[userPromise, setUserPromise] = useState([]);

  return (
    <div className="container">
      <header className="header" onClick={() => window.location.reload(false)}>
        Movie Me!
      </header>
    <div className="main">
      <div className="main__header">
        <FilterButton    goSetFilter={setFilter} filterValue={filter}/>
        <WatchlistButton goSetUser={setUser} goSetWatchList={setWatchList} goSetUserPromise={setUserPromise}/>
        <DeleteButton    isWatchList={watchList} valueUser={user} movieID={userMovieID}/>
        <AddToButton     movieObject={movie} isWatchList={watchList}/>
        <SearchButton    goSetMovie={setMovie} filterValue={filter} goSetWatchList={setWatchList}/>
      </div>
      <div className="main__body-container">
        <BodyData movieObject={movie} isWatchList={watchList} promiseValue={userPromise} 
                  userValue={user} goSetUserMovieID={setUserMovieID}/>
      </div>
    </div>
    <footer className="footer">
      <div onClick={() => {window.open("https://www.lucasrh.com/#","_blank")}} style={{cursor:'pointer'}}>
        Lucas Hirt 2021
      </div>
      <img className="footer__footer-image--image" style={{cursor:'pointer'}} onClick={() => {window.open('https://developers.themoviedb.org/3/getting-started/introduction',"_blank")}}
        src={logo}/>
      <div onClick={() => {window.open("https://www.lucasrh.com/#movieme","_blank")}} style={{cursor:'pointer'}}>
        About This Project
      </div>
    </footer>
  </div>
  )
}

