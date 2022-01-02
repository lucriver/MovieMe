import axios from "axios";

function WatchlistButton({ goSetWatchList, goSetUser, goSetUserPromise, goSetMovieID }){

  function handleClick(){
    const input = prompt("Please enter your username.");

    const user = {
      username: input,
    };

    axios.get('/User/')
      .then((res) => {
        var notFound = true;
        res.data.forEach((user) => {
          if(user.username == input){
            goSetWatchList(true);
            goSetUser(user._id);
            goSetMovieID('');
            goSetUserPromise(axios.get("/User/"+user._id));
            notFound = false;
            return;
          }
        })
        if(notFound){
          switch(input){
            case(null):
              break;
            default:
              alert("That username could not be found.");
              break;
          }
        }
      });
  };

    return(
      <button className="main__watch-list-button"
        onClick = {() =>  {
          handleClick();
        }}>
        Watch List
      </button>
    );
}

export default WatchlistButton