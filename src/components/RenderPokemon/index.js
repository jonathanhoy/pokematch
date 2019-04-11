// RenderPokemon

import React, { Component } from 'react';

class RenderPokemon extends Component {
  constructor() {
    super();
    this.state = {
      flipped: false
    }
  }
  flipCard = (e) => {
    if (!e.target.classList.contains('card__front--flip')) {
      e.target.classList.add('card__front--flip');
      e.target.nextElementSibling.classList.add('card__back--flip');
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
  render() {
    const data = this.shuffleArray(this.props.data);
    const names = data.map((pokemon) => {
      return pokemon.name;
    });
    if (names.length === 12) {
      console.log(names);
    }
    return (
      <div className="card">
        <ul className="card__list">
          {data.map((pokemon, index) => {              
            return (
              <li key={index} className="card__item">
                <div className="card__container">
                  <div
                    className="card__front"
                    onClick={this.flipCard}
                    id={pokemon.name}
                  >
                  </div>
                  <div className="card__back">
                    <img src={pokemon.sprites.front_default} title={pokemon.name} alt={`A sprite of ${pokemon.name}.`} className="card__image"/>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default RenderPokemon;