import React, { Component } from 'react';
import FetchPokemon from '../FetchPokemon';
import Leaderboard from '../Leaderboard';
import Swal from 'sweetalert2';
import { api } from '../api';

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
      },
      customGame: false,
      customSetting: -1,
      customDifficulty: -1
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
    this.setState({
      customGame: false,
    });
    const array = [];
    for (let i = start; i <= end; i++) {
      array.push(i);
    };
    const ids = this.shuffleArray(array).slice(0, parseInt(this.state.difficulty));
    this.setState({
      ids: [...ids]
    });
  }

  customGetIDs = (e) => {
    e.preventDefault();
    if (this.state.customSetting === -1) {
      return Swal.fire({
        title: "Please select a challenge!",
        confirmButtonColor: '#ee1515',
        allowOutsideClick: false
      });
    };
    this.setState({
      customGame: true,
    });
    const array = [];
    const index = parseInt(this.state.customSetting);
    const arrLength = api[index].data.length;
    for (let i = 1; i <= arrLength; i++) {
      array.push(i);
    };
    const ids = this.shuffleArray(array);
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

          <form action="" className="fetch-form">
            <div className="fetch-form__region-container">
              <label
                htmlFor="customSetting"
                className="fetch-form__label"
              >
                Custom Settings:
              </label>
              <select
                name="customSetting"
                id="customSetting"
                required
                onChange={this.handleChange}
                className="fetch-form__select"
              >
                <option value="">???</option>
                <option value="0" data-customDifficulty="4">Blackpink</option>
                <option value="1" data-customDifficulty="7">{`${'Bts'.toUpperCase()}`}</option>
                <option value="2" data-customDifficulty="9">{`${'Twice'.toUpperCase()}`}</option>
              </select>
            </div>
            <button
              type="submit"
              onClick={this.customGetIDs}
              className="fetch-form__submit"
            >
              Play!
            </button>
          </form>
          <Leaderboard />
        </section>
        <FetchPokemon
          ids={this.state.ids}
          shuffleArray={this.shuffleArray}
          difficulty={this.state.customSetting !== -1 ? parseInt(api[this.state.customSetting].difficulty) : parseInt(this.state.difficulty)}
          matches={this.state.matches}
          attempts={this.state.attempts}
          region={this.state.region}
          victory={this.state.victory}
          customGame={this.state.customGame}
          customSetting={this.state.customSetting} />
      </React.Fragment>
    );
  }
}

export default GetPokemonIds;
