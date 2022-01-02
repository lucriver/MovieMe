import React from 'react'
import { useState } from 'react'
import { default as logo} from './tmdblogo.svg'
import './index.css'
import SearchButton from './components/SearchButton'
import FilterButton from './components/FilterButton'
import BodyData from './components/BodyData'
import AddToButton from './components/AddToButton'
import WatchlistButton from './components/WatchlistButton'
import DeleteButton from './components/DeleteButton'

function App(){
  const[title, setTitle] = useState('');
  const[date, setDate] = useState('');
  const[description, setDescription] = useState('');
  const[creator, setCreator] = useState('');
  const[genre, setGenre] = useState('');
  const[image, setImage] = useState('');
  const[movieID, setMovieID] = useState('');
  const[filter, setFilter] = useState('Popular');
  const[watchList, setWatchList] = useState(false); 
  const[user, setUser] = useState(null);
  const[userMovieID, setUserMovieID] = useState('');
  const[userPromise, setUserPromise] = useState([]);

  return (
    <div>
      <header className="header" onClick={() => window.location.reload(false)}>
        Movie Me!
      </header>
    <div className="main">
      <div className="main__header">
        <FilterButton 
          goSetFilter={setFilter} goFilter={filter} 
          />
        <WatchlistButton 
          goSetUser={setUser} goSetWatchList={setWatchList} 
          goSetUserPromise={setUserPromise} goSetMovieID={setMovieID} inWatchList={watchList}
          />
        <DeleteButton 
          isWatchList={watchList} userID={user} movieID={movieID} userMovieID={userMovieID}
         />
        <AddToButton 
          ptitle={title} pdate={date} pdescription={description} 
          pcreator={creator} pgenre={genre} pimage={image} pid={movieID} pwatchList={watchList} 
          />
        <SearchButton 
          goSetTitle={setTitle} goSetDate={setDate} goSetDescription={setDescription}
          goSetCreator={setCreator} goSetGenre={setGenre} goSetImage={setImage}
          goSetMovieID={setMovieID} goFilter={filter} goSetWatchList={setWatchList} 
          />
      </div>
      <BodyData 
        bodyTitle={title} bodyDate={date} bodyDescription={description}
        bodyCreator={creator} bodyGenre={genre} bodyImage={image} watchListBool={watchList} 
        bodyPromise={userPromise} bodyUser={user} goSetMovieID={setMovieID} goSetUserMovieID={setUserMovieID}
        />
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

export default App;
