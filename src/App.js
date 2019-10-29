import React, { Component } from 'react'
import styled from 'styled-components'

import PreviewList from './components/preview-list'
import DetailedCard from './components/detailed-card'

// Pokemons limit for each load
const LIMIT = 12
// Max-width media quary for small resolution
const MEDIA_WIDTH = 450
const TYPE_COLORS = {
  'normal': '#A8A878',
  'fire': '#F08030',
  'water': '#6890F0',
  'electric': '#F8D030',
  'grass': '#78C850',
  'ice': '#98D8D8',
  'ground': '#E0C068',
  'flying': '#A890F0',
  'ghost': '#705898',
  'rock': '#B8A038',
  'fighting': '#C03028',
  'poison': '#A040A0',
  'psychic': '#F85888',
  'bug': '#A8B820',
  'dark': '#705848',
  'steel': '#B8B8D0',
  'dragon': '#7038F8',
  'fairy': '#EE99AC',
  '?': 'grey'
}

export class App extends Component {

  state = {
    url: 'https://pokeapi.co/api/v2/pokemon?limit=' + LIMIT,
    pokemons: [],
    selected: false
  }

  componentDidMount() {
    this.fetchPokemons()
  }

  fetchPokemons = () => {
    fetch(this.state.url)
    .then(res => res.json())
    .then(pokemonList => {
      let pokemons = []
      // Promises are used for less re-renders
      let promises = []
      pokemonList.results.forEach(pokemon => {
        promises.push(
          fetch(pokemon.url)
          .then(res => res.json())
          .then(pokemon => { 
            pokemons = [...pokemons, {
              id: pokemon.id,
              img: pokemon.sprites.front_default,
              Name: this.capitalize(pokemon.name),
              Type: pokemon.types.map(v => ({name: this.capitalize(v.type.name), color: TYPE_COLORS[v.type.name] ? TYPE_COLORS[v.type.name] : TYPE_COLORS['?']})),
              Defense: pokemon.stats[3].base_stat,
              Attack: pokemon.stats[4].base_stat,
              HP: pokemon.stats[5].base_stat,
              'SP Attack': pokemon.stats[2].base_stat,
              'SP Defense': pokemon.stats[1].base_stat,
              Speed: pokemon.stats[0].base_stat,
              Weight: pokemon.weight,
              'Total moves': pokemon.moves.length
            }]
          })
          .catch(err => console.log('Error: ', err))
        )
      })
      Promise.all(promises)
      .then(() => {
        pokemons.sort((a, b) => a.id - b.id)
        this.setState({
          url: pokemonList.next,
          pokemons: [...this.state.pokemons, ...pokemons],
        })
      })
      .catch(err => console.log('Error: ', err))
    })
    .catch(err => console.log('Error: ', err))
  }

  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  selectPokemon = (e) => {
    this.setState({
      selected: this.state.pokemons[e.currentTarget.dataset.i]
    })
  }

  // For small resolution
  deselect = (e) => {
    if (e.currentTarget.offsetWidth > MEDIA_WIDTH) return
    this.setState({selected: false})
  }

  render() {
    if(this.state.selected) {
      return (
        <S.Container onClick={this.deselect}>
          <S.Title>Pokedex</S.Title>
          <S.CardContaiter>
            <S.PreviewListContainer>
              <PreviewList types={TYPE_COLORS} select={this.selectPokemon} pokemons={this.state.pokemons} loadMore={this.fetchPokemons} showLoad={this.state.url}/>
            </S.PreviewListContainer >
            <S.DetailedCardContainer width={MEDIA_WIDTH}>
             <DetailedCard deselect={this.deselect} pokemon={this.state.selected} />
            </S.DetailedCardContainer>
          </S.CardContaiter>
        </S.Container>
      )
    } else {
      return (
        <S.Container>
          <S.Title>Pokedex</S.Title>
          <S.CardContaiter>
            <S.PreviewListContainer>
              <PreviewList select={this.selectPokemon} pokemons={this.state.pokemons} loadMore={this.fetchPokemons} showLoad={this.state.url}/>
            </S.PreviewListContainer >
          </S.CardContaiter>
        </S.Container>
      )
    }
  }
}

const S = {}

S.Container = styled.div `
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  font-family: sans-serif;
  font-size: 14px;
  padding: 10px;
  height: 100vh;
  background-color: grey;
`

S.Title = styled.h1`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`

S.CardContaiter = styled.div`
  flex: 9;
  overflow: hidden;
  display: flex;
`

S.PreviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: flex-start;
  overflow: auto;
`

S.DetailedCardContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  overflow-y: auto;
  min-width: 250px;
  @media (max-width: ${props => props.width}px) {
    position: absolute;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.8);
  }
`

export default App