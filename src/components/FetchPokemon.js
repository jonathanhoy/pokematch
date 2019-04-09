import React, { Component } from 'react';
import RenderPokemon from './RenderPokemon';

class FetchPokemon extends Component {
  constructor() {
    super();
    this.state = {
      id: [],
      data: [],
      difficulty: 'easy' // create form to select difficulty
    }
  }
  componentDidMount() {
    this.getIDs()
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
    const idsToAdd = ids.concat(ids);
    this.setState({
      id: [...idsToAdd]
    });
  }
  fetchPokemon = () => {
    // If user clicks on button again, will fetch 6 new pokemon
    if (this.state.id.length > 0) {
        this.getIDs();
      };
    this.setState({
      data: []
    });
    this.state.id.forEach((pokemon) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            data: [...this.state.data, data]
          });
        });
      });
  }
  render() {
    return (
      <div className="FetchPokemon">
        <button onClick={this.fetchPokemon}>click me</button>
        <RenderPokemon data={this.state.data} />
      </div>
    );
  }
}

export default FetchPokemon;
