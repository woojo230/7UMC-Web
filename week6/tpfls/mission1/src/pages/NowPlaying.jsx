// pages/NowPlaying.js
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieList from '../components/list/MovieList';
import { fetchMovies } from '../api'; // API 호출 함수

const NowPlaying = () => {
    const { data: movies, isLoading, isError } = useQuery(['nowPlaying'], () => fetchMovies('nowplaying'));

    if (isLoading) return <div>로딩 중...</div>;
    if (isError) return <div>Error: 데이터 로딩 중 문제가 발생했습니다.</div>;

    return <MovieList title="현재 상영중 영화" movies={movies} />;
};

export default NowPlaying;
