import React from 'react';

const Character = ({ character }) => {
  return (
    <div className='character'>
      <img src={character.image} alt={character.name} />
      <p>{character.name}</p>
      <p>{character.status}</p>
    </div>
  );
};

export default Character;
