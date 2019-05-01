import React, { Component } from 'react';
import RenderPokemon from '../RenderPokemon';

class FetchPokemon extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataToRender: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      // reset array to clear old data
      this.setState({
        data: []
      });
      const ids = this.props.ids;
      ids.map((pokeid) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeid}`)
          .then(res => res.json())
          .then(res => {
            const name = res.name;
            const sprite = res.sprites.front_default;
            const id = res.id;
            const pokemon = {name: name, sprite: sprite, id: id, flipped: false};
            this.setState(prevState => ({
              data: [...prevState.data, pokemon]
            }))
          })
      })
    };
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
      <div>
        <RenderPokemon dataToRender={this.state.dataToRender} />
      </div>
    )
  }
}

export default FetchPokemon;