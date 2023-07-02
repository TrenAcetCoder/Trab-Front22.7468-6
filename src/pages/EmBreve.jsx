import { useEffect, useState } from 'react';
import axios from 'axios';

const EmBreve = () => {
  const [carregando, setCarregando] = useState(false);
  const [dadosEmBreve, setDadosEmBreve] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 16;

  useEffect(() => {
    const buscarDados = async () => {
      try {
        setCarregando(true);
        const { data } = await axios.get(`https://imdb-api.com/en/API/ComingSoon/k_rp56enp1`);
        setDadosEmBreve(data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const itensAtuais = dadosEmBreve.slice(indicePrimeiroItem, indiceUltimoItem);

  const renderizarEmBreve = () => {
    if (carregando || !itensAtuais?.length) {
      return <h1>Carregando...</h1>;
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem' }}>
        {itensAtuais?.map((dadosTv) => (
          <div key={dadosTv.id} style={{ padding: '1rem', width: '100%', md: '50%', lg: '25%' }}>
            <div style={{ background: 'white', boxShadow: 'md', padding: '1rem', borderRadius: 'md' }}>
              <img src={dadosTv.image} alt={dadosTv.title} style={{ width: '100%' }} />
              <h2 style={{ marginTop: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {dadosTv.title}
              </h2>
              <p style={{ fontSize: '0.875rem' }}>
                <span style={{ marginRight: '0.5rem' }}>
                  Classificação: {dadosTv.rank}
                </span>
                Ano: {dadosTv.year}
              </p>
              <p style={{ fontSize: '0.875rem' }}>Equipe: {dadosTv.crew}</p>
              <p style={{ fontSize: '0.875rem' }}>Avaliação IMDb: {dadosTv.imDbRating}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const totalPages = Math.ceil(dadosEmBreve.length / itensPorPagina);

  const handlePageChange = (pageNumber) => {
    setPaginaAtual(pageNumber);
  };

  const renderizacaoPaginacao = () => {
    if (dadosEmBreve.length <= itensPorPagina) {
      return null;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem', alignItems: 'center', justifyContent: 'center' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <div
            key={index}
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              background: paginaAtual === index + 1 ? 'purple' : 'gray',
              color: paginaAtual === index + 1 ? 'white' : 'gray',
              fontWeight: paginaAtual === index + 1 ? 'bold' : 'normal',
              cursor: 'pointer',
              margin: '0.25rem',
            }}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Mais Populares na TV
      </h1>
      {renderizarEmBreve()}
      {renderizacaoPaginacao()}
    </div>
  );
};

export default EmBreve;