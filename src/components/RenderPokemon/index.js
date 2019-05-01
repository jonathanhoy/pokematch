// RenderPokemon

import React, { Component } from 'react';
import MatchLogic from '../MatchLogic';
import Axios from 'axios';

class RenderPokemon extends Component {
  constructor() {
    super();
    this.state = {
      pair: [123, 'test'],
      ids: [],
      data: {}
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dataToRender !== this.props.dataToRender && this.props.dataToRender.length === 12) {
      const arr = []
      this.props.dataToRender.forEach((pokemon) => {
        arr.push(pokemon.name)
      })
      console.log(arr);
      
    }
  }

  flipCard = (e) => {
    const pokemon = e.target.id;
    if (!e.target.classList.contains('card__front--flip')) {
      e.target.classList.add('card__front--flip');
      e.target.nextElementSibling.classList.add('card__back--flip');
    };
    const { pair } = this.state;
    if (pair.length < 2) {
      const arr = [];
      // arr.push
    }
     
  }

  render() {
    return (
      <section className="card">
        <ul className="card__list">
          {this.props.dataToRender.length === 12 && // 12 is currently hard-coded but will be passed as a prop depending on difficulty.
            Object.entries(this.props.dataToRender).map((pokemon, index) => {
              const { name, sprite, id, flipped } = pokemon[1];
              return (
                <li key={index} className="card__item">
                  <div className="card__container">
                    <div
                      className="card__front"
                      onClick={this.flipCard}
                      id={name}
                    >
                      {/* <img src="/assets/pokeball.png" alt="" className="card__front-image"/> */}
                    </div>
                    <div className="card__back">
                      <img src={sprite} alt={`A sprite of ${name}.`} className="card__sprite-image" />
                    </div>
                  </div>
                </li>
              )
          })}
        </ul>
        <MatchLogic />
      </section>
    )
  }
}

export default RenderPokemon;