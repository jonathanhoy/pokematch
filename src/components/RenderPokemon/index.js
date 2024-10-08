import React, { Component } from 'react';
import WinLogic from '../WinLogic';

class RenderPokemon extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      matches: 0,
      attempts: 0,
      newGame: 0,
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.dataToRender
    })
  }

  componentDidUpdate(prevProps, prevState) {
    // base game
    // updates state with data object
    if (prevProps.dataToRender !== this.props.dataToRender && this.props.dataToRender.length === (this.props.difficulty * 2)) {
      this.setState({
        data: this.props.dataToRender,
        matches: this.props.matches,
        attempts: this.props.attempts,
      });
      const arr = [];
      this.props.dataToRender.forEach((pokemon) => {
        arr.push(pokemon.name);
      });
      // console.table(arr)
    };

    // matching logic
    if (prevState.data !== this.state.data) {
      this.matchLogic();
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
    this.setState((state, props) => ({
      data: newStateData,
      newGame: state.newGame + 1
    }));
  }

  flipClassNames(frontBack, index) {
    if (this.state.data[index]) {
      let names = [`card__${frontBack}`];
      if (this.state.data.length > 0 && this.state.data[index].flipped === true) names.push(`card__${frontBack}--flip`);
      if (this.state.data.length > 0 && this.state.data[index].matched === true) names.push(`card__${frontBack}--flip`);
      return names.join(' ');
    }
  }

  matchLogic = () => {
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
        matches: this.state.matches + 1,
        attempts: this.state.attempts + 1
      });

      // if pair does not match
    } else if (activePair.length === 2 && cardOne.name !== cardTwo.name) {
      setTimeout(() => {
        let newStateData = JSON.parse(JSON.stringify(this.state.data));
        for (let i in this.state.data) {
          newStateData[i].flipped = false;
        };
        this.setState({
          data: newStateData,
          attempts: this.state.attempts + 1
        });
      }, 600);
    };
  }

  conditionalHide = () => {
    return this.props.hideBoard === true ? `opacity--none` : ''
  }

  render() {
    return (
      <section className="gameboard">
        <h1 className="title">Gotta Match 'Em All!</h1>
        {this.props.hideBoard === true &&
          <div className='splash'>
            <p>Pick a region and a difficulty to get started.</p>
          </div>
        }
        <div>
          <div className="card__container">
            <ul className={`card__list ${this.conditionalHide()}`}>
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
          </div>
          {this.state.data.length > 0 &&
            (
              <div className={`game-metrics ${this.conditionalHide()}`}>
                <p>Attempts: {this.state.attempts}</p>
              </div>
            )
          }
          <WinLogic
            data={this.state.data}
            matches={this.state.matches}
            difficulty={this.props.difficulty}
            attempts={this.state.attempts}
            region={this.props.region}
            newGame={this.state.newGame}
             />
        </div>
      </section>
    )
  }
}

export default RenderPokemon;
