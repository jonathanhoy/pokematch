// GetPokemonIds

import React, { Component } from 'react';
import FetchPokemon from '../FetchPokemon';

class GetPokemonIds extends Component {
  constructor() {
    super();
    this.state = {
      ids: [],
      data: [],
      difficulty: 6,
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
    const ids = this.shuffleArray(array).slice(0, this.state.difficulty);
    this.setState({
      ids: [...ids]
    });
  }

  onChange = (e) => {
    this.setState({
      region: e.target.value
    })    
  }

  handleClick = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render() {
    const region = this.state.region;
    const [start, end] = this.state.regions[region];
    return (
      <React.Fragment>
        <section className="getPokemonIds">
          <div>
            <button onClick={this.getIDs()}>Quickplay</button>
          </div>
          <form action="" className="fetch-form">
            <div className="fetch-form__radio-group">
              <input
                type="radio"
                name="difficulty"
                className="fetch-form__input"
                onClick={this.handleClick}
                value="6"
                id="easy" />
              <label
                htmlFor="easy"
                className="fetch-form__label"
                tabIndex="0">
                Easy
              </label>

              <input
                type="radio"
                name="difficulty"
                className="fetch-form__input"
                onClick={this.handleClick}
                value="8"
                id="medium" />
              <label
                htmlFor="medium"
                className="fetch-form__label"
                tabIndex="0">
                Medium
              </label>

              <input
                type="radio"
                name="difficulty"
                className="fetch-form__input"
                onClick={this.handleClick}
                value="10"
                id="hard" />
              <label
                htmlFor="hard"
                className="fetch-form__label"
                tabIndex="0">
                Hard
              </label>
            </div>

            <div className="fetch-form__radio-group">
              <input
                type="radio"
                name="region"
                className="fetch-form__input"
                onClick={this.handleClick}
                value="kanto"
                id="kanto" />
              <label
                htmlFor="kanto"
                className="fetch-form__label"
                tabIndex="0">
                Kanto
              </label>
  
              <input
                type="radio"
                name="region"
                className="fetch-form__input"
                onClick={this.handleClick}
                value="johto"
                id="johto" />
              <label
                htmlFor="johto"
                className="fetch-form__label"
                tabIndex="0">
                Johto
              </label>
  
              <input
                type="radio"
                name="region"
                className="fetch-form__input"
                onClick={this.handleClick}
                value="hoenn"
                id="hoenn" />
              <label
                htmlFor="hoenn"
                className="fetch-form__label"
                tabIndex="0">
                Hoenn
              </label>
  
              <input
                type="radio"
                name="region"
                className="fetch-form__input"
                onClick={this.handleClick}
                value="sinnoh"
                id="sinnoh" />
              <label
                htmlFor="sinnoh"
                className="fetch-form__label"
                tabIndex="0">
                Sinnoh
              </label>
  
              <input
                type="radio"
                name="region"
                className="fetch-form__input"
                onClick={this.handleClick}
                value="unova"
                id="unova" />
              <label
                htmlFor="unova"
                className="fetch-form__label"
                tabIndex="0">
                Unova
              </label>
  
              <input
                type="radio"
                name="region"
                className="fetch-form__input"
                onClick={this.handleClick}
                value="kalos"
                id="kalos" />
              <label
                htmlFor="kalos"
                className="fetch-form__label"
                tabIndex="0">
                Kalos
              </label>
            </div>
            <button type="submit" onClick={this.getIDs(start, end)}>Play!</button>
          </form>
        </section>
        <FetchPokemon ids={this.state.ids} shuffleArray={this.shuffleArray} difficulty={this.state.difficulty}/>
      </React.Fragment>
    );
  }
}

export default GetPokemonIds;
