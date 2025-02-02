import { useEffect, useState } from "react";
import { MovieType } from "../types";
import { Requests } from "../api";

export const MovieList = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [favClass, setFavClass] = useState<string[]>([]);

  const handleFavoriteClick = (index: number) => {
    const newFavClass = [...favClass];
    newFavClass[index] =
      newFavClass[index] === "not-fav" ? "is-fav" : "not-fav";
    setFavClass(newFavClass);
  };

  const fetchAndSetMovies = () => {
    return Requests.fetchAllMovies().then((res) => {
      // console.log("res", res);
      setMovies(res);
      setFavClass(new Array(res.length).fill("not-fav"));
    });
  };

  useEffect(() => {
    fetchAndSetMovies();
  }, []);
  console.log(movies);

  return (
    <>
      <div className="card-container">
        {movies.map((movie, index) => (
          <div
            className="movie-card"
            key={index}
          >
            <h1>{movie.title}</h1>
            <button
              className="button"
              onClick={() => handleFavoriteClick(index)}
            >
              Favorite
            </button>
            <div className={`fav ${favClass[index]}`}>
              {favClass[index] === "is-fav" ? "👍🏻" : "🚫"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
