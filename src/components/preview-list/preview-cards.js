import React from 'react'

import PreviewCard from './preview-cards/preview-card'

function PreviewCards(props) {

  let cards = props.pokemons.map((pokemon, i) => (
    <PreviewCard 
      i={i} 
      key={pokemon.id}
      id={pokemon.id} 
      select={props.select} 
      types={pokemon['Type']}
      img={pokemon.img}
      name={pokemon['Name']}
    />
  ))
  
  return cards
}

export default PreviewCards
