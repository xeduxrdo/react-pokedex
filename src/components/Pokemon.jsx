import '../styles/Pokemon.css';
import { styleByType } from '../constants/pokemon';

function Pokemon({ pokemon, onClick }) {
  return (
    <div
      className='pokemon-card'
      onClick={onClick}>
      <p className='pokemon-id'>
        <span>N.º{pokemon.id.toString().padStart(4, '0')}</span>
      </p>
      <div className='pokemon-img-container'>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className='pokemon-img'
        />
      </div>
      <p className='pokemon-name'>{pokemon.name}</p>
      <div className='pokemon-type-container'>
        {pokemon.types.map((typeInfo) => {
          const type = typeInfo.type.name;
          const style = styleByType[type] || {};

          return (
            <div
              key={type}
              className='pokemon-type'
              style={{ backgroundColor: style }}>
              <span className='pokemon-type-text'>{type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pokemon;
