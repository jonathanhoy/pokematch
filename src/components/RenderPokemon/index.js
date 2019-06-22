// RenderPokemon

import React, { Component } from 'react';
import MatchLogic from '../MatchLogic';

class RenderPokemon extends Component {
  constructor() {
    super();
    this.state = {
      activePair: [],
      ids: [],
      data: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataToRender !== this.props.dataToRender && this.props.dataToRender.length === 12) {
      this.setState({
        data: this.props.dataToRender
      });
      const arr = []
      this.props.dataToRender.forEach((pokemon) => {
        arr.push(pokemon.name)
      })
      console.log(arr);
    };
  }

  compareCards = (cardOne, cardTwo) => {
    if (cardOne !== '' && cardOne === cardTwo) {
      alert('correct!');
    };
  }

  flipCard = (e) => {
    const pokemon = e.target.id;
    const index = e.target.dataset.index;
    
    let newStateData = JSON.parse(JSON.stringify(this.state.data));
    newStateData[index].flipped = !newStateData[index].flipped
    this.setState({
      data: newStateData
    });
    
    
    
    // if (!e.target.classList.contains('card__front--flip')) {
    //   e.target.classList.add('card__front--flip');
    //   e.target.nextElementSibling.classList.add('card__back--flip');
    // };
    const { activePair } = this.state;
    if (activePair.length < 2) {
      this.setState({
        activePair: [...activePair, pokemon]
      })
    };
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
                      // className="card__front"
                      className={this.state.data.length > 0 && this.state.data[index].flipped ? 'card__front card__front--flip' : 'card__front'}
                      onClick={this.flipCard}
                      id={name}
                      data-index={index}
                    >
                      {/* <img src="/assets/pokeball.png" alt="" className="card__front-image"/> */}
                    </div>
                    <div className={this.state.data.length > 0 && this.state.data[index].flipped ? 'card__back card__back--flip' : 'card__back'}>
                      <img src={sprite} alt={`A sprite of ${name}.`} className="card__sprite-image" />
                    </div>
                  </div>
                </li>
              )
          })}
        </ul>
        <MatchLogic activePair={this.state.activePair} data={this.state.data}/>
      </section>
    )
  }
}

export default RenderPokemon;