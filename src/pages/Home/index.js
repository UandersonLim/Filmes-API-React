import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Movie, MovieList, ButtonImput } from './styles';

function Home() {

  const imagePath = 'https://image.tmdb.org/t/p/w500/'

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MINHA_CHAVE}&language=pt-BR`)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results)
      })
  }, [])

  const handleSearch = async () => {
    if (search) {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${process.env.REACT_APP_MINHA_CHAVE}`);
      const data = await response.json();
      setMovies(data.results)
    }else{
      alert('Digite um Nome de Filme Valído')
    }
  }

  return (
    <Container>
      <ButtonImput>
        <button onClick={handleSearch}>Buscar</button>
        <input type="text" placeholder="Filmes" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
      </ButtonImput>
      <h1>Movies</h1>
      <MovieList>
        {movies.map(movie => {
          return (
            <Movie key={movie.id}>
              <Link to={`/details/${movie.id}`}>
                <img src={`${imagePath}${movie.poster_path}`} alt={movie.title} />
              </Link>
              <span>{movie.title}</span>
            </Movie>
          )
        })}
      </MovieList>
    </Container>
  );
}

export default Home;