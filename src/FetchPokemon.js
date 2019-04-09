import React, { Component } from 'react';
import RenderPokemon from './RenderPokemon';

class FetchPokemon extends Component {
  constructor() {
    super();
    this.state = {
      ids: [150, 435, 275, 638, 523, 421],
      data: []
    }
  }
  fetchPokemon = () => {
    this.setState({
      data: []
    });
    this.state.ids.forEach((pokemon) => {
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
