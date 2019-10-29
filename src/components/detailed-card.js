import React from 'react'
import styled from 'styled-components'

function DetailedCard(props) {

  let id = props.pokemon['id'].toString()
  while (id.length < 3) id = '0' + id
  let title = `${props.pokemon['Name']} #${id}`

  let types = props.pokemon['Type'].map((type, i) => <S.Type key={i} color={type.color}>{type.name}</S.Type>)

  return (
    <S.Card>
      <S.Img src={props.pokemon.img} alt={props.pokemon['Name']} />
      <S.Title>{title}</S.Title>
      <S.Table>
        <S.Caption>Pokemon stats</S.Caption>
        <tbody>
          <tr>
            <S.Td>Type</S.Td>
            <S.Td>{types}</S.Td>
          </tr>
          <tr>
            <S.Td>Attack</S.Td>
            <S.Td>{props.pokemon['Attack']}</S.Td>
          </tr>
          <tr>
            <S.Td>Defense</S.Td>
            <S.Td>{props.pokemon['Defense']}</S.Td>
          </tr>
          <tr>
            <S.Td>HP</S.Td>
            <S.Td>{props.pokemon['HP']}</S.Td>
          </tr>
          <tr>
            <S.Td><S.NoWrap>SP Attack</S.NoWrap></S.Td>
            <S.Td>{props.pokemon['SP Attack']}</S.Td>
          </tr>
          <tr>
            <S.Td><S.NoWrap>SP Defense</S.NoWrap></S.Td>
            <S.Td>{props.pokemon['SP Defense']}</S.Td>
          </tr>
          <tr>
            <S.Td>Speed</S.Td>
            <S.Td>{props.pokemon['Speed']}</S.Td>
          </tr>
          <tr>
            <S.Td>Weight</S.Td>
            <S.Td>{props.pokemon['Weight']}</S.Td>
          </tr>
          <tr>
            <S.Td><S.NoWrap>Total moves</S.NoWrap></S.Td>
            <S.Td>{props.pokemon['Total moves']}</S.Td>
          </tr>
        </tbody>
      </S.Table>
    </S.Card>
  )
}

const S = {}

S.Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 610px;
  width: 200px;
  padding: 0 10px 10px 10px;
  border: solid;
  background-color: lightgrey;
`

S.Img = styled.img`
  width: 200px; 
  height: 200px;
`

S.Title = styled.h2`
  text-align: center;
  margin: 5px;
`

S.Table = styled.table`
  border-collapse: collapse;
  text-align: center;
`

S.Caption = styled.caption`
  caption-side: bottom;
`

S.Td = styled.td`
  border: solid;
  padding: 5px 10px;
`

S.Type = styled.div`
  margin: 2px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${props => props.color};
`

S.NoWrap = styled.div`
  white-space: nowrap;
`

export default DetailedCard
