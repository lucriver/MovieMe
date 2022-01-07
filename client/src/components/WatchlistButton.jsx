import axios from "axios";

function WatchlistButton({ goSetWatchList, goSetUser, goSetUserPromise }){

  function handleClick(){
    const input = prompt("Please enter your username.");

    const user = {
      username: input,
    };

    if(user.username == '' || user.username == ' ' || user.username == null)
      return;
    
    const promise = axios.get('users/'+user.username);
    Promise.resolve(promise)
      .then((res) => {
        switch(res.data){
          case(null):
            alert('That user does not exist.');
            return;
          default:
            goSetWatchList(true);
            goSetUser(user.username);
            goSetUserPromise(res.data.movies);
            return;
        }
      })
      .catch((err) => console.log(err))
  };

    return(
      <button className="main__watch-list-button" onClick = {() => handleClick()}>
        Watch List
      </button>
    );
}

export default WatchlistButton