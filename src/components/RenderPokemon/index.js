import React, { Component } from 'react';
// import MatchLogic from '../MatchLogic';
import WinLogic from '../WinLogic';

class RenderPokemon extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      matches: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // updates state with data object
    if (prevProps.dataToRender !== this.props.dataToRender && this.props.dataToRender.length === (this.props.difficulty * 2)) {
      this.setState({
        data: this.props.dataToRender,
        matches: this.props.matches
      });
      const arr = []
      this.props.dataToRender.forEach((pokemon) => {
        arr.push(pokemon.name)
      })
      console.log(arr);
    };

    // matching logic
    if (prevState.data !== this.state.data) {
      const activePair = [];
      for (let i in this.state.data) {
        const pokemon = this.state.data[i];
        if (pokemon.flipped === true) {
          activePair.push(pokemon);
        };
      };
      const [cardOne, cardTwo] = activePair;
      // if pair matches
      if (activePair.length === 2 && cardOne.name === cardTwo.name) {
        activePair.pop();
        activePair.pop();
        let newStateData = JSON.parse(JSON.stringify(this.state.data));
        for (let i in this.state.data) {
          if (newStateData[i].name === cardOne.name) {
            newStateData[i].matched = true;
            newStateData[i].flipped = false;
          };
        };
        this.setState({
          data: newStateData,
          matches: this.state.matches + 1
        });
      
      // if pair does not match
      } else if (activePair.length === 2 && cardOne.name !== cardTwo.name) {
        setTimeout(() => {
          let newStateData = JSON.parse(JSON.stringify(this.state.data));
          for (let i in this.state.data) {
            newStateData[i].flipped = false;
          };
          this.setState({
            data: newStateData
          });
        }, 600);
      };
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

  flipClassNames(frontBack, index) {
    if (this.state.data[index]) {
      let names = [`card__${frontBack}`];
      if (this.state.data.length > 0 && this.state.data[index].flipped === true) names.push(`card__${frontBack}--flip`);
      if (this.state.data.length > 0 && this.state.data[index].matched === true) names.push(`card__${frontBack}--flip`);
      return names.join(' ');
    }
  }

  render() {
    return (
      <section className="gameboard">
        <ul className="card__list">
          {this.props.dataToRender.length === (this.props.difficulty * 2) && // 
            Object.entries(this.props.dataToRender).map((pokemon, index) => {
              const { name, sprite } = pokemon[1];
              return (
                <li key={index} className="card__item">
                  <div className="card__container">
                    <div
                      className={this.flipClassNames('front', index)}
                      onClick={this.flipCard}
                      id={name}
                      data-index={index}
                    >
                      {/* <img src="/assets/pokeball.png" alt="" className="card__front-image"/> */}
                    </div>
                    <div
                      className={this.flipClassNames('back', index)}
                    >
                      <img src={sprite} alt={`A sprite of ${name}.`} className="card__sprite-image" />
                    </div>
                  </div>
                </li>
              )
          })}
        </ul>
        {/* <MatchLogic data={this.state.data} matches={this.state.matches} difficulty={this.props.difficulty} /> */}
        <WinLogic data={this.state.data} matches={this.state.matches} difficulty={this.props.difficulty} />
      </section>
    )
  }
}

export default RenderPokemon;