import React from 'react'
import axios, { Axios } from 'axios'

function DeleteButton(props){

  function handleClickDeleteUser(){
    axios.delete("/users/"+props.valueUser)
      .then((res) => {
        alert("Your account has been deleted.")
        window.location.reload(false);
      })
      .catch((err) => {console.log(err)});
  }

  function handleClickDeleteMovie(){
    axios.delete("/users/"+props.valueUser+"/movies/"+props.movieID)
      .then((res) => {
        alert("Movie has been deleted from your watchlist.");
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  }

  if(props.isWatchList && props.movieID == null){
    return(
      <button className="main__delete-button--user" onClick={() => handleClickDeleteUser()}>
        Delete User
      </button>
    )
  } else if(props.isWatchList && props.movieID !== null){
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