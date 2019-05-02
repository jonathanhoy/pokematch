// GetPokemonIds

import React, { Component } from 'react';
import FetchPokemon from '../FetchPokemon';
import RenderPokemon from '../RenderPokemon';

class GetPokemonIds extends Component {
  constructor() {
    super();
    this.state = {
      ids: [],
      data: [],
      difficulty: 'easy', // create form to select difficulty
      region: 'kanto',
      regions: {
        kanto: [1, 151],
        johto: [152, 251],
        hoenn: [252, 386],
        sinnoh: [387, 493],
        unova: [494, 649],
        kalos: [650, 721]
      }
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

  getIDs = (start = 1, end = 721) => (e) => {
    e.preventDefault();
    const array = [];
    for (let i = start; i <= end; i++) {
      array.push(i);
    };
    const ids = this.shuffleArray(array).slice(0, 6);
    this.setState({
      ids: [...ids]
    });
  }

  onChange = (e) => {
    this.setState({
      region: e.target.value
    })    
  }

  render() {
    const region = this.state.region;
    const [start, end] = this.state.regions[region];
    return (
      <div className="FetchPokemon">
        <button onClick={this.getIDs()}>Quickplay</button>
        <form action="">
          <select name="region" id="" onChange={this.onChange} value={this.state.region}>
            <option value="kanto" selected>Kanto</option>
            <option value="johto">Johto</option>
            <option value="hoenn">Hoenn</option>
            <option value="sinnoh">Sinnoh</option>
            <option value="unova">Unova</option>
            <option value="kalos">Kalos</option>
          </select>
          <button type="submit" onClick={this.getIDs(start, end)}>Play!</button>
        </form>
        <FetchPokemon ids={this.state.ids} shuffleArray={this.shuffleArray} />

        <button onClick={this.test}>TEST</button>
      </div>
    );
  }
}

export default GetPokemonIds;
