// FetchPokemon

import React, { Component } from 'react';
import RenderPokemon from '../RenderPokemon';

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
    this.getIDs();
  }
  getIDs = () => {
    const array = [];
    for (let i = 1; i <= 6; i++) {
      array.push(i);
    };
    const ids = array.slice(0, 6);
    const idsToAdd = ids.concat(ids);
    this.setState({
      id: [...idsToAdd]
    });
  }
  fetchPokemon = () => {
    this.setState({
      data: []
    });
    this.state.id.map((pokemon) => {
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
