import React, { Component } from 'react';
import './components/styles/app.scss';
import GetPokemonIds from './components/GetPokemonIds';
// import RenderPokemon from './RenderPokemon';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Gotta Match 'Em All!</h1>
        <GetPokemonIds />
      </div>
    );
  }
}

export default App;
