window.addEventListener("DOMContentLoaded", ()=>{

    const BASE_URL = "https://api.themoviedb.org/3"
    const API_KEY = "api_key=fc06c115e1fec3f3d431ec1ca6c4f565";
    const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
    const Image_URL = "https://image.tmdb.org/t/p/w500/";

    const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;
    
    const movie_list = document.querySelector('#movie-list');
    const search_form = document.querySelector('#search');
    const search_box = document.querySelector('#search-box');
 
    fetch_movies(API_URL);
   
    function fetch_movies(url) {
        fetch(url).then(res => 
            res.json()
        ).then(data => {
            show_movies(data.results);
        })   
    }
    function show_movies(data){
       
        data.forEach(movie => {

            console.log(movie)
            const movieElement = document.createElement("div");
            movieElement.classList.add("movie-card");
    
            const image = document.createElement("img");
            image.setAttribute("src", Image_URL + movie.poster_path )
            image.setAttribute("alt", movie.original_title);
            movieElement.appendChild(image);

            const movie_info = document.createElement("div");
            movie_info.classList.add("movie-card-body");
            
            const movie_title = document.createElement("h1");
            movie_title.textContent = movie.original_title;
            movie_info.appendChild(movie_title);
            
            const movie_rating = document.createElement("span");
            if(movie.vote_average >= 8){
                movie_rating.classList.add("green");
            }else if(movie.vote_average >= 5 && movie.vote_average <= 7.9){
                movie_rating.classList.add("orange");
            }else{
                movie_rating.classList.add("red");
            }
            movie_rating.textContent = movie.vote_average;
            movie_info.appendChild(movie_rating);

            movieElement.appendChild(movie_info);
            
            const overview = document.createElement("div")
            overview.classList.add("overview");

            const overview_title = document.createElement("h3");
            overview_title.textContent = "Summary";
            overview.appendChild(overview_title);
            
            const overview_content = document.createElement("p");
            overview_content.textContent = movie.overview;
            overview.appendChild(overview_content);

            movieElement.appendChild(overview);

            movie_list.appendChild(movieElement);
        })
    }

    search_form.addEventListener("submit" , (e)=> {
        e.preventDefault();

        let search_term = search_box.value;
        if(search_term){
           fetch_movies(SEARCH_URL + `&query=` + search_term);
           
        }
    });
})

