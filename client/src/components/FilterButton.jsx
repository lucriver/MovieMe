function FilterButton({ goSetFilter, goFilter }){

    const updateFilter = (e) => {
      if(e.target.value == "Random"){
        alert("ALERT: The Random filter algorithm parses hundreds of thousands of movies. While this filter will show suitable for work content with exceptional accuracy, there is however an EXTREMELY small chance your search result may include content not suitable for work. If you are in such a sensitive environment, please use this feature with caution, or refer back to the other filters. Thank you.")
      }
      goSetFilter(e.target.value);
    }

    return(
        <select className = "main__select-box" value={goFilter} onChange={(e) => updateFilter(e)}>
        <option className ="main__select-box--option" value="Popular">Popular</option>
        <option className ="main__select-box--option" value="Top Rated">Top Rated</option>
        <option className ="main__select-box--option" value="Upcoming">Upcoming</option>
        <option className ="main__select-box--option" value="Random">Random</option>
      </select>
    )
}

export default FilterButton