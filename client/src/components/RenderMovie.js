function RenderMovie({ title, date, description, creator, genre, image }){
  return(
    <div className="main__body">
      <div className="main__body-left">
        <div className="main__body-left--title">{title}</div>
        <div className="main__body-left--date">{date}</div>
        <div className="main__body-left--description">{description}</div>
        <br/>
        <div className="main__body-left--creator">{creator}</div>
        <div className="main__body-left--genre">{genre}</div>
      </div>
      <div className="main__body-right">
        <img className="main__body-right--image" style={{border: 'none', outline: 'none'}} src={image}/>
      </div>
  </div>
  );
}

export default RenderMovie