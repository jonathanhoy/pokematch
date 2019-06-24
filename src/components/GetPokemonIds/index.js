import React, { Component } from 'react';
import FetchPokemon from '../FetchPokemon';
import Swal from 'sweetalert2';

class GetPokemonIds extends Component {
  constructor() {
    super();
    this.state = {
      ids: [],
      data: [],
      difficulty: 6,
      matches: 0,
      attempts: 0,
      region: 'kanto',
      victory: false,
      regions: {
        all: [1, 721],
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
    const ids = this.shuffleArray(array).slice(0, parseInt(this.state.difficulty));
    this.setState({
      ids: [...ids]
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const region = this.state.region;
    const [start, end] = this.state.regions[region];
    return (
      <React.Fragment>
        <section className="settings">
          <h1>Gotta Match 'Em All!</h1>
          <form action="" className="fetch-form">

            <div className="fetch-form__difficulty-container">
              <label 
                htmlFor="difficulty"
                className="fetch-form__label"
              >
                Select difficulty:
              </label>
              <select 
                name="difficulty"
                id="difficulty"
                required
                onChange={this.handleChange}
                className="fetch-form__select"
              >
                <option value="6">Easy</option>
                <option value="8">Medium</option>
                <option value="10">Hard</option>
              </select>
            </div>

            <div className="fetch-form__region-container">
              <label
                htmlFor="region"
                className="fetch-form__label"
              >
                Select region:
            </label>
              <select
                name="region"
                id="region"
                required
                onChange={this.handleChange}
                className="fetch-form__select"
              >
                <option value="kanto">Kanto</option>
                <option value="johto">Johto</option>
                <option value="hoenn">Hoenn</option>
                <option value="sinnoh">Sinnoh</option>
                <option value="unova">Unova</option>
                <option value="kalos">Kalos</option>
                <option value="all">All</option>
              </select>
            </div>

            <button
              type="submit"
              onClick={this.getIDs(start, end)}
              className="fetch-form__submit"
            >
              Play!
            </button>
          </form>
        </section>
        <FetchPokemon
          ids={this.state.ids}
          shuffleArray={this.shuffleArray}
          difficulty={parseInt(this.state.difficulty)}
          matches={this.state.matches}
          attempts={this.state.attempts}
          region={this.state.region}
          victory={this.state.victory} />
      </React.Fragment>
    );
  }
}

export default GetPokemonIds;
