// RenderPokemon

import React, { Component } from 'react';
import MatchLogic from '../MatchLogic';

class RenderPokemon extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    };
  }

  componentDidUpdate(prevProps, prevState) {
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

    if (prevState.data !== this.state.data) {
      const activePair = [];
      for (let i in this.state.data) {
        const pokemon = this.state.data[i];
        if (pokemon.flipped === true) {
          activePair.push(pokemon);
        };
      };
      const [cardOne, cardTwo] = activePair;
      if (activePair.length === 2 && cardOne.name === cardTwo.name) {
        console.log('match');
        activePair.pop();
        activePair.pop();
        let newStateData = JSON.parse(JSON.stringify(this.state.data));
        for (let i in this.state.data) {
          if (newStateData[i].name === cardOne) {
            newStateData[i].matched = true;
            newStateData[i].flipped = false;
          };
        };
        this.setState({
          data: newStateData
        });



      } else if (activePair.length === 2 && cardOne.name !== cardTwo.name) {
        console.log('not a match');
        setTimeout(() => {
          let newStateData = JSON.parse(JSON.stringify(this.state.data));
          for (let i in this.state.data) {
            newStateData[i].flipped = false;
          };
          this.setState({
            data: newStateData
          });
        }, 750);
      };
      
      
      // const [ cardOne, cardTwo ] = activePair;
      // if (cardOne === cardTwo) {
      //   console.log(this.state.activePair);
      //   console.log('match'); 
      // } else {
      //   console.log(this.state.activePair);
      //   console.log(('not a match'));
      // }
    };
  }

  flipCard = (e) => {
    const activePair = [];
    for (let i in this.state.data) {
      const pokemon = this.state.data[i];
      if (pokemon.flipped === true) {
        activePair.push(pokemon);
      };
    };
    if (activePair.length === 2) {
      return null;
    };
    // to prevent flipping third card
    const index = e.target.dataset.index;
    let newStateData = JSON.parse(JSON.stringify(this.state.data));
    newStateData[index].flipped = !newStateData[index].flipped;
    this.setState({
      data: newStateData
    });

  }

  render() {
    return (
      <section className="card">
        <ul className="card__list">
          {this.props.dataToRender.length === 12 && // 12 is currently hard-coded but will be passed as a prop depending on difficulty.
            Object.entries(this.props.dataToRender).map((pokemon, index) => {
              const { name, sprite } = pokemon[1];
              return (
                <li key={index} className="card__item">
                  <div className="card__container">
                    <div
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
        {/* <MatchLogic data={this.state.data}/> */}
      </section>
    )
  }
}

export default RenderPokemon;