// RenderPokemon

import React, { Component } from 'react';
import MatchLogic from '../MatchLogic';
import Axios from 'axios';

class RenderPokemon extends Component {
  constructor() {
    super();
    this.state = {
      pair: [],
      ids: [],
      data: {}
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dataToRender !== this.props.dataToRender && this.props.dataToRender.length === 12) {
      const arr = []
      this.props.dataToRender.forEach((pokemon) => {
        arr.push(pokemon[0])
      })
      console.log(arr);
      
    }
  }

  flipCard = (e) => {
    if (!e.target.classList.contains('card__front--flip')) {
      e.target.classList.add('card__front--flip');
      e.target.nextElementSibling.classList.add('card__back--flip');
    };
  }

  render() {
    return (
      <section className="card">
        <ul className="card__list">
          {this.props.dataToRender.length === 12 && // 12 is currently hard-coded but will be passed as a prop depending on difficulty.
            Object.entries(this.props.dataToRender).map((pokemon, index) => {
            const name = pokemon[1][0];
            const sprite = pokemon[1][1];
            const id = pokemon[1][2];
            return (
              <li key={index} className="card__item">
                <div className="card__container">
                  <div
                    className="card__front"
                    onClick={this.flipCard}
                    id={name}
                  >
                  </div>
                  <div
                    className="card__back"
                  >
                    <img src={sprite} title={name} alt={`A sprite of ${name}.`} className="card__image" />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default RenderPokemon;