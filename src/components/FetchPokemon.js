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
  getIDs = () => {
    const arr = [];
    for (let i = 1; i <= 10; i++) { // based on difficulty the values for i can change.
      arr.push(i);
    };
    // Credit for shuffle array function: https://github.com/Daplie/knuth-shuffle
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    const array = shuffle(arr).slice(0, 6);
    console.log(array);
    this.setState({
      id: [...array]
    });
  }
  fetchPokemon = () => {
    // If user clicks on button again, will fetch 6 new pokemon
    if (this.state.id.length === 6) {
      this.getIDs();
    }
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
    })
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
