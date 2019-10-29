import React from 'react'
import styled from 'styled-components'

import PreviewCards from './preview-list/preview-cards'

function PreviewList(props) {
  
  // Hide 'Load More' if all loaded
  if (props.showLoad) {
    return(
      <React.Fragment>
        <S.CardsContainer>
          <PreviewCards select={props.select} pokemons={props.pokemons}/>
        </S.CardsContainer>
        <S.LoadButton onClick={props.loadMore}>
          <strong>Load More</strong>
        </S.LoadButton>
      </React.Fragment>
    )
  } else {
    return(
      <React.Fragment>
      <S.CardsContainer>
        <PreviewCards select={props.select} pokemons={props.pokemons}/>
      </S.CardsContainer>
    </React.Fragment>
    )
  }
}

const S = {}

S.FilterContainer = styled.button`
  flex: 1;
  width: 100%;
  color: white;
  text-decoration: none;
  border: none;
  background-color: dodgerblue;
  :hover {
    background-color: skyblue;
  }
`

S.CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 14;
  justify-content: center;
  align-content: flex-start;
  overflow: auto;
`

S.LoadButton = styled.button`
  flex: 1;
  width: 100%;
  color: white;
  text-decoration: none;
  border: none;
  background-color: dodgerblue;
  :hover {
    background-color: skyblue;
  }
`


export default PreviewList
