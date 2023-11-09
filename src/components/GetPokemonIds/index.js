import React, { Component } from 'react';
import FetchPokemon from '../FetchPokemon';
import Leaderboard from '../Leaderboard';

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
      hideBoard: true,
      regions: {
        all: [1, 721],
        kanto: [1, 151],
        johto: [152, 251],
        hoenn: [252, 386],
        sinnoh: [387, 493],
        unova: [494, 649],
        kalos: [650, 721],
        alola: [722, 809],
        galar: [810, 905],
        paldea: [906, 1010],
      },
      showMobileLeaderboard: false
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

  // Get IDs when form is submittted
  handleSubmit = (start = 1, end = 721) => (e) => {
    e.preventDefault();
    const array = [];
    for (let i = start; i <= end; i++) {
      array.push(i);
    };
    const ids = this.shuffleArray(array).slice(0, parseInt(this.state.difficulty));
    this.setState({
      ids: [...ids],
      hideBoard: false
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      hideBoard: true
    });
  }

  toggleLeaderboard = (e) => {
    e.preventDefault();
    this.setState({
      showMobileLeaderboard: !this.state.showMobileLeaderboard
    })
  }

  render() {
    const region = this.state.region;
    const [start, end] = this.state.regions[region];
    return (
      <React.Fragment>
        <section className="settings">
          <form
            action=""
            className="fetch-form"
            >
            <h3 className="fetch-form__heading">Settings</h3>

            <div className="fetch-form__container fetch-form__container--region">
              <p className="fetch-form__label">Region</p>

              <fieldset className="fetch-form__region">
                <input defaultChecked type="radio" id="kanto" name="region" value="kanto" onClick={this.handleChange} />
                <label for="kanto">Kanto</label>
                <input type="radio" id="johto" name="region" value="johto" onClick={this.handleChange} />
                <label for="johto">Johto</label>
                <input type="radio" id="hoenn" name="region" value="hoenn" onClick={this.handleChange} />
                <label for="hoenn">Hoenn</label>
                <input type="radio" id="sinnoh" name="region" value="sinnoh" onClick={this.handleChange} />
                <label for="sinnoh">Sinnoh</label>
                <input type="radio" id="unova" name="region" value="unova" onClick={this.handleChange} />
                <label for="unova">Unova</label>
                <input type="radio" id="kalos" name="region" value="kalos" onClick={this.handleChange} />
                <label for="kalos">Kalos</label>
                <input type="radio" id="alola" name="region" value="alola" onClick={this.handleChange} />
                <label for="alola">Alola</label>
                <input type="radio" id="galar" name="region" value="galar" onClick={this.handleChange} />
                <label for="galar">Galar</label>
                <input type="radio" id="paldea" name="region" value="paldea" onClick={this.handleChange} />
                <label for="paldea">Paldea</label>
                <input type="radio" id="all" name="region" value="all" onClick={this.handleChange} />
                <label for="all">All</label>
              </fieldset>

             
            </div>

            <div className="fetch-form__container fetch-form__container--difficulty">
              <p className="fetch-form__label">Difficulty</p>

              <fieldset className="fetch-form__difficulty">
                <input defaultChecked type="radio" id="easy" name="difficulty" value="6" onClick={this.handleChange} />
                <label for="easy">Easy</label>
                <input type="radio" id="medium" name="difficulty" value="8" onClick={this.handleChange} />
                <label for="medium">Medium</label>
                <input type="radio" id="hard" name="difficulty" value="10" onClick={this.handleChange} />
                <label for="hard">Hard</label>
              </fieldset>

            </div>

            <button
              type="submit"
              className="fetch-form__submit"
              onClick={this.handleSubmit(start, end)}
            >
                Play!
            </button>
            <button
              className={`fetch-form__mobile-button mobile-button ${this.state.showMobileLeaderboard ? 'opened' : ''}`}
              onClick={this.toggleLeaderboard}>
                Leaderboard
            </button>
          </form>
          <Leaderboard
            region={this.state.region}
            difficulty={this.state.difficulty}
            showMobileLeaderboard={this.state.showMobileLeaderboard}
            toggleLeaderboard={this.toggleLeaderboard} />
        </section>
        <FetchPokemon
          ids={this.state.ids}
          shuffleArray={this.shuffleArray}
          difficulty={parseInt(this.state.difficulty)}
          matches={this.state.matches}
          attempts={this.state.attempts}
          hideBoard={this.state.hideBoard}
          region={this.state.region} />
      </React.Fragment>
    );
  }
}

export default GetPokemonIds;
