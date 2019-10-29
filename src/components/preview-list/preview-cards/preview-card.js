import React from 'react'
import styled from 'styled-components'

function PreviewCard(props) {

  let types = props.types.map((type, i) => <S.Type key={i} color={type.color}>{type.name}</S.Type>)
  
  return(
  <S.Card
    data-i={props.i}
    key={props.id}
    onClick={props.select}
    >
    <S.Img src={props.img} alt={props.name} />
    <strong>{props.name}</strong>
    <S.TypeContainer>
      {types}
    </S.TypeContainer>
  </S.Card>
  )
}

const S = {}


S.Card = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 140px;
  height: 160px;
  border: solid;
  margin: 2px;
  padding: 0 0px 5px 0px;
  background-color: lightgray;
  :hover {
    background-color: skyblue;
  }
`

S.Img = styled.img`
`

S.Type = styled.div`
  margin: 2px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${props => props.color};
`

S.TypeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`

export default PreviewCard
