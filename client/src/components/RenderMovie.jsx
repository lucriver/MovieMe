function RenderMovie(props){
  return(
    <div className="main__body">
      <div className="main__body-left">
        <div className="main__body-left--title">{props.movie.title}</div>
        <div className="main__body-left--date">{props.movie.date}</div>
        <div className="main__body-left--description">{props.movie.description}</div>
        <div className="main__body-left--creator">{props.movie.creator}</div>
        <div className="main__body-left--genre">{props.movie.genre}</div>
      </div>
      <div className="main__body-right">
        <img className="main__body-right--image" style={{border: 'none', outline: 'none'}} src={props.movie.image}/>
      </div>
  </div>
  );
}

export default RenderMovie