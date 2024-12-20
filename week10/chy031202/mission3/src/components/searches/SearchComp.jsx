import styled from "styled-components";
import useCustomFetch from "../../hooks/useQuery";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieItem from "../movie-item";
import { useEffect , useCallback} from "react";
import Sckeleton from "../skeletons/sckeletonCard";
import _ from "lodash";
import SckeletonWrapper from "../skeletons/sckeletonWrapper";

const SearchComp = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [search, setSearch] = useState(false);
    const {data:movies, isLoading, isError} = useCustomFetch(`/search/movie?query=${searchQuery}&include_adult=false&language=ko-KR&page=1`);


    const handleSearch = () => {
        if (mq === searchQuery) return;
        setSearch(true);
        navigate(`/search?mq=${searchQuery}`)
    }

    const handleSearchMovieEnter = (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        setSearch(false);
    }
    const debounceQuery = useCallback(
        _.debounce((query) => setDebouncedQuery(query), 500),
        []
    );

    useEffect(() => {
        debounceQuery(searchQuery);
    }, [searchQuery, debounceQuery]);

    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    });
    
    
    const mq = searchParams.get('mq')
    console.log(mq, 'mq');
     // movies 데이터 변경 시 콘솔에 출력
    useEffect(() => {
        console.log("Movies data:", movies);
    }, [movies]);
    
    return (
        <>
        <Search>
        <Input placeholder='영화 제목을 입력해주세요.' 
        type={'text'} 
        value = {searchQuery}
        onChange={handleChange}
        />
        <Button onClick={handleSearch}>검색</Button>
        </Search>
        <br></br>
        
        
        {isLoading ? (
                

                <SckeletonWrapper/>
                // <SkeletonWrapper1>
                //     {Array.from({ length: 20 }).map((_, index) => (
                //         <Sckeleton key={index} />
                //     ))}
                // </SkeletonWrapper1>
            ) : (search && !isError && (
                movies?.data?.results?.length > 0 ? (
                    <MovieLi className="movieLi">
                        {movies.data.results.map((movie) => (
                            <MovieItem key={movie.id} movie={movie} />
                        ))}
                    </MovieLi>
                ) : (
                    <h1 style={{ color: 'white' }}>
                        해당하는 검색어 '{searchQuery}'에 해당하는 <br /> 데이터가 없습니다.
                    </h1>
                )
            )
            )}
        </>
    )

    
}

const Search = styled.div`
display:flex;
width:100%;

justify-content:center;
flex-direction:row;
align-items:center;
`

const Input = styled.input`
height: 3.7em;
width:60%;
left: 203px;
top: 96px;
background: #FFFFFF;
border-radius: 10px 0px 0px 10px;
border:none;

`

const Button = styled.button `
/* searchButtonBackground */

max-width: 90px;
width:15%;
height: 52px;
left: 1805px;
top: 96px;

background: #FF073D;
color:white;
border-radius: 0px 10px 10px 0px;
border:none;

`

const MovieLi = styled.ul `
list-style: none;
overflow-y: auto; /* 수직 스크롤 활성화 */
`

const SkeletonWrapper1 = styled.div`
    
    overflow-y: auto;
    gap: 10px;
`;
export default SearchComp