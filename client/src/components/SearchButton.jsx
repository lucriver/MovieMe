import axios from 'axios'

function SearchButton({ goSetMovie, filterValue, goSetWatchList}){
  const tmdb = "https://api.themoviedb.org/3/movie/";
  const poster_path = 'https://image.tmdb.org/t/p/original';
  const tmdb_capacity = process.env.REACT_APP_CAP;

  function getRandomInt(max){
    return Math.floor(Math.random() * max);
  };

  // API call to server for key, this approach enables rate limiting.
  function handleClick(){ 
    axios.get(process.env.REACT_APP_K)
    .then((res) => {
      return queryMovie(res.data)
    })
    .catch((err) => alert("To prevent abuse of The Movie Database API, we have prevented your search query. Please try again later."));
  }

  function queryMovie(key){
    goSetWatchList(false);
    switch(filterValue){
      case('Popular'):
      case('Top Rated'):
      case('Upcoming'):{
        let filter = filterValue.toLowerCase();
        filter = filter.replace(/\s/g, '_');
        const id = getIdStandard(filter,key)
        id.then((res) => {
          getMovieObject(res,key)
        })
        break;
      }
      case('Random'):{
        const id = getIdRandomized(key);
        id.then((res) => { getMovieObject(res,key)})
      }
    }
  }

  function getIdStandard(filter,key){
    const api_pull = tmdb + filter + key + '&page=';
    const movies = axios.get(api_pull + (getRandomInt(5) + 1))
    .then((res) => {
      return res.data.results;
    })
    const id = movies.then((res) => {
      const random_index = getRandomInt(19);
      return(res[random_index].id);
    });
    return id.then((res) => { 
      return res;
    })
  }

  function getIdRandomized(key){
    const upper_bound = 25;
    const lower_bound = 25;
    let random = getRandomInt(tmdb_capacity);
    let max = random + upper_bound;
    let min = random - lower_bound;
    let movies = [];

    if(max > tmdb_capacity) 
      max = tmdb_capacity
    if(min < 0) 
      min = 0 

    const empty = { 
      popularity: '',
      id: '',
    };

    for(let i=min;i<=max;i++){
      movies.push(axios.get(tmdb + i + key)
      .then((res) => {
        if(res.data.adult == true || res.data.poster_path == null || res.data.orview == ''){
          return empty
        } else { 
          return res.data 
        }
      })
      .catch((err) => { 
        console.clear();
        return empty; 
      }));
    }

    return Promise.all(movies).then((res) =>{
      let popularities = [];
      let ids = [];
      res.forEach((res) => {
          popularities.push(res.popularity);
          ids.push(res.id);
        })
        const id_index = popularities.indexOf(Math.max(...popularities));
        return ids[id_index];
      })
  };

  function getMovieObject(id,key){
    console.log("Pulling: "+id);
    axios.get(tmdb + id + key)
      .then((res) => {
        if(res.data.adult == true)
          return
        let full_date = res.data.release_date;
        let date = full_date.substring(0,4);
        let image = poster_path + res.data.poster_path;
        let genre = "Genre(s): ";
        for(let i=0;i<(res.data.production_companies).length;i++){
          if(res.data.production_companies[i].origin_country == ''){ 
            continue; 
          }
          var origin = "Origin: " + res.data.production_companies[i].origin_country;
        }
        if(origin == {})
          origin = "Origin: " + res.data.production_countries[0].name ;
        for(let i=0;i<(res.data.genres).length;i++)
          genre = genre + res.data.genres[i].name + ", " 
        goSetMovie({ title: res.data.title, date: date, description: res.data.overview,
                    creator: origin, genre: genre, image: image, movieID: id });
      })
      .catch((err) => console.log(err));
  }

  return(
    <button className="main__search-button" onClick={() => handleClick()}>
      Search!
    </button>
  )

}
export default SearchButton