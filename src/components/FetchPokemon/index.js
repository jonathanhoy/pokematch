import React, { Component } from 'react';
import RenderPokemon from '../RenderPokemon';

class FetchPokemon extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataToRender: [],
      ids: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      const data = this.state.data;
      const arr = this.props.shuffleArray(data.concat(data));
      this.setState({
        dataToRender: arr
      });
    };

    if (prevProps !== this.props) {
      // reset array to clear old data
      this.setState({
        data: [],
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
  }

  render() {
    return (
      <React.Fragment>
        <RenderPokemon
          dataToRender={this.state.dataToRender}
          difficulty={this.props.difficulty}
          matches={this.props.matches}
          attempts={this.props.attempts}
          hideBoard={this.props.hideBoard}
          region={this.props.region} />
      </React.Fragment>
    )
  }
}

export default FetchPokemon;