// GetPokemonIds

import React, { Component } from 'react';
import FetchPokemon from '../FetchPokemon';
import RenderPokemon from '../RenderPokemon';
import Axios from 'axios';

class GetPokemonIds extends Component {
  constructor() {
    super();
    this.state = {
      ids: [],
      data: [],
      difficulty: 'easy' // create form to select difficulty
    }
  }

  // Credit for shuffle array function: https://github.com/Daplie/knuth-shuffle
  shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  getIDs = () => {
    const array = [];
    for (let i = 1; i <= 721; i++) {
      array.push(i);
    };
    const ids = this.shuffleArray(array).slice(0, 6);
    this.setState({
      ids: [...ids]
    });
  }
  
  render() {
    return (
      <div className="FetchPokemon">
        <button onClick={this.getIDs}>get IDs</button>
        <FetchPokemon ids={this.state.ids} shuffleArray={this.shuffleArray} />
      </div>
    );
  }
}

export default GetPokemonIds;
