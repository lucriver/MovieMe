import RenderMovie from './RenderMovie'
import RenderWatchlist from './RenderWatchlist'

function BodyData({ movieObject, isWatchList, promiseValue, userValue, goSetUserMovieID }){
  
  if(!isWatchList) {
    return( 
      <RenderMovie movie={movieObject} /> 
    );
  } else {
    if(promiseValue.length == 0){
      return(
        <h1>
          Loading...
        </h1>
      )
    } else {
      return(
        <RenderWatchlist promise={promiseValue} user={userValue} go_Set_User_Movie_ID={goSetUserMovieID}/>
      )
    }
  }
};

export default BodyData