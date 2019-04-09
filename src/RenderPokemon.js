import React, { Component } from 'react';

class RenderPokemon extends Component {
  render() {
    const { data } = this.props
    if (data) {
      return (
        <ul>
          {data.map((pokemon) => {
            return (
              <li key={pokemon.id}>
                <p>{pokemon.name}</p>
                <img src={pokemon.sprites.front_default} alt=""/>
              </li>
            )
          })}
        </ul>
      )
    } else {
      return null;
    }
  }
}

export default RenderPokemon;