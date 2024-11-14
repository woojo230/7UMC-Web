import { useState } from 'react';
import MovieCard from '../../components/movies/MovieCard';
import SkeletonCard from '../../components/movies/SkeletonCard';
import Pagination from '../../components/common/Pagination';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const TopRatedContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;
  overflow-y: auto;
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const fetchTopRatedMovies = async (page = 1) => {
  const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  return response.json();
};

const TopRated = () => {
  const [page, setPage] = useState(1);

  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['topRatedMovies', page],
    queryFn: () => fetchTopRatedMovies(page),
    keepPreviousData: true,
  });

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  if (isLoading) {
    return (
      <TopRatedContainer>
        <MoviesContainer>
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </MoviesContainer>
      </TopRatedContainer>
    );
  }

  if (error) {
    return <TopRatedContainer>{error.message}</TopRatedContainer>;
  }

  if (!movies || movies.results.length === 0) {
    return <TopRatedContainer>영화 데이터가 없습니다.</TopRatedContainer>;
  }

  return (
    <TopRatedContainer>
      <MoviesContainer>
        {movies.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MoviesContainer>
      <Pagination
        page={page}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        hasNextPage={!!movies.total_pages && page < movies.total_pages}
      />
    </TopRatedContainer>
  );
};

export default TopRated;