import React, { Component } from 'react';

class RenderPokemon extends Component {
  constructor() {
    super();
    this.state = {
      flipped: false
    }
  }
  flipCardFront = (e) => {   
    e.target.classList.add('card__front--flip');
    e.target.nextElementSibling.classList.add('card__back--flip');
  }
  // flipCardBack = (e) => {
  //   e.target.classList.remove('card__back--flip');
  //   e.target.nextElementSibling.classList.remove('card__front--flip');
  // }
  render() {
    const { data } = this.props
    if (data) {
      return (
        <div className="card">
          <ul className="card__list">
            {data.map((pokemon, index) => {
              return (
                <li key={index} className="card__item">
                  <div className="card__container">
                    <div
                      className="card__front"
                      onClick={this.flipCardFront}
                      id={pokemon.name}
                    >
                    </div>
                    <div
                      className="card__back"
                      onClick={this.flipCardBack}
                    >
                      <img src={pokemon.sprites.front_default} title={pokemon.name} alt={`A sprite of ${pokemon.name}.`} className="card__image"/>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default RenderPokemon;