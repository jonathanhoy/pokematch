import React, { Component } from 'react';
import RenderPokemon from '../RenderPokemon';
import { twice } from '../helpers/twice';

class FetchPokemon extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataToRender: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // fetch pokemon api for regular games
    if (prevProps !== this.props && this.props.customGame === false) {
      // reset array to clear old data
      this.setState({
        data: []
      });
      const ids = this.props.ids;
      ids.map((pokeid) => {
        return (
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokeid}`)
            .then(res => res.json())
            .then(res => {
              const name = res.name;
              const sprite = res.sprites.front_default;
              const id = res.id;
              const pokemon = {name: name, sprite: sprite, id: id, flipped: false, matched: false};
              this.setState(prevState => ({
                data: [...prevState.data, pokemon]
              }))
            })
        )
      })
    };

    if (prevProps !== this.props && this.props.customGame === true) {
      this.setState({
        data: [...twice]
      });
    }

    if (prevState.data !== this.state.data) {
      const shuffle = this.props.shuffleArray;
      const data = this.state.data;
      const arr = shuffle(data.concat(data));
      this.setState({
        dataToRender: arr
      });
    };
  }

  render() {
    return (
      <React.Fragment>
        <RenderPokemon
          dataToRender={this.state.dataToRender}
          difficulty={this.props.difficulty}
          matches={this.props.matches}
          attempts={this.props.attempts}
          region={this.props.region}
          victory={this.props.victory}
          customGame={this.props.customGame} />
      </React.Fragment>
    )
  }
}

export default FetchPokemon;