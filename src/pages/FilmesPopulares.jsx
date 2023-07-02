import { useEffect, useState } from 'react';
import axios from 'axios';

const FilmesPopulares = () => {
  const [dadosFilmes, setDadosFilmes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    const buscarFilmes = async () => {
      try {
        setCarregando(true);
        const { data } = await axios.get(`https://imdb-api.com/en/API/MostPopularMovies/k_rp56enp1`);
        setDadosFilmes(data.items);
        setTotalPaginas(Math.ceil(data.items.length / 16));
      } catch (error) {
        console.log(error);
      } finally {
        setCarregando(false);
      }
    };

    buscarFilmes();
  }, []);

  const renderizarFilmes = () => {
    if (carregando || !dadosFilmes?.length) {
      return <h1>Carregando...</h1>;
    }

    const indiceInicio = (paginaAtual - 1) * 16;
    const indiceFim = indiceInicio + 16;
    const filmesAtuais = dadosFilmes.slice(indiceInicio, indiceFim);

    return (
      <div className="lista-filmes">
        {filmesAtuais?.map(filme => (
          <div className="filme" key={filme.id}>
            <img src={filme.image} alt={filme.title} className="imagem-filme" />
            <h4 className="titulo-filme">{filme.title}</h4>
            <div className="informacoes-filme">
              <p className="classificacao">Classificação: {filme.rank}</p>
              <p className="ano">Ano: {filme.year}</p>
              <p className="equipe">Equipe: {filme.crew}</p>
              <p className="avaliacao">Avaliação: {filme.imDbRating}</p>
              <p className="total-avaliacoes">Total de Avaliações: {filme.imDbRatingCount}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const alterarPagina = pagina => {
    setPaginaAtual(pagina);
  };

  const renderizarBotoesPaginacao = () => {
    const botoes = [];

    for (let i = 1; i <= totalPaginas; i++) {
      botoes.push(
        <button
          key={i}
          className={`botao-paginacao ${paginaAtual === i ? 'ativo' : ''}`}
          onClick={() => alterarPagina(i)}
        >
          {i}
        </button>
      );
    }

    return botoes;
  };

  return (
    <div className="top-filmes">
      <h2 className="titulo">Filmes Populares</h2>

      <p className="descricao">Os filmes mais populares de acordo com a votação regular do IMDb.</p>
      {renderizarFilmes()}
      <div className="paginacao">
        <button
          className="botao-paginacao"
          disabled={paginaAtual === 1}
          onClick={() => alterarPagina(paginaAtual - 1)}
        >
          Anterior
        </button>
        {renderizarBotoesPaginacao()}
        <button
          className="botao-paginacao"
          disabled={paginaAtual === totalPaginas}
          onClick={() => alterarPagina(paginaAtual + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default FilmesPopulares;
