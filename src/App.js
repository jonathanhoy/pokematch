import React, { Component } from 'react';
import './components/styles/app.scss';
import GetPokemonIds from './components/GetPokemonIds';

class App extends Component {
  render() {
    return (
      <main className="App">
        <GetPokemonIds />
      </main>
    );
  }
}

export default App;
