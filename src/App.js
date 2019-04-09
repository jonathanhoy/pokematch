import React, { Component } from 'react';
import './App.css';
import FetchPokemon from './FetchPokemon';
// import RenderPokemon from './RenderPokemon';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FetchPokemon />
      </div>
    );
  }
}

export default App;
