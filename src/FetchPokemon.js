import React, { Component } from 'react';
import RenderPokemon from './RenderPokemon';

class FetchPokemon extends Component {
  constructor() {
    super();
    this.state = {
      id: [],
      data: []
    }
  }
  componentDidMount() {
    this.getIDs()
  }
  getIDs = () => {
    const arr = [];
    for (let i = 1; i <= 6; i++) {
      // Randomly get pokemon IDs up to gen 6. Gen 7 pokemon not guaranteed to have sprites in API.
      let id = Math.floor(Math.random() * 721) + 1;
      arr.push(id);
    };
    this.setState({
      id: [...arr]
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
