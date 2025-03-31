import '../styles/PokemonDetails.css';
import { styleByType } from '../constants/pokemon';
import { PiCirclesThreePlusFill } from 'react-icons/pi';
import { TbArrowAutofitHeight } from 'react-icons/tb';
import { RiWeightFill } from 'react-icons/ri';

// import {
//   FaHeartbeat,
//   FaFistRaised,
//   FaShieldAlt,
//   FaMagic,
//   FaShieldVirus,
//   FaBolt,
// } from 'react-icons/fa';

// const statIcons = {
//   hp: <FaHeartbeat />,
//   attack: <FaFistRaised />,
//   defense: <FaShieldAlt />,
//   'special-attack': <FaMagic />,
//   'special-defense': <FaShieldVirus />,
//   speed: <FaBolt />,
// };

import {
  GiHearts,
  GiBroadsword,
  GiShiningSword,
  GiShield,
  GiVibratingShield,
  GiSpeedometer,
} from 'react-icons/gi';

const statIcons = {
  hp: <GiHearts className='icon' />,
  attack: <GiBroadsword className='icon' />,
  defense: <GiShield className='icon' />,
  'special-attack': <GiShiningSword className='icon' />,
  'special-defense': <GiVibratingShield className='icon' />,
  speed: <GiSpeedometer className='icon' />,
};

function PokemonDetails({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div
      className='modal-overlay'
      onClick={onClose}>
      <div
        className='modal-content'
        onClick={(e) => e.stopPropagation()}>
        <button
          className='close-button'
          onClick={onClose}>
          ✖
        </button>
        <div className='pokemon-card-modal'>
          <p className='pokemon-id-modal'>
            <span>N.º{pokemon.id.toString().padStart(4, '0')}</span>
          </p>
          <div className='pokemon-img-container-modal'>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className='pokemon-img-modal'
            />
          </div>
          <p className='pokemon-name-modal'>{pokemon.name}</p>
          <div className='pokemon-type-container-modal'>
            {pokemon.types.map((typeInfo) => {
              const type = typeInfo.type.name;
              const style = styleByType[type] || {};

              return (
                <div
                  key={type}
                  className='pokemon-type-modal'
                  style={{ backgroundColor: style }}>
                  <span className='pokemon-type-text-modal'>{type}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className='pokemon-details-modal'>
          <div className='characteristics-section-container'>
            <p className='pokemon-section-title'>Characteristics</p>
            <div className='characteristics-container'>
              <div
                className='pokemon-details-characteristics'
                title='HEIGHT'>
                <TbArrowAutofitHeight className='icon' />
                <p>{pokemon.height}</p>
              </div>
              <div
                className='pokemon-details-characteristics'
                title='WEIGHT'>
                <RiWeightFill className='icon' />
                <p>{pokemon.weight}</p>
              </div>
            </div>
          </div>

          <div className='abilities-section-container'>
            <p className='pokemon-section-title'>Abilities</p>
            <div className='abilities-container'>
              <div
                className='pokemon-details-abilities'
                title='ABILITIES'>
                {pokemon.abilities.map((abilityInfo) => (
                  <div
                    key={abilityInfo.ability.name}
                    className='pokemon-ability'>
                    <PiCirclesThreePlusFill className='icon' />
                    <p>{abilityInfo.ability.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Codigo aqui */}

          <div className='stats-container'>
            <p className='pokemon-section-title'>Stats</p>
            <div className='pokemon-details-stats'>
              {pokemon.stats.map((statInfo) => (
                <div
                  key={statInfo.stat.name}
                  className='pokemon-stat'
                  title={statInfo.stat.name.toUpperCase()}>
                  {statIcons[statInfo.stat.name] || '❓'}
                  <progress
                    className='stat-progress'
                    value={statInfo.base_stat}
                    max='100' // Ajusta según el máximo de stats
                  ></progress>
                  <span className='stat-value'>{statInfo.base_stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
