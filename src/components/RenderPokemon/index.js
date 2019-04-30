// RenderPokemon

import React, { Component } from 'react';
import MatchLogic from '../MatchLogic';
import Axios from 'axios';

class RenderPokemon extends Component {
  constructor() {
    super();
    this.state = {
      pair: [],
      ids: [],
      data: {}
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dataToRender !== this.props.dataToRender && this.props.dataToRender.length === 12) {
      const arr = []
      this.props.dataToRender.forEach((pokemon) => {
        arr.push(pokemon[0])
      })
      console.log(arr);
      
    }
  }

  // flipCard = (e) => {
  //   if (!e.target.classList.contains('card__front--flip')) {
  //     e.target.classList.add('card__front--flip');
  //     e.target.nextElementSibling.classList.add('card__back--flip');
  //   };
  //   const pokemon = e.target.id;
  //   console.log(pokemon);
  // }

  render() {
    return (
      Object.entries(this.props.dataToRender).map((pokemon) => {
        const name = pokemon[1][0];
        const sprite = pokemon[1][1];
        const id = pokemon[1][2];
        return (
          <div>
            <p>{name}</p>
            <p>{id}</p>
            <img src={sprite} alt=""/>
          </div>
        )
      })
    )
  }
}

export default RenderPokemon;