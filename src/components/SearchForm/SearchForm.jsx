import { useSearchParams } from 'react-router-dom';
import * as API from '../../utils/api/apiMoviedb';
import { useEffect, useState } from 'react';
import { TrendingList } from 'components/TrendingList/TrendingList';
import css from './SearchForm.module.css';

export const SearchForm = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = e => {
    setSearchParams({ query: e.target[0].value });
    e.preventDefault();
    return;
  };

  useEffect(() => {
    const movieTitle = searchParams.get('query');
    if (movieTitle) {
      API.searchMovies(movieTitle).then(ret => setMovies(ret));
    }
  }, [searchParams]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" className={css.formName} placeholder="Search..."></input>
        <button type="submit" className={css.btnName}>Search</button>
      </form>
      <TrendingList movies={movies} />
    </div>
  );
};