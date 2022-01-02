import React from 'react'
import axios, { Axios } from 'axios'

function DeleteButton({ isWatchList, userID, movieID, userMovieID }){

  function handleClickDeleteUser(){
    axios.delete("http://localhost:5000/User/delete/"+userID)
      .then((res) => {
        alert("Your account has been deleted.")
        window.location.reload(false)
      })
      .catch((err) => {console.log(err)});
  }

  function handleClickDeleteMovie(){
    axios.delete("http://localhost:5000/User/"+userID+"/movie/delete/"+userMovieID)
      .then((res) => {
        alert("Movie has been deleted from your watchlist.");
        window.location.reload(false);
      })
      .catch((err) => { console.log(err) });
  }

  if(isWatchList && movieID == ''){
    return(
      <button className="main__delete-button--user" onClick={() => handleClickDeleteUser()}>
        Delete User
      </button>
    )
  } else if(isWatchList && movieID !== ''){
    return(
      <button className="main__delete-button--movie" onClick={() => handleClickDeleteMovie()}>
        Delete Movie
      </button>
    )
  } else {
    return(
      null
    )
  }
}

export default DeleteButton