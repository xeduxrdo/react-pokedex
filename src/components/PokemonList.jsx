import { useState, useEffect, useRef } from 'react';
import Pokemon from './Pokemon';
import Loading from './Loading';
import PokemonDetails from './PokemonDetails';
import '../styles/PokemonList.css';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonName, setPokemonName] = useState('');
  const [debouncedPokemonName, setDebouncedPokemonName] = useState('');
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // Nuevo estado para evitar cargas múltiples
  const [hasScrolled, setHasScrolled] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const sentinelRef = useRef(null);

  // Obtener datos de Pokémon con un retraso en la actualización de la lista
  useEffect(() => {
    async function fetchData() {
      if (isFetching) return; // 🔒 Evita cargar más Pokémon si ya está cargando
      setLoading(true);
      setIsFetching(true); // 🚧 Bloquea nuevas cargas hasta que termine la actual
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        );
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return await response.json();
          })
        );
        console.log(pokemonDetails);
        // Agregar un retraso antes de actualizar el estado de pokemonList
        setTimeout(() => {
          setPokemonList(pokemonDetails);
          setLoading(false);
          setIsFetching(false); // ✅ Desbloquea cargas después de completar
        }, 1000); // ⏳ Mantiene el loading por 1 segundo extra
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setIsFetching(false);
      }
    }
    fetchData();
  }, [limit]);

  // Configurar debounce para la búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPokemonName(pokemonName);
    }, 600);

    return () => {
      clearTimeout(handler);
    };
  }, [pokemonName]);

  // Filtrar Pokémon según el nombre
  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(debouncedPokemonName.toLowerCase())
  );

  // Detectar interacción de scroll
  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(true);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Configurar Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasScrolled && !loading) {
          setLimit((prevLimit) => prevLimit + 10);
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [hasScrolled, loading]);

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
    setShowModal(false);
  };

  return (
    <>
      <form className='search-bar'>
        <input
          type='text'
          placeholder='Search your Pokemon'
          className='input'
          name='pokemonName'
          autoComplete='off'
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
      </form>
      <div className='pokemon-list'>
        {filteredPokemonList.map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => openModal(pokemon)}
          />
        ))}
      </div>
      {loading && <Loading />}{' '}
      {/* ⏳ Mantendrá el efecto de carga por más tiempo */}
      <div
        ref={sentinelRef}
        style={{ height: '1px' }}
      />
      {showModal && (
        <PokemonDetails
          pokemon={selectedPokemon}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default PokemonList;
