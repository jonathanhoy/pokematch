import React, { Component } from 'react';
import './components/styles/app.scss';
import FetchPokemon from './components/FetchPokemon';
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
