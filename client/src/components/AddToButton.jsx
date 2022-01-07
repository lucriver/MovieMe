import axios from 'axios';

function AddToButton(props){

  function handleClick(){    
    const input = prompt("Please enter your username.");

    const user = {
      username: input,
    };

    if(user.username == '' || user.username == ' ' || user.username == null)
      return;

    createAndAdd(user);
  }

  function createAndAdd(user){
    var promise = axios.get('users/'+user.username);
    Promise.resolve(promise)
      .then((res) => {
        switch(res.data){
          case(null):{
            console.log("IN HERE")
            axios.post('users/',user)
              .then(() => console.log("User added."))
              .catch((err) => console.log(err))
            return createAndAdd(user);
          }
          default:{
            const movie = {
              title: props.movieObject.title,
              date: props.movieObject.date,
              description: props.movieObject.description,
              creator: props.movieObject.creator,
              genre: props.movieObject.genre,
              image: props.movieObject.image,
              movieID: props.movieObject.movieID
            }
            axios.post('/users/'+user.username+'/movies',movie)
              .then((res) => alert(res.data));
            return;
          }
        }
      })
    }

  if(!props.isWatchList && props.movieObject.title !== ''){
    return(
      <div className="main__add-to-watch-list">
        <button className="main__add-to-watch-list-button"
            onClick={() => handleClick()}>
          Add to Watchlist
        </button>
      </div>
    )
  } else {
    return(
      null
    )
  }
}

export default AddToButton
