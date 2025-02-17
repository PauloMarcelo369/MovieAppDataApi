const express = require("express");
const app = express();
const cors = require("cors");
const filmList = require("./moviesList");

app.use(cors());

app.get("/movies", (req, res) => {
  res.json(filmList);
});

app.get("/movies/search", (req, res) => {
  const { query } = req.query;

 
  const results = filmList.filter((movie) => {
    return movie.title.toLowerCase().includes(query.toLowerCase());
  });

  res.json(results);
});

app.get("/movies/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const movie = filmList.find((movie) => {
    return movie.title.toLowerCase() === name;
  });

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie Not Found" });
  }
});

app.get("movies/relatedMovies", (req, res) => {
  const { query } = req.query;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ message: "Search query cannot be empty" });
  }

  const selectedGenres = query.split(",").map((genre) => genre.trim());

  const related_movies = filmList.filter((movie) => {
    movieGenres = movie.genre.split(",").map((filme) => filme.trim());
    return selectedGenres.every((item) => movieGenres.includes(item));
  });

  res.json(related_movies);
});

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta: ${3000}`);
});
