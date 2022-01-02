import axios from 'axios';

function AddToButton({ ptitle, pdate, pdescription, pcreator, pgenre, pimage, pwatchList, pid }){

  function handleClick(){
      if(ptitle == ''){
        console.log("No movie selected.");
      }
      else if(pwatchList == true){
        console.log("Error, In Wachlist.");
      }
      else{
        const input = prompt("Please enter your user ID.");
        if(input == '' || input == null)
          return
        const user = {
          username: input,
        }
        return createAndAdd(user,input);
    }};

  function createAndAdd(user,input){
    axios.get('http://localhost:5000/User/')
    .then((res) => {
      let notFound = true;
      res.data.forEach((user) => {
        if(user.username == input){
          notFound = false;
          const id = user._id;
          const movie = {
            title: ptitle,
            date: pdate,
            description: pdescription,
            creator: pcreator,
            genre: pgenre,
            image: pimage,
            movieID: pid
          };
          axios.post('http://localhost:5000/User/'+id+'/movie/add',movie)
            .then(res => { return; });
        }
      })
      if(notFound){
        axios.post('http://localhost:5000/User/add',user)
          .then(res => { return; });
        createAndAdd(user,input);
      }
    })
  };

  if(ptitle !== '' && !pwatchList){
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