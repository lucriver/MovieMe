import RenderMovie from './RenderMovie'
import RenderWatchlist from './RenderWatchlist'

function BodyData({ bodyTitle, bodyDate, bodyDescription, bodyCreator, bodyGenre, bodyImage, watchListBool, bodyPromise, bodyUser, 
  goSetMovieID, goSetUserMovieID }){
  
  if(!watchListBool) {
    return(
      <RenderMovie title={bodyTitle} date={bodyDate} description={bodyDescription} 
        creator={bodyCreator} genre={bodyGenre} image={bodyImage}
        />
    );
  } else {
    if(bodyPromise.length == 0){
      return(
        <h1>
          Loading...
        </h1>
      )
    } else {
      return(
        <RenderWatchlist promise={bodyPromise} user={bodyUser} listBool={true} 
          setMovieID={goSetMovieID} setUserMovieID={goSetUserMovieID} 
          />
      )
    }
  }
};

export default BodyData